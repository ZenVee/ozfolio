import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/DashboardComponents';
import {
  Bell, Shield, Globe, Trash2, Save, ChevronRight,
} from 'lucide-react';

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/[0.05] last:border-0">
      <div className="mr-8">
        <p className="text-sm font-medium text-white">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-11 h-6 rounded-full transition-all ${on ? 'bg-purple-600' : 'bg-white/10'}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${on ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`} />
    </button>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-[#0e0e1e] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400">
          {icon}
        </div>
        <h3 className="font-semibold text-white text-sm">{title}</h3>
      </div>
      <div className="px-6">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const inputClass = "px-3.5 py-2 rounded-lg bg-[#0a0a18] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all";

  return (
    <div className="p-8 max-w-2xl">
      <PageHeader title="Settings" description="Manage your account and application preferences." />

      <div className="space-y-5">
        {/* Notifications */}
        <Section title="Notifications" icon={<Bell size={15} />}>
          <SettingRow label="Portfolio view milestones" description="Get notified when you hit a view milestone">
            <Toggle defaultChecked />
          </SettingRow>
          <SettingRow label="New gallery comments" description="Notifications when someone comments">
            <Toggle />
          </SettingRow>
          <SettingRow label="Weekly analytics digest" description="A weekly summary of your portfolio performance">
            <Toggle defaultChecked />
          </SettingRow>
          <SettingRow label="Product updates" description="News about OZFolio features and announcements">
            <Toggle defaultChecked />
          </SettingRow>
        </Section>

        {/* Privacy */}
        <Section title="Privacy & Visibility" icon={<Globe size={15} />}>
          <SettingRow label="Portfolio visibility" description="Control who can view your public portfolio">
            <select className={inputClass}>
              <option>Public</option>
              <option>Private</option>
              <option>Unlisted</option>
            </select>
          </SettingRow>
          <SettingRow label="Show in community directory" description="Allow your portfolio to appear in the explore page">
            <Toggle defaultChecked />
          </SettingRow>
          <SettingRow label="Allow image downloads" description="Let visitors download your images">
            <Toggle />
          </SettingRow>
        </Section>

        {/* Security */}
        <Section title="Security" icon={<Shield size={15} />}>
          <SettingRow label="Current password">
            <input type="password" placeholder="••••••••" className={inputClass} />
          </SettingRow>
          <SettingRow label="New password">
            <input type="password" placeholder="••••••••" className={inputClass} />
          </SettingRow>
          <SettingRow label="Two-factor authentication" description="Add an extra layer of security">
            <button className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white text-xs hover:bg-white/[0.1] transition-all flex items-center gap-1.5">
              Enable <ChevronRight size={12} />
            </button>
          </SettingRow>
          <div className="py-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-all">
              <Save size={14} />
              Update Password
            </button>
          </div>
        </Section>

        {/* Danger zone */}
        <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-6">
          <h3 className="font-semibold text-red-400 text-sm mb-1">Danger Zone</h3>
          <p className="text-xs text-slate-500 mb-4">These actions are permanent and cannot be undone.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/20 text-red-400 text-sm hover:bg-red-500/10 transition-all">
              Clear All Images
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/20 text-red-400 text-sm hover:bg-red-500/10 transition-all">
              <Trash2 size={14} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
