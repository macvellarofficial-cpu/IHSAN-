import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Search, 
  Filter, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  Share2, 
  BookOpen, 
  X,
  UserCheck
} from 'lucide-react';
import { Story, BlogPost } from '../types';

interface StoriesNewsPageProps {
  onNavigate: (tab: string, meta?: any) => void;
  onOpenDonate: (fundCategory?: string) => void;
  onOpenStoryDetail: (story: Story) => void;
  onOpenPostDetail: (post: BlogPost) => void;
  stories: Story[];
  posts: BlogPost[];
}

export const StoriesNewsPage: React.FC<StoriesNewsPageProps> = ({
  onNavigate,
  onOpenDonate,
  onOpenStoryDetail,
  onOpenPostDetail,
  stories,
  posts,
}) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'news'>('stories');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredStories = stories.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-20">
      
      {/* Hero Banner */}
      <section className="bg-[#1A3020] text-white py-16 sm:py-20 bg-islamic-pattern border-b-4 border-[#F27D26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24422c] text-[#F27D26] text-xs font-semibold uppercase tracking-wider border border-[#F27D26]/30">
            <BookOpen className="w-3.5 h-3.5 text-[#F27D26]" />
            Field Voices & Dispatches
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FDFCF8]">
            Stories of Hope & Field News
          </h1>
          <p className="text-sm sm:text-base text-[#E6E2D3] max-w-2xl mx-auto leading-relaxed font-light">
            Dignified updates celebrating transformation, alongside real-time dispatches from our humanitarian teams across Uganda.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Navigation Switcher & Search Bar */}
        <div className="bg-[#FDFCF8] p-4 sm:p-6 rounded-2xl border border-[#E6E2D3] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-[#F5F2EA] p-1 rounded-xl w-full sm:w-auto border border-[#E6E2D3]">
              <button
                onClick={() => { setActiveTab('stories'); setSelectedCategory('all'); }}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all w-1/2 sm:w-auto cursor-pointer ${
                  activeTab === 'stories'
                    ? 'bg-[#1A3020] text-[#FDFCF8] shadow-xs'
                    : 'text-[#5A5A40] hover:text-[#1A3020]'
                }`}
              >
                Stories of Hope ({stories.length})
              </button>
              <button
                onClick={() => { setActiveTab('news'); setSelectedCategory('all'); }}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all w-1/2 sm:w-auto cursor-pointer ${
                  activeTab === 'news'
                    ? 'bg-[#1A3020] text-[#FDFCF8] shadow-xs'
                    : 'text-[#5A5A40] hover:text-[#1A3020]'
                }`}
              >
                News & Field Articles ({posts.length})
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#5A5A40] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stories, topics..."
                className="w-full pl-9 pr-3 py-2 bg-[#F5F2EA] border border-[#E6E2D3] text-[#1A3020] placeholder-[#5A5A40]/70 rounded-xl text-xs focus:ring-2 focus:ring-[#F27D26] focus:outline-hidden"
              />
            </div>

          </div>
        </div>

        {/* Stories View */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            
            {/* Safeguarding Banner */}
            <div className="p-4 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] text-xs text-[#1A3020] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#F27D26] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1A3020]">Child Safeguarding & Dignity Guarantee: </strong>
                In strict compliance with international child protection charters, all personal names are anonymised and images are used solely with informed consent to preserve the dignity of every child.
              </div>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  className="bg-[#FDFCF8] rounded-3xl overflow-hidden border border-[#E6E2D3] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center justify-between text-xs text-[#5A5A40]">
                      <span className="font-semibold text-[#F27D26] bg-[#F5F2EA] border border-[#E6E2D3] px-2.5 py-0.5 rounded-full">
                        {story.category.replace('_', ' ')}
                      </span>
                      <span>{story.location}</span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1A3020] leading-snug">
                      {story.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
                      {story.summary}
                    </p>

                    <div className="p-3.5 bg-[#F5F2EA] rounded-2xl border border-[#E6E2D3] text-xs text-[#1A3020] space-y-1">
                      <span className="font-bold text-[#1A3020] block">Documented Impact:</span>
                      <p className="text-[#5A5A40]">{story.impactOutcome}</p>
                    </div>

                    <p className="text-[11px] text-[#5A5A40] italic">
                      {story.safeguardingNotice}
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-[#E6E2D3] mt-2">
                    <button
                      onClick={() => onOpenStoryDetail(story)}
                      className="text-xs font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Full Account</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenDonate(story.category)}
                      className="px-4 py-2 bg-[#F27D26] hover:bg-[#d96b1c] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Support This Cause
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* News View */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => onOpenPostDetail(post)}
                className="bg-[#FDFCF8] rounded-3xl overflow-hidden border border-[#E6E2D3] shadow-2xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-[#5A5A40]">
                      <span className="font-semibold text-[#F27D26] bg-[#F5F2EA] border border-[#E6E2D3] px-2 py-0.5 rounded-md">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#1A3020] hover:text-[#F27D26] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#5A5A40] line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {post.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-[#F5F2EA] border border-[#E6E2D3] text-[#5A5A40] px-2 py-0.5 rounded-md">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 text-xs font-bold text-[#1A3020] flex items-center gap-1">
                  <span>Read Field Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

    </div>
  );
};
