// ============================================
// MAX Admin Panel
// Manage Portfolio, Testimonials, Social Links
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Youtube,
  Instagram,
  MessageSquare,
  Settings,
  Loader2,
  AlertCircle,
  GripVertical,
  ExternalLink
} from 'lucide-react';

// ============================================
// Types
// ============================================

interface PortfolioVideo {
  id: string;
  youtube_id: string;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  duration: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image_url: string;
  rating: number;
  video_id: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
}

interface SocialLink {
  id: string;
  platform: string;
  handle: string;
  url: string;
  icon_name: string;
  color: string;
  display_order: number;
  is_active: boolean;
}

interface Setting {
  key: string;
  value: string;
}

// ============================================
// Main Admin Panel Component
// ============================================

type Tab = 'portfolio' | 'testimonials' | 'social' | 'settings';

export function MaxAdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('portfolio');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [portfolioVideos, setPortfolioVideos] = useState<PortfolioVideo[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  // Edit states
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioVideo | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialLink | null>(null);

  // Fetch all data
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [portfolioRes, testimonialsRes, socialRes, settingsRes] = await Promise.all([
        supabase.from('max_portfolio_videos').select('*').order('display_order'),
        supabase.from('max_testimonials').select('*').order('display_order'),
        supabase.from('max_social_links').select('*').order('display_order'),
        supabase.from('max_settings').select('*'),
      ]);

      if (portfolioRes.data) setPortfolioVideos(portfolioRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
      if (socialRes.data) setSocialLinks(socialRes.data);
      if (settingsRes.data) {
        const settingsMap = settingsRes.data.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
        setSettings(settingsMap);
      }

    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: Tab; label: string; icon: typeof Youtube }[] = [
    { id: 'portfolio', label: 'Portfolio', icon: Youtube },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'social', label: 'Social Links', icon: Instagram },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020814] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#00d4ff] animate-spin mx-auto" />
          <p className="text-white/60 mt-4">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020814] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#020814]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#00d4ff', textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}>
                MAX Admin
              </h1>
              <p className="text-white/50 text-sm">Manage portfolio, testimonials, and settings</p>
            </div>
            <a
              href="/max"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#00d4ff]/50 transition-all"
            >
              View Site
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Tabs */}
          <nav className="flex gap-1 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab.id ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                  color: activeTab === tab.id ? '#00d4ff' : 'rgba(255,255,255,0.5)',
                  boxShadow: activeTab === tab.id ? '0 0 20px rgba(0, 212, 255, 0.2)' : undefined,
                }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PortfolioTab
                videos={portfolioVideos}
                editingVideo={editingPortfolio}
                setEditingVideo={setEditingPortfolio}
                onRefresh={fetchAllData}
              />
            </motion.div>
          )}

          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <TestimonialsTab
                testimonials={testimonials}
                editingTestimonial={editingTestimonial}
                setEditingTestimonial={setEditingTestimonial}
                onRefresh={fetchAllData}
              />
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SocialTab
                links={socialLinks}
                editingLink={editingSocial}
                setEditingLink={setEditingSocial}
                onRefresh={fetchAllData}
              />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SettingsTab
                settings={settings}
                onRefresh={fetchAllData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ============================================
// Portfolio Tab
// ============================================

function PortfolioTab({
  videos,
  editingVideo,
  setEditingVideo,
  onRefresh,
}: {
  videos: PortfolioVideo[];
  editingVideo: PortfolioVideo | null;
  setEditingVideo: (v: PortfolioVideo | null) => void;
  onRefresh: () => void;
}) {
  const [saving, setSaving] = useState(false);

  const categories = ['All', 'Documentary', 'Commercial', 'Educational', 'Event', 'Social', 'Music'];

  const handleSave = async () => {
    if (!editingVideo) return;
    setSaving(true);

    try {
      if (editingVideo.id) {
        await supabase
          .from('max_portfolio_videos')
          .update({
            youtube_id: editingVideo.youtube_id,
            title: editingVideo.title,
            client: editingVideo.client,
            category: editingVideo.category,
            thumbnail: editingVideo.thumbnail,
            duration: editingVideo.duration,
            description: editingVideo.description,
            is_active: editingVideo.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingVideo.id);
      } else {
        await supabase.from('max_portfolio_videos').insert({
          youtube_id: editingVideo.youtube_id,
          title: editingVideo.title,
          client: editingVideo.client,
          category: editingVideo.category,
          thumbnail: editingVideo.thumbnail,
          duration: editingVideo.duration,
          description: editingVideo.description,
          display_order: videos.length + 1,
          is_active: true,
        });
      }

      setEditingVideo(null);
      onRefresh();
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this video?')) return;
    await supabase.from('max_portfolio_videos').delete().eq('id', id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Portfolio Videos</h2>
        <button
          onClick={() => setEditingVideo({
            id: '',
            youtube_id: '',
            title: '',
            client: '',
            category: 'Documentary',
            thumbnail: '',
            duration: '',
            description: '',
            display_order: 0,
            is_active: true,
          })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      {/* Edit Form */}
      {editingVideo && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">YouTube ID</label>
              <input
                type="text"
                value={editingVideo.youtube_id}
                onChange={(e) => setEditingVideo({ ...editingVideo, youtube_id: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                placeholder="e.g., dQw4w9WgXcQ"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Title</label>
              <input
                type="text"
                value={editingVideo.title}
                onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Client</label>
              <input
                type="text"
                value={editingVideo.client}
                onChange={(e) => setEditingVideo({ ...editingVideo, client: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Category</label>
              <select
                value={editingVideo.category}
                onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
              >
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Thumbnail URL</label>
              <input
                type="text"
                value={editingVideo.thumbnail}
                onChange={(e) => setEditingVideo({ ...editingVideo, thumbnail: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Duration</label>
              <input
                type="text"
                value={editingVideo.duration}
                onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                placeholder="e.g., 5:30"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-1">Description</label>
              <textarea
                value={editingVideo.description}
                onChange={(e) => setEditingVideo({ ...editingVideo, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                rows={2}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black font-medium hover:bg-[#00d4ff]/80 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
            <button
              onClick={() => setEditingVideo(null)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Video List */}
      <div className="grid gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00d4ff]/30 transition-all"
          >
            <GripVertical className="w-5 h-5 text-white/30 cursor-grab" />
            <img
              src={video.thumbnail || 'https://via.placeholder.com/160x90'}
              alt={video.title}
              className="w-32 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-white">{video.title}</h3>
              <p className="text-sm text-white/50">{video.client} • {video.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingVideo(video)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all"
              >
                <Pencil className="w-4 h-4 text-white/60" />
              </button>
              <button
                onClick={() => handleDelete(video.id)}
                className="p-2 rounded-lg hover:bg-red-500/20 transition-all"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Testimonials Tab
// ============================================

function TestimonialsTab({
  testimonials,
  editingTestimonial,
  setEditingTestimonial,
  onRefresh,
}: {
  testimonials: Testimonial[];
  editingTestimonial: Testimonial | null;
  setEditingTestimonial: (t: Testimonial | null) => void;
  onRefresh: () => void;
}) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editingTestimonial) return;
    setSaving(true);

    try {
      if (editingTestimonial.id) {
        await supabase
          .from('max_testimonials')
          .update({
            quote: editingTestimonial.quote,
            author: editingTestimonial.author,
            role: editingTestimonial.role,
            company: editingTestimonial.company,
            image_url: editingTestimonial.image_url,
            rating: editingTestimonial.rating,
            video_id: editingTestimonial.video_id || null,
            is_featured: editingTestimonial.is_featured,
            is_active: editingTestimonial.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingTestimonial.id);
      } else {
        await supabase.from('max_testimonials').insert({
          quote: editingTestimonial.quote,
          author: editingTestimonial.author,
          role: editingTestimonial.role,
          company: editingTestimonial.company,
          image_url: editingTestimonial.image_url,
          rating: editingTestimonial.rating,
          video_id: editingTestimonial.video_id || null,
          is_featured: editingTestimonial.is_featured,
          display_order: testimonials.length + 1,
          is_active: true,
        });
      }

      setEditingTestimonial(null);
      onRefresh();
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await supabase.from('max_testimonials').delete().eq('id', id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Testimonials</h2>
        <button
          onClick={() => setEditingTestimonial({
            id: '',
            quote: '',
            author: '',
            role: '',
            company: '',
            image_url: '',
            rating: 5,
            video_id: '',
            is_featured: false,
            display_order: 0,
            is_active: true,
          })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {/* Edit Form */}
      {editingTestimonial && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-white/60 mb-1">Quote</label>
              <textarea
                value={editingTestimonial.quote}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Author</label>
              <input
                type="text"
                value={editingTestimonial.author}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Role</label>
              <input
                type="text"
                value={editingTestimonial.role}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Company</label>
              <input
                type="text"
                value={editingTestimonial.company}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Image URL</label>
              <input
                type="text"
                value={editingTestimonial.image_url}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, image_url: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Rating</label>
              <select
                value={editingTestimonial.rating}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} Stars</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">YouTube Video ID (optional)</label>
              <input
                type="text"
                value={editingTestimonial.video_id || ''}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, video_id: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                placeholder="e.g., dQw4w9WgXcQ"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editingTestimonial.is_featured}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, is_featured: e.target.checked })}
                className="w-4 h-4"
              />
              <label className="text-sm text-white/60">Featured (shown in carousel)</label>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black font-medium hover:bg-[#00d4ff]/80 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
            <button
              onClick={() => setEditingTestimonial(null)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Testimonials List */}
      <div className="grid gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00d4ff]/30 transition-all"
          >
            <GripVertical className="w-5 h-5 text-white/30 cursor-grab" />
            <img
              src={testimonial.image_url || 'https://via.placeholder.com/200'}
              alt={testimonial.author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-white">{testimonial.author}</h3>
                {testimonial.is_featured && (
                  <span className="px-2 py-0.5 rounded text-xs bg-[#00d4ff]/20 text-[#00d4ff]">Featured</span>
                )}
              </div>
              <p className="text-sm text-white/50">{testimonial.role}, {testimonial.company}</p>
              <p className="text-sm text-white/70 mt-1 line-clamp-2">"{testimonial.quote}"</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingTestimonial(testimonial)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all"
              >
                <Pencil className="w-4 h-4 text-white/60" />
              </button>
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="p-2 rounded-lg hover:bg-red-500/20 transition-all"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Social Tab
// ============================================

function SocialTab({
  links,
  editingLink,
  setEditingLink,
  onRefresh,
}: {
  links: SocialLink[];
  editingLink: SocialLink | null;
  setEditingLink: (l: SocialLink | null) => void;
  onRefresh: () => void;
}) {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editingLink) return;
    setSaving(true);

    try {
      if (editingLink.id) {
        await supabase
          .from('max_social_links')
          .update({
            platform: editingLink.platform,
            handle: editingLink.handle,
            url: editingLink.url,
            icon_name: editingLink.icon_name,
            color: editingLink.color,
            is_active: editingLink.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingLink.id);
      } else {
        await supabase.from('max_social_links').insert({
          platform: editingLink.platform,
          handle: editingLink.handle,
          url: editingLink.url,
          icon_name: editingLink.icon_name,
          color: editingLink.color,
          display_order: links.length + 1,
          is_active: true,
        });
      }

      setEditingLink(null);
      onRefresh();
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this social link?')) return;
    await supabase.from('max_social_links').delete().eq('id', id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Social Links</h2>
        <button
          onClick={() => setEditingLink({
            id: '',
            platform: '',
            handle: '',
            url: '',
            icon_name: 'Link',
            color: '#00d4ff',
            display_order: 0,
            is_active: true,
          })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff]/20 border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      {/* Edit Form */}
      {editingLink && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Platform</label>
              <input
                type="text"
                value={editingLink.platform}
                onChange={(e) => setEditingLink({ ...editingLink, platform: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Handle</label>
              <input
                type="text"
                value={editingLink.handle}
                onChange={(e) => setEditingLink({ ...editingLink, handle: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">URL</label>
              <input
                type="text"
                value={editingLink.url}
                onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Icon Name (Lucide)</label>
              <input
                type="text"
                value={editingLink.icon_name}
                onChange={(e) => setEditingLink({ ...editingLink, icon_name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                placeholder="e.g., Instagram, Youtube, Twitter"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Color (hex)</label>
              <input
                type="text"
                value={editingLink.color}
                onChange={(e) => setEditingLink({ ...editingLink, color: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                placeholder="#00d4ff"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black font-medium hover:bg-[#00d4ff]/80 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
            <button
              onClick={() => setEditingLink(null)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Links List */}
      <div className="grid gap-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00d4ff]/30 transition-all"
          >
            <GripVertical className="w-5 h-5 text-white/30 cursor-grab" />
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: `${link.color}20` }}
            >
              <span style={{ color: link.color }} className="font-bold text-sm">{link.platform[0]}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white">{link.platform}</h3>
              <p className="text-sm text-white/50">{link.handle}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingLink(link)}
                className="p-2 rounded-lg hover:bg-white/10 transition-all"
              >
                <Pencil className="w-4 h-4 text-white/60" />
              </button>
              <button
                onClick={() => handleDelete(link.id)}
                className="p-2 rounded-lg hover:bg-red-500/20 transition-all"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Settings Tab
// ============================================

function SettingsTab({
  settings,
  onRefresh,
}: {
  settings: Record<string, string>;
  onRefresh: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);

    try {
      for (const [key, value] of Object.entries(localSettings)) {
        await supabase
          .from('max_settings')
          .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
      }

      onRefresh();
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setSaving(false);
    }
  };

  const settingGroups = [
    { title: 'Portfolio Section', keys: ['portfolio_title', 'portfolio_subtitle', 'portfolio_description', 'youtube_playlist_url'] },
    { title: 'Testimonials Section', keys: ['testimonials_section_title', 'testimonials_headline', 'testimonials_description'] },
    { title: 'About Section', keys: ['about_section_title', 'about_headline', 'about_description'] },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black font-medium hover:bg-[#00d4ff]/80 transition-all"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save All
        </button>
      </div>

      <div className="space-y-8">
        {settingGroups.map((group) => (
          <div key={group.title} className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-lg font-medium text-white mb-4">{group.title}</h3>
            <div className="space-y-4">
              {group.keys.map((key) => (
                <div key={key}>
                  <label className="block text-sm text-white/60 mb-1">
                    {key.split('_').map((w, i) => i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w).join(' ')}
                  </label>
                  {key.includes('description') ? (
                    <textarea
                      value={localSettings[key] || ''}
                      onChange={(e) => setLocalSettings({ ...localSettings, [key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                      rows={2}
                    />
                  ) : (
                    <input
                      type="text"
                      value={localSettings[key] || ''}
                      onChange={(e) => setLocalSettings({ ...localSettings, [key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MaxAdminPanel;
