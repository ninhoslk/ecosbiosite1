import { supabase } from "@/lib/supabase";

export type Certificado = {
  id: string;
  codigo: string;
  titulo: string;
  imagemFrenteUrl: string;
  imagemVersoUrl: string;
  driveUrl: string;
  criadoEm: string;
};

export type CertificadoPublico = {
  codigo: string;
  titulo: string | null;
  imagem_frente_url: string;
  imagem_verso_url: string;
  drive_url: string;
};

export type DadosCertificado = {
  codigo: string;
  titulo: string;
  imagemFrenteUrl: string;
  imagemVersoUrl: string;
  driveUrl: string;
};

export type Resultado = { ok: boolean; erro?: string };

/** Mesmo formato validado no banco (CHECK em supabase/certificados.sql). */
export const CODIGO_CERTIFICADO_REGEX = /^[A-Za-z0-9-]{3,80}$/;

export const SUPABASE_NAO_CONFIGURADO =
  "O Supabase não está configurado neste site (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).";

export function validarUrlHttps(valor: string) {
  try {
    return new URL(valor).protocol === "https:";
  } catch {
    return false;
  }
}

/** Validação feita antes de gravar (o banco repete as mesmas regras via CHECK). */
export function validarDadosCertificado(d: DadosCertificado): string | null {
  if (!CODIGO_CERTIFICADO_REGEX.test(d.codigo)) {
    return "Código inválido — use apenas letras, números e hífen (3 a 80 caracteres).";
  }
  if (!validarUrlHttps(d.imagemFrenteUrl)) return "Informe um link https:// válido para a imagem de frente.";
  if (!validarUrlHttps(d.imagemVersoUrl)) return "Informe um link https:// válido para a imagem de verso.";
  if (!validarUrlHttps(d.driveUrl)) return "Informe um link https:// válido do Google Drive.";
  return null;
}

export function linhaParaCertificado(row: Record<string, unknown>): Certificado {
  return {
    id: row.id as string,
    codigo: row.codigo as string,
    titulo: (row.titulo as string) ?? "",
    imagemFrenteUrl: (row.imagem_frente_url as string) ?? "",
    imagemVersoUrl: (row.imagem_verso_url as string) ?? "",
    driveUrl: (row.drive_url as string) ?? "",
    criadoEm: ((row.created_at as string) ?? new Date().toISOString()).slice(0, 10),
  };
}

function paraLinha(d: DadosCertificado) {
  return {
    codigo: d.codigo,
    titulo: d.titulo || null,
    imagem_frente_url: d.imagemFrenteUrl,
    imagem_verso_url: d.imagemVersoUrl,
    drive_url: d.driveUrl,
  };
}

/**
 * Verificação pública. A tabela "certificados" não tem nenhuma policy de
 * leitura pública — o único caminho para quem não está logado é a função
 * buscar_certificado(codigo), que só devolve a linha cujo código bate
 * exatamente. Sem o código, não há como listar ou descobrir certificados.
 */
export async function buscarCertificadoPorCodigo(codigo: string): Promise<CertificadoPublico | null> {
  if (!supabase) throw new Error(SUPABASE_NAO_CONFIGURADO);
  if (!CODIGO_CERTIFICADO_REGEX.test(codigo)) return null;
  const { data, error } = await supabase.rpc("buscar_certificado", { p_codigo: codigo });
  if (error) throw error;
  const linhas = (data ?? []) as CertificadoPublico[];
  return linhas[0] ?? null;
}

// ---- Funções do painel admin (a RLS só libera para quem está na tabela admins) ----

export async function listarCertificados(): Promise<Certificado[]> {
  if (!supabase) throw new Error(SUPABASE_NAO_CONFIGURADO);
  const { data, error } = await supabase
    .from("certificados")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(linhaParaCertificado);
}

function erroDeGravacao(error: { code?: string } | null, padrao: string): Resultado {
  // 23505 = violação de UNIQUE (código já cadastrado).
  if (error?.code === "23505") return { ok: false, erro: "Já existe um certificado com esse código." };
  // 42501 = bloqueado pela RLS (usuário logado não é admin).
  if (error?.code === "42501") return { ok: false, erro: "Acesso restrito a administradores." };
  console.error(padrao, error);
  return { ok: false, erro: padrao };
}

export async function criarCertificado(dados: DadosCertificado): Promise<Resultado> {
  if (!supabase) return { ok: false, erro: SUPABASE_NAO_CONFIGURADO };
  const invalido = validarDadosCertificado(dados);
  if (invalido) return { ok: false, erro: invalido };
  try {
    const { error } = await supabase.from("certificados").insert(paraLinha(dados));
    if (error) return erroDeGravacao(error, "Não foi possível publicar o certificado.");
    return { ok: true };
  } catch {
    return { ok: false, erro: "Erro de conexão ao publicar o certificado." };
  }
}

/**
 * Atualiza pelo id (nunca cria um registro novo nem troca o id/criador). A
 * constraint UNIQUE de "codigo" garante de forma atômica que a troca de código
 * não colida com outro certificado.
 */
export async function atualizarCertificado(id: string, dados: DadosCertificado): Promise<Resultado> {
  if (!supabase) return { ok: false, erro: SUPABASE_NAO_CONFIGURADO };
  const invalido = validarDadosCertificado(dados);
  if (invalido) return { ok: false, erro: invalido };
  try {
    const { data, error } = await supabase
      .from("certificados")
      .update(paraLinha(dados))
      .eq("id", id)
      .select("id");
    if (error) return erroDeGravacao(error, "Não foi possível salvar as alterações.");
    if (!data || data.length === 0) return { ok: false, erro: "Certificado não encontrado." };
    return { ok: true };
  } catch {
    return { ok: false, erro: "Erro de conexão ao atualizar certificado." };
  }
}

export async function removerCertificado(id: string): Promise<Resultado> {
  if (!supabase) return { ok: false, erro: SUPABASE_NAO_CONFIGURADO };
  try {
    const { error } = await supabase.from("certificados").delete().eq("id", id);
    if (error) return erroDeGravacao(error, "Não foi possível remover o certificado.");
    return { ok: true };
  } catch {
    return { ok: false, erro: "Erro de conexão ao remover certificado." };
  }
}
