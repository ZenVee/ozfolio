import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  Images,
  BarChart2,
  Settings,
  Camera,
  FolderOpen,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/portfolio', label: 'Portfolio', icon: User },
  { href: '/dashboard/galleries', label: 'Galleries', icon: FolderOpen },
  { href: '/dashboard/images', label: 'Images', icon: Images },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-[#0d0d18] border-r border-white/[0.06] flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
            <Camera size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            OZ<span className="oz-text-gradient-subtle">Folio</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative',
                active
                  ? 'bg-purple-500/15 text-purple-300'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-purple-500/10 rounded-lg border border-purple-500/20"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon size={17} className={cn('relative z-10', active ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300')} />
              <span className="relative z-10">{item.label}</span>
              {active && <ChevronRight size={14} className="ml-auto relative z-10 text-purple-400/60" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1">
          <img
            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80"
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/30"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Jake Mitchell</p>
            <p className="text-xs text-slate-500 truncate">mainline-automotive</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-white hover:bg-white/[0.05] transition-all">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
