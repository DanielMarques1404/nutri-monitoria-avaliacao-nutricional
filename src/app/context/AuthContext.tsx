import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { supabase } from "../../infra/supabase/config";

interface IAuthContext {
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  session: Session | null;
}

type AuthProviderProps = PropsWithChildren;

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .finally(() => setIsLoading(false));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    console.log(session);
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ session, logout, login }}>
      {isLoading ? <section className="flex items-center justify-center min-h-screen">Carregando...</section> : children}
    </AuthContext.Provider>
  );
};
