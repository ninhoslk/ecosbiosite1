import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type EstadoAdmin = {
  carregando: boolean;
  session: Session | null;
  /** true só para usuários cadastrados na tabela public.admins (função is_admin()). */
  isAdmin: boolean;
};

/** Sessão do Supabase Auth + verificação de admin, para a área /admin. */
export function useAdmin() {
  const [estado, setEstado] = useState<EstadoAdmin>({ carregando: true, session: null, isAdmin: false });

  const verificar = useCallback(async (session: Session | null) => {
    if (!supabase || !session) {
      setEstado({ carregando: false, session, isAdmin: false });
      return;
    }
    const { data, error } = await supabase.rpc("is_admin");
    setEstado({ carregando: false, session, isAdmin: !error && data === true });
  }, []);

  useEffect(() => {
    if (!supabase) {
      setEstado({ carregando: false, session: null, isAdmin: false });
      return;
    }
    supabase.auth.getSession().then(({ data }) => verificar(data.session));
    const { data } = supabase.auth.onAuthStateChange((_evento, session) => {
      // Adiado para fora do callback, como recomenda o supabase-js.
      setTimeout(() => verificar(session), 0);
    });
    return () => data.subscription.unsubscribe();
  }, [verificar]);

  const entrar = useCallback(async (email: string, senha: string) => {
    if (!supabase) return { ok: false, erro: "Supabase não configurado." };
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) return { ok: false, erro: "E-mail ou senha incorretos." };
    return { ok: true };
  }, []);

  const sair = useCallback(async () => {
    await supabase?.auth.signOut();
  }, []);

  return { ...estado, entrar, sair };
}
