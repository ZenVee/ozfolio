import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn, Download, Share2, Eye, Images as ImagesIcon,
} from 'lucide-react';
import { mockGalleries, mockImages } from '@/lib/mock-data';

export default function GalleryPage() {
  const { handle = 'mainline-automotive', id = '' } = useParams();
  const gallery = mockGalleries.find((g) => g.id === id) || mockGalleries[0];
  const images = mockImages.filter((img) => img.galleryId === gallery.id);
  const allImages = images.length > 0 ? images : mockImages;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + allImages.length) % allImages.length : 0));
  }, [allImages.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % allImages.length : 0));
  }, [allImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, prev, next]);

  const currentImage = lightboxIndex !== null ? allImages[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#06060f] text-white">
      {/* Header */}
      <div className="relative h-72 overflow-hidden">
        <img src={gallery.coverImage} alt={gallery.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060f] via-[#06060f]/50 to-black/30" />

        <div className="absolute top-6 left-6">
          <Link
            to={`/portfolio/${handle}`}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors oz-glass px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
        </div>

        <div className="absolute bottom-8 left-6 right-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs text-purple-400 font-semibold uppercase tracking-widest mb-1">Gallery</p>
            <h1 className="text-3xl font-black text-white mb-2">{gallery.name}</h1>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5"><ImagesIcon size={14} />{allImages.length} images</span>
              <span className="flex items-center gap-1.5"><Eye size={14} />{gallery.views.toLocaleString()} views</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Description */}
      {gallery.description && (
        <div className="max-w-6xl mx-auto px-6 py-6 border-b border-white/[0.06]">
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">{gallery.description}</p>
        </div>
      )}

      {/* Masonry grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {allImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden"
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.thumbnail}
                alt={img.title}
                className="w-full object-cover group-hover:brightness-75 transition-all duration-300"
                style={{ aspectRatio: `${img.width}/${img.height}` }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn size={18} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs font-medium text-white truncate">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
              <div>
                <p className="text-white font-semibold">{currentImage.title}</p>
                <p className="text-xs text-slate-500">{lightboxIndex + 1} / {allImages.length} · {currentImage.resolution}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] flex items-center justify-center text-slate-400 hover:text-white transition-all" onClick={(e) => e.stopPropagation()}>
                  <Download size={16} />
                </button>
                <button className="w-9 h-9 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] flex items-center justify-center text-slate-400 hover:text-white transition-all" onClick={(e) => e.stopPropagation()}>
                  <Share2 size={16} />
                </button>
                <button
                  onClick={closeLightbox}
                  className="w-9 h-9 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="max-w-6xl max-h-[80vh] mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage.url}
                alt={currentImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] flex items-center justify-center text-white transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] flex items-center justify-center text-white transition-all"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 px-6 overflow-hidden">
              {allImages.slice(Math.max(0, lightboxIndex - 4), lightboxIndex + 5).map((img, i) => {
                const realIndex = Math.max(0, lightboxIndex - 4) + i;
                return (
                  <button
                    key={img.id}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(realIndex); }}
                    className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${realIndex === lightboxIndex ? 'border-purple-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img.thumbnail} alt="" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
