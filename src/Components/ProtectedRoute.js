// purpose: if guest tries to access a page that is only available if youre logged in
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(session);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      setSession(s);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  if (loading) return null; // or a spinner
  if (!session?.user) return <Navigate to="/account" replace />;
  return children;
}
