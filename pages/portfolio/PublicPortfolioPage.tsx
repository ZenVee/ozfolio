import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Camera, Instagram, Twitter, ExternalLink, Eye, ImageIcon, Mail } from 'lucide-react';
import { mockGalleries, mockPortfolioSettings, PEXELS_IMAGES } from '@/lib/mock-data';

export default function PublicPortfolioPage() {
  const { handle = 'mainline-automotive' } = useParams();

  return (
    <div className="min-h-screen bg-[#06060f] text-white">
      {/* Hero Banner */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src={PEXELS_IMAGES.city1}
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060f] via-[#06060f]/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06060f]/60 via-transparent to-transparent" />

        {/* Logo top left */}
        <div className="absolute top-6 left-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
              <Camera size={15} className="text-white" />
            </div>
            <span className="font-bold text-white/80 text-sm">OZFolio</span>
          </Link>
        </div>
      </div>

      {/* Profile section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative -mt-20 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-end gap-5"
          >
            <div className="relative">
              <img
                src={mockPortfolioSettings.profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-2xl object-cover border-4 border-[#06060f] shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>

            <div className="flex-1 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <p className="text-xs text-purple-400 font-medium uppercase tracking-widest mb-1">Photography Portfolio</p>
                  <h1 className="text-3xl font-black text-white">{mockPortfolioSettings.portfolioName}</h1>
                  <p className="text-slate-400 text-sm mt-1">{mockPortfolioSettings.businessName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all">
                    <Mail size={14} />
                    Contact
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.12] transition-all">
                    <Instagram size={15} />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.12] transition-all">
                    <Twitter size={15} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/[0.07]">
          {[
            { value: `${mockGalleries.length}`, label: 'Galleries' },
            { value: `${mockGalleries.reduce((a, g) => a + g.imageCount, 0)}`, label: 'Images' },
            { value: '24.8K', label: 'Views' },
            { value: '4 yrs', label: 'Active' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
          <div className="flex-1" />
          <p className="text-sm text-slate-400 max-w-sm hidden md:block text-right leading-relaxed">
            {mockPortfolioSettings.description}
          </p>
        </div>

        {/* Bio (mobile) */}
        <p className="text-sm text-slate-400 mb-8 leading-relaxed md:hidden">{mockPortfolioSettings.description}</p>

        {/* Galleries grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Galleries</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockGalleries.filter((g) => g.visibility === 'public').map((gallery, i) => (
              <motion.div
                key={gallery.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <Link to={`/portfolio/${handle}/gallery/${gallery.id}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={gallery.coverImage}
                      alt={gallery.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-bold text-white text-base mb-1">{gallery.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-white/60">
                        <span className="flex items-center gap-1"><ImageIcon size={11} />{gallery.imageCount}</span>
                        <span className="flex items-center gap-1"><Eye size={11} />{gallery.views.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <ExternalLink size={15} className="text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] mt-16 py-8 px-6 text-center">
        <p className="text-xs text-slate-600">
          Powered by <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors">OZFolio</Link>
        </p>
      </footer>
    </div>
  );
}
