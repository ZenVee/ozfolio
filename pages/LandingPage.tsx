import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import {
  Camera,
  Layers,
  BarChart2,
  Palette,
  Globe,
  ChevronRight,
  Star,
  Users,
  ImageIcon,
  ArrowRight,
} from 'lucide-react';
import { EXAMPLE_PORTFOLIOS, PEXELS_IMAGES } from '@/lib/mock-data';

const features = [
  {
    icon: Camera,
    title: 'Cinematic Galleries',
    description: 'Showcase your work in stunning masonry and fullscreen gallery layouts that put your photography first.',
    gradient: 'from-purple-500/20 to-purple-600/5',
    iconColor: 'text-purple-400',
  },
  {
    icon: Layers,
    title: 'Multi-Gallery Management',
    description: 'Organize your images into curated galleries. Control visibility, order, and presentation with ease.',
    gradient: 'from-orange-500/20 to-orange-600/5',
    iconColor: 'text-orange-400',
  },
  {
    icon: BarChart2,
    title: 'Portfolio Analytics',
    description: 'Track views, visitor trends, and your most popular images. Understand your audience with detailed insights.',
    gradient: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-400',
  },
  {
    icon: Palette,
    title: 'Custom Branding',
    description: 'Personalize your portfolio with custom colors, fonts, and themes to match your unique style.',
    gradient: 'from-pink-500/20 to-pink-600/5',
    iconColor: 'text-pink-400',
  },
  {
    icon: Globe,
    title: 'Public Portfolio URL',
    description: 'Share your work with a clean, memorable portfolio link. No subscriptions required to share.',
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-400',
  },
  {
    icon: ImageIcon,
    title: 'Image Optimization',
    description: 'Your photos are delivered fast and sharp. Optimized for all devices from mobile to 4K displays.',
    gradient: 'from-cyan-500/20 to-cyan-600/5',
    iconColor: 'text-cyan-400',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#06060f] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={PEXELS_IMAGES.city1}
            alt="Los Santos"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06060f]/60 via-[#06060f]/40 to-[#06060f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-orange-900/10" />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6">
              <Star size={12} className="fill-purple-400 text-purple-400" />
              Built with love
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none"
          >
            Your Photography.{' '}
            <span className="oz-text-gradient">Elevated.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            OZFolio is a premium portfolio platform designed for photographers and visual artists to showcase their work with style. Build a professional portfolio, organize your galleries, and present your photography in a clean, modern space that puts your work first.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              to="/login"
              className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30"
            >
              Get Started Free
              <ChevronRight size={16} />
            </Link>
            <Link
              to="/portfolio/mainline-automotive"
              className="flex items-center gap-2 px-7 py-3.5 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-white font-medium rounded-xl transition-all"
            >
              View Demo Portfolio
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center justify-center gap-8 mt-16 pt-8 border-t border-white/[0.06]"
          >
            {[
              { value: '2,400+', label: 'Photographers' },
              { value: '180K+', label: 'Images Hosted' },
              { value: '4.2M', label: 'Portfolio Views' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Platform Features</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A complete platform for managing and sharing your visual work with the community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${feat.gradient} border border-white/[0.07] hover:border-white/[0.12] transition-all group`}
              >
                <div className={`w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4 ${feat.iconColor}`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Screenshot showcase */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[PEXELS_IMAGES.city1, PEXELS_IMAGES.car1, PEXELS_IMAGES.night1, PEXELS_IMAGES.sunset2,
              PEXELS_IMAGES.aerial2, PEXELS_IMAGES.car2, PEXELS_IMAGES.city2, PEXELS_IMAGES.neon1].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-square rounded-xl overflow-hidden"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio previews */}
      <section id="portfolios" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-2">Community</p>
            <h2 className="text-4xl font-black text-white">Featured Portfolios</h2>
          </div>
          <Link to="/portfolio/mainline-automotive" className="hidden md:flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {EXAMPLE_PORTFOLIOS.map((p, i) => (
            <motion.div
              key={p.handle}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl overflow-hidden bg-[#0e0e1e] border border-white/[0.07] hover:border-purple-500/20 transition-all"
            >
              <Link to="/portfolio/mainline-automotive">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.banner} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e1e] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-xl object-cover border-2 border-white/20" />
                    <div>
                      <p className="font-bold text-white text-sm">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.handle}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-purple-400 font-medium mb-2">{p.specialty}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><ImageIcon size={12} />{p.imageCount} images</span>
                    <span className="flex items-center gap-1"><Users size={12} />{p.views} views</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 oz-gradient-sunset opacity-20" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-4">
                Start Showcasing Your Work
              </h2>
              <p className="text-slate-400 mb-8 text-lg">
                Join thousands of photographers already using OZFolio to share their vision with the world.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-white font-bold rounded-xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 text-base"
              >
                Create Your Portfolio
                <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                <Camera size={14} className="text-white" />
              </div>
              <span className="font-bold text-white">OZ<span className="oz-text-gradient-subtle">Folio</span></span>
            </div>
            <p className="text-sm text-slate-600 text-center">
              This is a ProdigyRP based website. All content is fictional and for in-game use only.
            </p>
            <div className="flex items-center gap-5 text-sm text-slate-600">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
