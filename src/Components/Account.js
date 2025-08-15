import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import SongList from "./SongList";
import { useAuth } from "../AuthContext";

export default function Account() {
  //used to have { session } as props
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // optional
  const [userSongs, setUserSongs] = useState([]);

  const { session } = useAuth();

  // Optional: load admin flag from profiles`
  useEffect(() => {
    const loadAdmin = async () => {
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (!error && data) setIsAdmin(!!data.is_admin);

      const { data: songs, error: songsErr } = await supabase
        .from("songs_data")
        .select("*")
        .eq("user_id", session.user.id);
      // .order('created_at', { ascending: false });

      if (!songsErr && songs) setUserSongs(songs);
    };
    loadAdmin();
  }, [session]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!session?.user) return;
    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        alert(error.message);
      } else {
        alert("Password updated successfully!");
        setNewPassword("");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!session?.user) return null;

  return (
    <main className="min-h-[calc(100dvh-210px)] pt-6 mt-8 w-full">
      <div className="card w-full  mx-auto shadow-2xl bg-white rounded-2xl p-[30px]">
        <h2 className="card-title justify-center text-3xl">Account Details</h2>
        <div>
          <label className="font-semibold">Email</label>
          <p>{session.user.email}</p>
          {isAdmin && <div class="badge badge-info">Admin</div>}

          <form onSubmit={handlePasswordChange} style={{ marginTop: 12 }}>
            <div className="form-control w-full max-w-sm">
              <label htmlFor="newPassword" className="block mb-1 font-semibold">
                Change Password
              </label>
              <input
                type="password"
                value={newPassword}
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
                class="input"
              />
            </div>
            <button
              type="submit"
              disabled={loading || newPassword.length < 6}
              className="btn btn-info"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <div style={{ marginTop: 12 }}>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
              className="btn btn-outline btn-error"
            >
              Sign Out
            </button>
          </div>

          <div class="divider"></div>
          {userSongs[0] && (
            <>
              <h2 className="text-xl font-semibold">Your Songs</h2>{" "}
              <SongList songs={userSongs} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
