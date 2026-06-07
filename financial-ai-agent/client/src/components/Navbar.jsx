import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const [user, setUser] = useState(null);
  const userInitial = user?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="bg-black border-b border-white/5 px-10 py-6 flex justify-between items-center relative">
      <h1 className="text-3xl font-black text-white">Financial AI Agent</h1>
      <div className="flex items-center gap-5">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-white/10 hover:bg-white/20 transition-all text-white px-6 py-3 rounded-2xl"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-cyan-400 hover:scale-105 transition-all text-black px-6 py-3 rounded-2xl font-bold shadow-[0_0_20px_#22d3ee]"
            >
              Signup
            </Link>
          </>
        ) : (
          <div className="relative">
            {/* AVATAR */}
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="w-14 h-14 rounded-full bg-cyan-400 flex items-center justify-center text-black font-black text-xl cursor-pointer shadow-[0_0_25px_#22d3ee]"
            >
              {userInitial}
            </div>

            {/* DROPDOWN */}
            {showMenu && (
              <div className="absolute right-0 top-20 w-[300px] bg-[#111111] border border-white/10 rounded-3xl p-5 shadow-2xl z-50">
                {/* USER INFO */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-cyan-400 flex items-center justify-center text-black font-black text-xl">
                    {userInitial}
                  </div>

                  <div>
                    <h2 className="text-white font-bold text-lg">
                      {user?.email?.split("@")[0]}
                    </h2>

                    <p className="text-cyan-400 text-sm">Premium User</p>
                  </div>
                </div>

                {/* MENU */}
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/settings")}
                    className="w-full flex items-center px-5 py-4 rounded-2xl hover:bg-white/5 transition-all text-gray-200"
                  >
                    ⚙️ Settings
                  </button>

                  <button className="w-full flex items-center px-5 py-4 rounded-2xl hover:bg-white/5 transition-all text-gray-200">
                    🌙 Appearance
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-5 py-4 rounded-2xl hover:bg-red-500/20 transition-all text-red-400"
                  >
                    ↩ Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
