import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Account from "../Components/Account";
import Auth from "../Components/Auth";

function LogIn() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      {!session ? <Auth /> : <Account key={session.user.id} />}
      {/* used to pass session={session} */}
    </div>
  );
}

export default LogIn;
