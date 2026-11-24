import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase do navegador (site estático no GitHub Pages — não existe
 * servidor próprio). Usa apenas a chave pública "anon"; toda a proteção dos
 * dados fica no banco (RLS + funções SECURITY DEFINER em supabase/certificados.sql).
 *
 * NUNCA coloque a service_role key aqui: tudo que começa com VITE_ vai parar
 * no JavaScript público do site.
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** null quando as variáveis não foram configuradas (as páginas mostram um aviso). */
export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null;
