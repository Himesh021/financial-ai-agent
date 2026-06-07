import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-black flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-cyan-500/20 via-black to-black relative items-center justify-center">
        <div className="absolute w-[500px] h-[500px] bg-cyan-400/20 blur-[120px] rounded-full" />

        <div className="relative z-10 max-w-xl px-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-5 h-5 rounded-md bg-cyan-400 shadow-[0_0_20px_#22d3ee]" />

            <h1 className="text-5xl font-black text-white">FinAI</h1>
          </div>

          <h2 className="text-6xl font-black text-white leading-tight mb-8">
            Build Your Own AI Financial Workspace
          </h2>

          <p className="text-gray-400 text-xl leading-9 mb-10">
            Join the next-generation financial intelligence platform powered by
            AI agents, real-time analytics, and smart insights.
          </p>

          <div className="space-y-5">
            {[
              "AI-Powered Stock Analysis",
              "Advanced Market Intelligence",
              "Smart Risk Assessment",
              "Personal Watchlists",
            ].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

                <p className="text-lg text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-10 relative">
        <div className="absolute w-[400px] h-[400px] bg-cyan-400/10 blur-[120px] rounded-full" />

        <form
          onSubmit={handleSignup}
          className="relative z-10 w-full max-w-md bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-[32px] p-10 shadow-2xl"
        >
          <h1 className="text-5xl font-black text-white mb-3">
            Create Account
          </h1>

          <p className="text-gray-400 mb-10 text-lg">
            Start your AI investing journey
          </p>

          <div className="space-y-6">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-cyan-400 transition-all"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-5 text-white outline-none focus:border-cyan-400 transition-all"
            />

            <button
              type="submit"
              className="w-full bg-cyan-400 text-black py-5 rounded-2xl font-black text-lg hover:scale-[1.02] transition-all shadow-[0_0_30px_#22d3ee]"
            >
              Create Account
            </button>
          </div>

          <p className="text-gray-400 mt-8 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-400 font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
