import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '@/components/DashboardComponents';
import {
  Upload, Search, Filter, Grid3X3, List, CheckSquare, Square, Trash2, Edit2,
  Download, MoreHorizontal, X, Plus,
} from 'lucide-react';
import { mockImages } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function ImagesPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [view, setView] = useState<'masonry' | 'grid'>('masonry');
  const [showUpload, setShowUpload] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const filtered = mockImages.filter((img) =>
    img.title.toLowerCase().includes(search.toLowerCase())
  );

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((img) => img.id)));
    }
  }

  return (
    <div className="p-8">
      <PageHeader
        title="Image Manager"
        description={`${mockImages.length} images · 2.4 GB used`}
        action={
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-all"
          >
            <Upload size={15} />
            Upload Images
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
            placeholder="Search images..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#0e0e1e] border border-white/[0.07] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-purple-500/40 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#0e0e1e] border border-white/[0.07] text-slate-400 hover:text-white text-sm transition-all">
            <Filter size={14} />
            Filter
          </button>
          <div className="flex rounded-lg border border-white/[0.07] overflow-hidden">
            <button
              onClick={() => setView('masonry')}
              className={cn('p-2.5 transition-all', view === 'masonry' ? 'bg-purple-600 text-white' : 'bg-[#0e0e1e] text-slate-400 hover:text-white')}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setView('grid')}
              className={cn('p-2.5 transition-all', view === 'grid' ? 'bg-purple-600 text-white' : 'bg-[#0e0e1e] text-slate-400 hover:text-white')}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk action bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-purple-600/10 border border-purple-500/20"
          >
            <button onClick={selectAll} className="flex items-center gap-2 text-sm text-purple-300">
              <CheckSquare size={15} />
              {selected.size} selected
            </button>
            <div className="flex-1" />
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.07] text-white text-xs hover:bg-white/[0.12] transition-all">
              <Download size={13} /> Download
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 text-xs hover:bg-red-500/25 transition-all">
              <Trash2 size={13} /> Delete
            </button>
            <button onClick={() => setSelected(new Set())} className="text-slate-500 hover:text-white transition-colors">
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Masonry grid */}
      {view === 'masonry' ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((img, i) => {
            const isSelected = selected.has(img.id);
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  'break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer border-2 transition-all',
                  isSelected ? 'border-purple-500' : 'border-transparent'
                )}
                onClick={() => toggleSelect(img.id)}
              >
                <img
                  src={img.thumbnail}
                  alt={img.title}
                  className="w-full object-cover group-hover:brightness-90 transition-all"
                  style={{ aspectRatio: `${img.width}/${img.height}` }}
                />
                <div className={cn(
                  'absolute inset-0 transition-opacity',
                  isSelected || 'group-hover:opacity-100 opacity-0'
                )}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute top-2 left-2">
                    {isSelected ? (
                      <CheckSquare size={18} className="text-purple-400" />
                    ) : (
                      <Square size={18} className="text-white/70" />
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs font-medium text-white truncate">{img.title}</p>
                    <p className="text-xs text-slate-400">{img.fileSize}</p>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-6 h-6 rounded-md bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all" onClick={(e) => e.stopPropagation()}>
                      <Edit2 size={11} />
                    </button>
                    <button className="w-6 h-6 rounded-md bg-black/60 backdrop-blur-sm flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-all" onClick={(e) => e.stopPropagation()}>
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((img, i) => {
            const isSelected = selected.has(img.id);
            return (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => toggleSelect(img.id)}
                className={cn(
                  'flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border',
                  isSelected
                    ? 'bg-purple-600/10 border-purple-500/30'
                    : 'bg-[#0e0e1e] border-white/[0.06] hover:border-white/10'
                )}
              >
                <div className="w-6 flex-shrink-0">
                  {isSelected ? <CheckSquare size={16} className="text-purple-400" /> : <Square size={16} className="text-slate-600" />}
                </div>
                <img src={img.thumbnail} alt={img.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{img.title}</p>
                  <p className="text-xs text-slate-500">{img.galleryName}</p>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-xs text-slate-500">
                  <span>{img.resolution}</span>
                  <span>{img.fileSize}</span>
                  <span>{img.uploadedAt}</span>
                </div>
                <button className="text-slate-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                  <MoreHorizontal size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowUpload(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0e0e1e] border border-white/[0.1] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">Upload Images</h2>
                <button onClick={() => setShowUpload(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                className={cn(
                  'border-2 border-dashed rounded-xl p-12 text-center transition-all',
                  dragOver
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/[0.1] hover:border-purple-500/40 hover:bg-white/[0.02]'
                )}
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center mx-auto mb-4">
                  <Upload size={24} className="text-purple-400" />
                </div>
                <p className="text-white font-semibold mb-1">Drop images here</p>
                <p className="text-sm text-slate-500 mb-4">or click to browse your files</p>
                <button className="px-4 py-2 rounded-lg bg-white/[0.07] border border-white/[0.1] text-white text-sm hover:bg-white/[0.12] transition-all">
                  Browse Files
                </button>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Add to Gallery</label>
                <select className="w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a18] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all">
                  <option>Downtown Los Santos</option>
                  <option>Sunset Strip</option>
                  <option>Automotive Gallery</option>
                  <option>Night Life</option>
                </select>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
