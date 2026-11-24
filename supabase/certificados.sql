-- ===================================================
-- ECOSBIO — CERTIFICADOS (verificação pública por link único)
-- ===================================================
-- ATENÇÃO: rode este arquivo no SQL Editor do projeto Supabase da EcosBio
-- (confira o nome do projeto no topo do painel antes de clicar em "Run").
-- Pode ser rodado mais de uma vez sem problema (idempotente).
--
-- Como o site é estático (GitHub Pages, sem servidor), toda a segurança fica
-- aqui no banco:
--   * a tabela "certificados" só pode ser lida/escrita por admins (RLS);
--   * a verificação pública usa a função buscar_certificado(codigo), que
--     devolve SOMENTE o certificado cujo código bate exatamente — sem o código
--     não há como listar ou descobrir certificados;
--   * admins são os usuários do Supabase Auth cadastrados na tabela admins.
-- ===================================================


-- ---------------------------------------------------
-- 1. ADMINS (quem pode emitir/editar/excluir certificados)
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
-- Sem nenhuma policy: ninguém lê/escreve pelo site. Admins são cadastrados só
-- pelo SQL Editor (ver passo 5 no final deste arquivo).
REVOKE ALL ON public.admins FROM anon, authenticated;

-- SECURITY DEFINER para poder consultar "admins" (que não tem policy) de dentro
-- das policies de outras tabelas.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid());
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;


-- ---------------------------------------------------
-- 2. TABELA DE CERTIFICADOS
-- ---------------------------------------------------
-- As imagens NÃO ficam no Storage do Supabase (ficam hospedadas em outro
-- serviço, só a URL é guardada aqui) para não gastar cota.
CREATE TABLE IF NOT EXISTS public.certificados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE CHECK (codigo ~ '^[A-Za-z0-9-]{3,80}$'),
  titulo TEXT,
  imagem_frente_url TEXT NOT NULL CHECK (imagem_frente_url ~ '^https://'),
  imagem_verso_url TEXT NOT NULL CHECK (imagem_verso_url ~ '^https://'),
  drive_url TEXT NOT NULL CHECK (drive_url ~ '^https://'),
  created_by UUID DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.certificados ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "certificados_admin_all" ON public.certificados;

-- Único acesso direto à tabela é de admin (leitura e escrita). A verificação
-- pública passa pela função buscar_certificado abaixo, não por policy.
CREATE POLICY "certificados_admin_all" ON public.certificados
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

REVOKE ALL ON public.certificados FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.certificados TO authenticated;
GRANT ALL ON public.certificados TO service_role;


-- ---------------------------------------------------
-- 3. VERIFICAÇÃO PÚBLICA POR CÓDIGO EXATO
-- ---------------------------------------------------
-- Faz o papel da leitura com service_role do servidor (que este site não tem):
-- ignora a RLS, mas só devolve a linha cujo código é exatamente o informado e
-- só as colunas públicas.
CREATE OR REPLACE FUNCTION public.buscar_certificado(p_codigo TEXT)
RETURNS TABLE (
  codigo TEXT,
  titulo TEXT,
  imagem_frente_url TEXT,
  imagem_verso_url TEXT,
  drive_url TEXT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT c.codigo, c.titulo, c.imagem_frente_url, c.imagem_verso_url, c.drive_url
  FROM public.certificados c
  WHERE c.codigo = p_codigo
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.buscar_certificado(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.buscar_certificado(TEXT) TO anon, authenticated;


-- ---------------------------------------------------
-- 4. REALTIME (o painel admin atualiza a lista sozinho)
-- ---------------------------------------------------
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.certificados;
EXCEPTION WHEN duplicate_object THEN
  NULL; -- já estava incluída
END $$;


-- ---------------------------------------------------
-- 5. CADASTRAR UM ADMIN (rode separado, depois de criar o usuário)
-- ---------------------------------------------------
-- 1) No painel do Supabase: Authentication > Users > Add user > Create new user
--    (e-mail + senha, marque "Auto Confirm User").
-- 2) Troque o e-mail abaixo, descomente e rode:
--
-- INSERT INTO public.admins (user_id)
-- SELECT id FROM auth.users WHERE email = 'seu-email@exemplo.com'
-- ON CONFLICT DO NOTHING;
