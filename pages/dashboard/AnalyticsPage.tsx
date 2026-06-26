import { motion } from 'framer-motion';
import { PageHeader } from '@/components/DashboardComponents';
import { mockAnalytics, mockImages } from '@/lib/mock-data';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import { Eye, TrendingUp, Monitor, Smartphone, Tablet } from 'lucide-react';

const deviceData = [
  { name: 'Desktop', value: 58, color: '#a855f7' },
  { name: 'Mobile', value: 34, color: '#f97316' },
  { name: 'Tablet', value: 8, color: '#3b82f6' },
];

const geoData = [
  { country: 'United States', visits: 4821, pct: 38 },
  { country: 'United Kingdom', visits: 2134, pct: 17 },
  { country: 'Australia', visits: 1876, pct: 15 },
  { country: 'Canada', visits: 1203, pct: 10 },
  { country: 'Germany', visits: 891, pct: 7 },
  { country: 'Other', visits: 1647, pct: 13 },
];

const topImages = mockImages.slice(0, 5).sort((a, b) => b.views - a.views);

function MetricCard({ title, value, change, icon, index }: { title: string; value: string; change: string; icon: React.ReactNode; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-[#0e0e1e] border border-white/[0.07] rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-slate-400">{title}</p>
        <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-emerald-400 mt-1">{change}</p>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#151528] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-slate-400 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <PageHeader
        title="Analytics"
        description="Track your portfolio's performance and audience insights."
      />

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total Views" value="24,891" change="+18.4% this month" icon={<Eye size={16} />} index={0} />
        <MetricCard title="Unique Visitors" value="18,234" change="+14.2% this month" icon={<TrendingUp size={16} />} index={1} />
        <MetricCard title="Avg. Session" value="2m 47s" change="+0.3s this month" icon={<Monitor size={16} />} index={2} />
        <MetricCard title="Gallery Views" value="67,412" change="+22.1% this month" icon={<Eye size={16} />} index={3} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Views chart */}
        <div className="lg:col-span-2 bg-[#0e0e1e] border border-white/[0.07] rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-white">Visitor Trends</h3>
              <p className="text-xs text-slate-500 mt-0.5">Last 30 days</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />Views</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />Visitors</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockAnalytics}>
              <defs>
                <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="visitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="views" name="Views" stroke="#a855f7" strokeWidth={2} fill="url(#views)" />
              <Area type="monotone" dataKey="uniqueVisitors" name="Visitors" stroke="#f97316" strokeWidth={2} fill="url(#visitors)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Device breakdown */}
        <div className="bg-[#0e0e1e] border border-white/[0.07] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-1">Device Breakdown</h3>
          <p className="text-xs text-slate-500 mb-5">Visitor devices</p>
          <div className="flex justify-center mb-5">
            <PieChart width={160} height={160}>
              <Pie data={deviceData} cx={75} cy={75} innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                {deviceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2.5">
            {deviceData.map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-sm text-slate-300 flex-1">{d.name}</span>
                <span className="text-sm font-semibold text-white">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top images */}
        <div className="bg-[#0e0e1e] border border-white/[0.07] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-5">Most Viewed Images</h3>
          <div className="space-y-3">
            {topImages.map((img, i) => (
              <div key={img.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-600 w-4 text-center">{i + 1}</span>
                <img src={img.thumbnail} alt={img.title} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{img.title}</p>
                  <p className="text-xs text-slate-500">{img.galleryName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{img.views.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic */}
        <div className="bg-[#0e0e1e] border border-white/[0.07] rounded-xl p-6">
          <h3 className="font-semibold text-white mb-5">Top Locations</h3>
          <div className="space-y-3">
            {geoData.map((g) => (
              <div key={g.country} className="flex items-center gap-3">
                <p className="text-sm text-slate-300 w-32 truncate flex-shrink-0">{g.country}</p>
                <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${g.pct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
                  />
                </div>
                <p className="text-xs text-slate-500 w-10 text-right flex-shrink-0">{g.pct}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
