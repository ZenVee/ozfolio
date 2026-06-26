import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/DashboardComponents';
import { Save, Upload, Palette, Type, Globe } from 'lucide-react';
import { mockPortfolioSettings } from '@/lib/mock-data';

const fonts = ['Inter', 'Montserrat', 'Playfair Display', 'DM Sans', 'Space Grotesk'];
const themes = ['dark', 'light', 'sunset', 'midnight', 'minimal'];

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-[#0e0e1e] border border-white/[0.07] rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400">
          {icon}
        </div>
        <h3 className="font-semibold text-white text-sm">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function PortfolioSettingsPage() {
  const [settings, setSettings] = useState(mockPortfolioSettings);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const inputClass = "w-full px-3.5 py-2.5 rounded-lg bg-[#0a0a18] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-purple-500/50 transition-all";

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader
        title="Portfolio Settings"
        description="Customize how your public portfolio looks and feels."
        action={
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-all"
          >
            <Save size={14} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        }
      />

      <div className="space-y-5">
        {/* Portfolio Details */}
        <SectionCard title="Portfolio Details" icon={<Globe size={16} />}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Portfolio Name">
              <input
                className={inputClass}
                value={settings.portfolioName}
                onChange={(e) => setSettings({ ...settings, portfolioName: e.target.value })}
              />
            </Field>
            <Field label="Portfolio URL">
              <div className="flex items-center">
                <span className="px-3 py-2.5 text-xs text-slate-500 bg-white/[0.03] border border-r-0 border-white/[0.08] rounded-l-lg">ozfolio.com/</span>
                <input
                  className="flex-1 px-3.5 py-2.5 rounded-r-lg bg-[#0a0a18] border border-white/[0.08] text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                  value={settings.portfolioUrl}
                  onChange={(e) => setSettings({ ...settings, portfolioUrl: e.target.value })}
                />
              </div>
            </Field>
            <Field label="Business Name">
              <input
                className={inputClass}
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              />
            </Field>
            <Field label="Description">
              <textarea
                rows={3}
                className={`${inputClass} resize-none`}
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              />
            </Field>
          </div>
        </SectionCard>

        {/* Branding */}
        <SectionCard title="Branding" icon={<Palette size={16} />}>
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Profile Image">
                <div className="flex items-center gap-3">
                  <img
                    src={settings.profileImage}
                    alt="Profile"
                    className="w-14 h-14 rounded-xl object-cover border border-white/10"
                  />
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-white text-xs transition-all">
                    <Upload size={13} />
                    Change
                  </button>
                </div>
              </Field>
              <Field label="Banner Image">
                <div className="flex items-center gap-3">
                  <img
                    src={settings.bannerImage}
                    alt="Banner"
                    className="w-24 h-14 rounded-xl object-cover border border-white/10"
                  />
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-white text-xs transition-all">
                    <Upload size={13} />
                    Change
                  </button>
                </div>
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Primary Color">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-white/[0.08] bg-transparent cursor-pointer"
                  />
                  <input
                    className={`${inputClass} flex-1`}
                    value={settings.primaryColor}
                    onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                  />
                </div>
              </Field>
              <Field label="Secondary Color">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-white/[0.08] bg-transparent cursor-pointer"
                  />
                  <input
                    className={`${inputClass} flex-1`}
                    value={settings.secondaryColor}
                    onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                  />
                </div>
              </Field>
            </div>
          </div>
        </SectionCard>

        {/* Typography & Theme */}
        <SectionCard title="Typography & Theme" icon={<Type size={16} />}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Font Family">
              <select
                className={inputClass}
                value={settings.font}
                onChange={(e) => setSettings({ ...settings, font: e.target.value })}
              >
                {fonts.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Portfolio Theme">
              <div className="flex flex-wrap gap-2 pt-1">
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSettings({ ...settings, theme: t })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      settings.theme === t
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.09] border border-white/[0.07]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
