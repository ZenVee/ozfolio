import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 oz-glass-dark">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
            <Camera size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            OZ<span className="oz-text-gradient-subtle">Folio</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</Link>
          <Link to="/#portfolios" className="text-sm text-slate-400 hover:text-white transition-colors">Portfolios</Link>
          <Link to="/portfolio/mainline-automotive" className="text-sm text-slate-400 hover:text-white transition-colors">Demo</Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate-300 hover:text-white px-4 py-2 transition-colors">
            Sign In
          </Link>
          <Link
            to="/login"
            className="text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white px-4 py-2 rounded-lg transition-all"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden oz-glass-dark border-t border-white/10 px-6 py-4 flex flex-col gap-4"
        >
          <Link to="/#features" className="text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link to="/#portfolios" className="text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>Portfolios</Link>
          <Link to="/login" className="text-sm font-medium bg-purple-600 text-white px-4 py-2 rounded-lg text-center" onClick={() => setMenuOpen(false)}>Get Started</Link>
        </motion.div>
      )}
    </nav>
  );
}
