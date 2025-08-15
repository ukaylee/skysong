import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext();

// Purpose: to make { session, setSession } available to any child.
export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined=loading, null=no session, object=logged in

  useEffect(() => {
    let mounted = true;

    // fetch session once on mount
    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(data?.session ?? null);
      } catch (err) {
        console.error("Failed to get session", err);
        if (mounted) setSession(null);
      }
    };
    init();

    // subscribe to auth state changes (login / logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!mounted) return;
        setSession(newSession ?? null);
      }
    );

    // cleanup when the provider unmounts
    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe?.();
    };
  }, []);

  // Provide an object to children; you can expand this with login/logout helpers
  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined)
    throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
