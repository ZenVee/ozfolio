import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, MessageSquare, ArrowRight } from 'lucide-react';
import { PEXELS_IMAGES } from '@/lib/mock-data';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left: Form */}
      <div className="w-full lg:w-[460px] min-h-screen bg-[#07070f] flex flex-col">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
              <Camera size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              OZ<span className="oz-text-gradient-subtle">Folio</span>
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white mb-2">Welcome back</h1>
              <p className="text-slate-400 text-sm">Sign in to access your OZFolio dashboard.</p>
            </div>

            {/* Discord button */}
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-3 w-full py-3.5 px-5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] transition-all text-white font-semibold text-sm mb-4 group"
            >
              <svg width="20" height="20" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z" fill="white"/>
              </svg>
              Continue with Discord
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-xs text-slate-600">or</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            {/* Email form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Email address</label>
                <input
                  type="email"
                  placeholder="jake@mainlinemedia.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-400">Password</label>
                  <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</a>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-purple-500/25"
              >
                Sign In
              </Link>
            </form>

            <p className="text-center text-xs text-slate-600 mt-6">
              Don't have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">Create one free</Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right: Cinematic image */}
      <div className="hidden lg:block flex-1 relative overflow-hidden">
        <img
          src={PEXELS_IMAGES.sunset2}
          alt="Los Santos Sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070f] via-[#07070f]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Overlay text */}
        <div className="absolute bottom-12 left-12 right-12">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-2 font-medium">Featured Portfolio</p>
          <p className="text-3xl font-black text-white mb-1">Sunset Media</p>
          <p className="text-white/60 text-sm">Capturing Los Santos, one golden hour at a time.</p>
        </div>
      </div>
    </div>
  );
}
