import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/DashboardComponents';
import {
  Plus, Search, Eye, EyeOff, Lock, MoreVertical, Edit2, Trash2, GripVertical, Images,
} from 'lucide-react';
import { mockGalleries } from '@/lib/mock-data';
import type { Gallery } from '@/lib/types';
import { cn } from '@/lib/utils';

const visibilityConfig = {
  public: { icon: Eye, label: 'Public', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  private: { icon: Lock, label: 'Private', color: 'text-red-400', bg: 'bg-red-500/10' },
  unlisted: { icon: EyeOff, label: 'Unlisted', color: 'text-orange-400', bg: 'bg-orange-500/10' },
};

function GalleryCard({ gallery, index }: { gallery: Gallery; index: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const vis = visibilityConfig[gallery.visibility];
  const VisIcon = vis.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="group bg-[#0e0e1e] border border-white/[0.07] rounded-xl overflow-hidden hover:border-purple-500/20 transition-all"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={gallery.coverImage}
          alt={gallery.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Drag handle */}
        <button className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
          <GripVertical size={14} />
        </button>

        {/* Visibility badge */}
        <div className={cn('absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm', vis.bg, vis.color)}>
          <VisIcon size={11} />
          {vis.label}
        </div>

        {/* Image count */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium">
          <Images size={12} />
          {gallery.imageCount} images
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-sm truncate">{gallery.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{gallery.description}</p>
          </div>
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <MoreVertical size={14} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -4 }}
                  className="absolute right-0 top-9 w-36 bg-[#151528] border border-white/[0.1] rounded-xl overflow-hidden z-20 shadow-xl"
                >
                  <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-xs text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors">
                    <Edit2 size={13} /> Edit Gallery
                  </button>
                  <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-xs text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors">
                    <Eye size={13} /> View Public
                  </button>
                  <div className="h-px bg-white/[0.06] mx-2" />
                  <button className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={13} /> Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.05]">
          <span className="text-xs text-slate-500">{gallery.views.toLocaleString()} views</span>
          <span className="text-xs text-slate-600">·</span>
          <span className="text-xs text-slate-500">Updated {gallery.updatedAt}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleriesPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('updated');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = mockGalleries.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <PageHeader
        title="Galleries"
        description={`${mockGalleries.length} galleries · ${mockGalleries.reduce((a, g) => a + g.imageCount, 0)} total images`}
        action={
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-all"
          >
            <Plus size={15} />
            Create Gallery
          </button>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search galleries..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#0e0e1e] border border-white/[0.07] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-purple-500/40 transition-all"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3.5 py-2.5 rounded-lg bg-[#0e0e1e] border border-white/[0.07] text-slate-300 text-sm focus:outline-none focus:border-purple-500/40 transition-all"
        >
          <option value="updated">Recently Updated</option>
          <option value="views">Most Viewed</option>
          <option value="images">Most Images</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((g, i) => (
          <GalleryCard key={g.id} gallery={g} index={i} />
        ))}
      </div>

      {/* Create Gallery Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowCreate(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="w-full max-w-md bg-[#0e0e1e] border border-white/[0.1] rounded-2xl p-6"
            >
              <h2 className="text-lg font-bold text-white mb-1">Create Gallery</h2>
              <p className="text-sm text-slate-400 mb-5">Add a new gallery to organize your images.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Gallery Name</label>
                  <input placeholder="e.g. Vinewood Hills" className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a18] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-purple-500/50 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Description</label>
                  <textarea rows={3} placeholder="Describe this gallery..." className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a18] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-purple-500/50 transition-all resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Visibility</label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a18] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all">
                    <option value="public">Public</option>
                    <option value="unlisted">Unlisted</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] text-white text-sm font-medium transition-all">Cancel</button>
                <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-all">Create Gallery</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
