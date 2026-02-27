import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);

  React.useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed w-full top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">💎</div>
            <h1 className="text-2xl font-bold text-white">Nexus Fintech</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 text-blue-300 hover:text-white font-semibold transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Banking for the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Age
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Experience modern banking with lightning-fast transfers, zero hidden
            fees, and complete control over your finances—all in one secure
            platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition transform hover:scale-105"
            >
              Open Your Account
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 border-2 border-blue-500 text-blue-300 hover:bg-blue-500/10 font-bold rounded-lg transition"
            >
              Sign In →
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose Nexus?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Instant Transfers",
                desc: "Send money across the globe in seconds, not days.",
              },
              {
                icon: "🔐",
                title: "Bank-Grade Security",
                desc: "Your funds are protected with military-grade encryption.",
              },
              {
                icon: "💰",
                title: "No Hidden Fees",
                desc: "Transparent pricing with zero surprise charges.",
              },
              {
                icon: "📊",
                title: "Smart Analytics",
                desc: "Track your spending with detailed charts and insights.",
              },
              {
                icon: "🌍",
                title: "Global Access",
                desc: "Manage accounts in multiple currencies worldwide.",
              },
              {
                icon: "📱",
                title: "24/7 Support",
                desc: "Get help anytime with our responsive support team.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl border border-blue-500/30 hover:border-blue-400/60 transition transform hover:scale-105"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "5M+", label: "Active Users" },
              { number: "$50B+", label: "Transactions" },
              { number: "195", label: "Countries" },
              { number: "99.9%", label: "Uptime" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to revolutionize your finances?
          </h3>
          <p className="text-blue-100 mb-8">
            Join millions in experiencing the future of banking. It only takes
            60 seconds to get started.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition transform hover:scale-105"
          >
            Create Your Account Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 py-12 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">💎</span>
                <span className="font-bold text-white">Nexus Fintech</span>
              </div>
              <p className="text-gray-400 text-sm">
                The future of digital banking is here.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Security", "Pricing"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers"],
              },
              {
                title: "Legal",
                links: ["Terms", "Privacy", "Contact"],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-blue-400 text-sm transition"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-blue-500/20 pt-8 text-center text-gray-400 text-sm">
            <p>
              © 2026 Nexus Fintech. All rights reserved. | Secure Banking for
              Everyone
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
