import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Eye,
  FolderOpen,
  Images,
  HardDrive,
  Upload,
  Plus,
  ExternalLink,
  TrendingUp,
  Clock,
  Folder,
  Settings,
  ArrowUpRight,
} from 'lucide-react';
import { StatCard, PageHeader } from '@/components/DashboardComponents';
import { mockGalleries, mockImages, mockActivity, PEXELS_IMAGES } from '@/lib/mock-data';

export default function DashboardPage() {
  const recentImages = mockImages.slice(0, 4);

  return (
    <div className="p-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back, Jake. Here's what's happening."
        action={
          <div className="flex items-center gap-2">
            <Link
              to="/portfolio/mainline-automotive"
              className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] rounded-lg transition-all"
            >
              <ExternalLink size={14} />
              View Portfolio
            </Link>
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all">
              <Upload size={14} />
              Upload
            </button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Portfolio Views"
          value="24,891"
          change="+18.4%"
          positive
          icon={<Eye size={18} className="text-purple-400" />}
          iconBg="bg-purple-500/15"
          index={0}
        />
        <StatCard
          title="Gallery Count"
          value="6"
          change="+2 new"
          positive
          icon={<FolderOpen size={18} className="text-orange-400" />}
          iconBg="bg-orange-500/15"
          index={1}
        />
        <StatCard
          title="Image Count"
          value="241"
          change="+32 this month"
          positive
          icon={<Images size={18} className="text-blue-400" />}
          iconBg="bg-blue-500/15"
          index={2}
        />
        <StatCard
          title="Storage Used"
          value="2.4 GB"
          change="of 10 GB"
          positive
          icon={<HardDrive size={18} className="text-emerald-400" />}
          iconBg="bg-emerald-500/15"
          index={3}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent uploads */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Recent Uploads</h2>
            <Link to="/dashboard/images" className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recentImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className="relative group rounded-xl overflow-hidden bg-[#111121] border border-white/[0.06] hover:border-purple-500/20 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={img.thumbnail}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-white truncate">{img.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{img.fileSize} · {img.resolution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div>
            <h2 className="text-base font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { icon: Upload, label: 'Upload Images', href: '/dashboard/images', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { icon: Plus, label: 'Create Gallery', href: '/dashboard/galleries', color: 'text-orange-400', bg: 'bg-orange-500/10' },
                { icon: Settings, label: 'Edit Portfolio', href: '/dashboard/portfolio', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { icon: ExternalLink, label: 'Share Portfolio', href: '/portfolio/mainline-automotive', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    to={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#111121] border border-white/[0.06] hover:border-white/10 hover:bg-[#141426] transition-all group"
                  >
                    <div className={`w-8 h-8 rounded-lg ${action.bg} flex items-center justify-center`}>
                      <Icon size={15} className={action.color} />
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{action.label}</span>
                    <ArrowUpRight size={14} className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <h2 className="text-base font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {mockActivity.slice(0, 4).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.type === 'upload' && <Upload size={13} className="text-purple-400" />}
                    {item.type === 'gallery_created' && <Folder size={13} className="text-orange-400" />}
                    {item.type === 'view_milestone' && <TrendingUp size={13} className="text-emerald-400" />}
                    {item.type === 'settings_updated' && <Settings size={13} className="text-blue-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-300 leading-relaxed">{item.message}</p>
                    <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                      <Clock size={10} />
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
