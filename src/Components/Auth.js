import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }

      if (isSignUp) {
        // Sign up new user
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email,
            password,
          });
        if (signUpError) {
          console.error("signUpError", signUpError);
          alert(signUpError.message);
          setLoading(false);
          return;
        }

        // const userId = signUpData.user?.id
        // if (userId) {
        //   const { error: profileError } = await supabase
        //     .from('profiles')
        //     .insert({
        //       id: userId,
        //       email,
        //       is_admin: false // default for all new accounts
        //     })

        //   if (profileError) {
        //     console.error("Profile insert failed:", profileError)
        //     alert("Your account was created but profile setup failed.")
        //   }
        // }

        alert("Account created! You can now log in.");
      } else {
        // Log in existing user
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;

        alert("Logged in successfully!");
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100dvh-210px)]  pt-6">
      <div className="p-6 ">
        <div className="card w-full max-w-xl mx-auto shadow-2xl">
          <div className="card-body bg-white">
            <h2 className="card-title w-full justify-center text-3xl title-font">
              {isSignUp ? "Sign up" : "Sign in"}
            </h2>

            <p className="self-center font-bold">
              {isSignUp
                ? "Create an account"
                : "Sign in with your email and password"}
            </p>

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <p>Email:</p>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <p>Password:</p>
                <input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <button className="btn btn-info w-full" disabled={loading}>
                {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="link mt-4"
            >
              {isSignUp
                ? "Have an account? Sign In"
                : "Need an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
