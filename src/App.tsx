import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Youtube, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowLeft, 
  LayoutDashboard, 
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Post, SiteSettings, View } from './types';
import { INITIAL_POSTS, INITIAL_SETTINGS } from './constants';

export default function App() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // CMS State for Admin
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);

  const handleAddPost = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      title: '새로운 게시글 제목',
      excerpt: '게시글 요약 내용을 입력하세요.',
      content: '본문 내용을 입력하세요.',
      category: '카테고리',
      imageUrl: 'https://picsum.photos/seed/' + Math.random() + '/800/600',
      date: new Date().toISOString().split('T')[0],
    };
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    setEditingPost(null);
  };

  const handleUpdateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-ivory/80 backdrop-blur-md border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex-shrink-0 cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <h1 className="text-2xl font-bold tracking-tighter text-charcoal">
                {settings.siteName}
              </h1>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setCurrentView('home')} className="text-sm font-medium hover:text-soft-pink transition-colors">홈</button>
              <button className="text-sm font-medium hover:text-soft-pink transition-colors">카테고리</button>
              <button className="text-sm font-medium hover:text-soft-pink transition-colors">소개</button>
              <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-charcoal/10">
                <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="text-charcoal/60 hover:text-soft-pink">
                  <Instagram size={18} />
                </a>
                <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" className="text-charcoal/60 hover:text-soft-pink">
                  <Youtube size={18} />
                </a>
                <button 
                  onClick={() => setCurrentView('admin')}
                  className="p-2 rounded-full bg-charcoal text-ivory hover:bg-soft-pink transition-colors"
                >
                  <Settings size={16} />
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('admin')}
                className="p-2 rounded-full bg-charcoal text-ivory"
              >
                <Settings size={16} />
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-ivory border-b border-charcoal/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                <button onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 text-lg font-medium">홈</button>
                <button className="block w-full text-left py-2 text-lg font-medium">카테고리</button>
                <button className="block w-full text-left py-2 text-lg font-medium">소개</button>
                <div className="flex space-x-6 pt-4">
                  <a href={settings.instagramUrl} className="text-charcoal/60"><Instagram /></a>
                  <a href={settings.youtubeUrl} className="text-charcoal/60"><Youtube /></a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <HomeView 
              posts={posts} 
              settings={settings} 
              onPostClick={(post) => { setSelectedPost(post); setCurrentView('post'); }} 
            />
          )}
          {currentView === 'post' && selectedPost && (
            <PostDetailView 
              post={selectedPost} 
              onBack={() => setCurrentView('home')} 
            />
          )}
          {currentView === 'admin' && (
            <AdminView 
              posts={posts} 
              settings={settings} 
              onUpdateSettings={handleUpdateSettings}
              onAddPost={handleAddPost}
              onDeletePost={handleDeletePost}
              onEditPost={(post) => setEditingPost(post)}
              editingPost={editingPost}
              onSavePost={handleUpdatePost}
              onCancelEdit={() => setEditingPost(null)}
              onBack={() => setCurrentView('home')}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-charcoal text-ivory py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold mb-4">{settings.siteName}</h2>
          <p className="text-ivory/60 text-sm mb-8">{settings.slogan}</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href={settings.instagramUrl} className="hover:text-soft-pink transition-colors"><Instagram /></a>
            <a href={settings.youtubeUrl} className="hover:text-soft-pink transition-colors"><Youtube /></a>
          </div>
          <p className="text-ivory/40 text-xs">© 2024 Turoing Beautiful. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// --- Sub-Views ---

function HomeView({ posts, settings, onPostClick }: { posts: Post[], settings: SiteSettings, onPostClick: (p: Post) => void }) {
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Editorial Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-soft-pink font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              BEAUTY & LIFESTYLE
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] text-charcoal mb-6">
              {settings.siteName.split(' ')[0]} <br />
              <span className="italic font-normal text-soft-pink">
                {settings.siteName.split(' ')[1] || 'Beautiful'}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-charcoal/60 max-w-lg leading-relaxed mb-8">
              {settings.slogan}
            </p>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => onPostClick(featuredPost)}
                className="px-8 py-4 bg-charcoal text-ivory rounded-full font-bold text-sm tracking-wider hover:bg-soft-pink transition-all transform hover:scale-105"
              >
                최신 포스트 읽기
              </button>
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-ivory overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="pl-6 text-xs font-bold text-charcoal/40 flex items-center">
                  +1,200명이 읽고 있어요
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Organic Pill Shape Image */}
            <div className="aspect-[3/4] rounded-[100px] overflow-hidden shadow-2xl border-[12px] border-white/50">
              <img 
                src="https://picsum.photos/seed/hero-beauty/800/1200" 
                alt="Beauty Hero" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center space-x-4 max-w-[200px]">
              <div className="w-12 h-12 bg-soft-pink/20 rounded-full flex items-center justify-center text-soft-pink">
                <Edit3 size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-charcoal/40 uppercase">Today's Pick</p>
                <p className="text-sm font-bold leading-tight">{featuredPost.title}</p>
              </div>
            </div>
          </motion.div>
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-soft-pink/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-soft-pink/5 rounded-full blur-3xl -z-10"></div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="flex items-center space-x-4 mb-12">
        <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-charcoal/40 whitespace-nowrap">
          Latest Stories
        </h3>
        <div className="h-[1px] w-full bg-charcoal/10"></div>
      </div>

      {/* Post Grid - More Elegant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer flex flex-col"
            onClick={() => onPostClick(post)}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6 shadow-sm">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <button className="w-full py-3 bg-white/90 backdrop-blur-md rounded-xl text-xs font-bold uppercase tracking-widest">
                  Read Article
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-soft-pink">
                  {post.category}
                </span>
                <span className="text-[10px] font-medium text-charcoal/30">
                  {post.date}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold leading-tight group-hover:text-soft-pink transition-colors">
                {post.title}
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <section className="bg-white rounded-[40px] p-8 md:p-16 shadow-sm border border-charcoal/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-soft-pink/5 rounded-full blur-3xl -z-0"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-soft-pink font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">
              제품협찬 협업 문의해주세요. <br />
              <span className="italic font-normal text-soft-pink">메시지를 남겨주세요.</span>
            </h2>
            <p className="text-charcoal/60 leading-relaxed mb-8 max-w-md">
              제품 협찬 협업 문의환영합니다. 
             
            </p>
            <div className="flex items-center space-x-4 text-sm font-bold text-charcoal/40">
              <div className="w-10 h-[1px] bg-charcoal/20"></div>
              <span>miraclemin10@gmail.com</span>
            </div>
          </div>

          <form 
            className="space-y-6"
            action="https://formspree.io/f/mjgpyggw"
            method="POST"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              
              try {
                const response = await fetch(form.action, {
                  method: form.method,
                  body: formData,
                  headers: {
                    'Accept': 'application/json'
                  }
                });
                
                if (response.ok) {
                  alert('메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.');
                  form.reset();
                } else {
                  alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                }
              } catch (error) {
                alert('네트워크 오류가 발생했습니다.');
              }
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 ml-2">Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="이름을 입력하세요"
                  className="w-full bg-ivory/50 border border-charcoal/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-soft-pink transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 ml-2">Email</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  placeholder="이메일을 입력하세요"
                  className="w-full bg-ivory/50 border border-charcoal/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-soft-pink transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 ml-2">Message</label>
              <textarea 
                required
                name="message"
                placeholder="내용을 입력하세요"
                rows={4}
                className="w-full bg-ivory/50 border border-charcoal/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-soft-pink transition-all resize-none"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-5 bg-charcoal text-ivory rounded-2xl font-bold tracking-widest hover:bg-soft-pink transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              메시지 보내기
            </button>
          </form>
        </div>
      </section>
    </motion.div>
  );
}

function PostDetailView({ post, onBack }: { post: Post, onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <button 
        onClick={onBack}
        className="flex items-center text-sm font-medium text-charcoal/60 hover:text-soft-pink mb-8 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" /> 목록으로 돌아가기
      </button>

      <div className="mb-12">
        <span className="text-soft-pink font-bold uppercase tracking-widest text-sm mb-4 block">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center text-charcoal/40 text-sm mb-8">
          <span>{post.date}</span>
        </div>
        <div className="aspect-video rounded-3xl overflow-hidden mb-12">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="prose prose-lg max-w-none text-charcoal/80 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </motion.div>
  );
}

function AdminView({ 
  posts, 
  settings, 
  onUpdateSettings, 
  onAddPost, 
  onDeletePost, 
  onEditPost,
  editingPost,
  onSavePost,
  onCancelEdit,
  onBack
}: { 
  posts: Post[], 
  settings: SiteSettings, 
  onUpdateSettings: (s: SiteSettings) => void,
  onAddPost: () => void,
  onDeletePost: (id: string) => void,
  onEditPost: (p: Post) => void,
  editingPost: Partial<Post> | null,
  onSavePost: (p: Post) => void,
  onCancelEdit: () => void,
  onBack: () => void
}) {
  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center">
            <LayoutDashboard className="mr-3" /> 관리자 대시보드
          </h2>
          <p className="text-charcoal/60">웹사이트의 콘텐츠와 설정을 관리하세요.</p>
        </div>
        <button 
          onClick={onBack}
          className="px-6 py-2 rounded-full border border-charcoal/20 hover:bg-charcoal hover:text-ivory transition-all text-sm font-medium"
        >
          사이트 보기
        </button>
      </div>

      <div className="flex space-x-4 mb-8 border-b border-charcoal/10">
        <button 
          onClick={() => setActiveTab('posts')}
          className={`pb-4 px-4 text-sm font-bold transition-all ${activeTab === 'posts' ? 'border-b-2 border-soft-pink text-soft-pink' : 'text-charcoal/40'}`}
        >
          게시글 관리
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`pb-4 px-4 text-sm font-bold transition-all ${activeTab === 'settings' ? 'border-b-2 border-soft-pink text-soft-pink' : 'text-charcoal/40'}`}
        >
          사이트 설정
        </button>
      </div>

      {activeTab === 'posts' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">전체 게시글 ({posts.length})</h3>
            <button 
              onClick={onAddPost}
              className="flex items-center px-4 py-2 bg-charcoal text-ivory rounded-lg text-sm font-bold hover:bg-soft-pink transition-colors"
            >
              <Plus size={18} className="mr-2" /> 새 글 작성
            </button>
          </div>

          <div className="grid gap-4">
            {posts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded-xl border border-charcoal/5 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={post.imageUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{post.title}</h4>
                    <p className="text-xs text-charcoal/40">{post.date} • {post.category}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onEditPost(post)}
                    className="p-2 text-charcoal/60 hover:text-soft-pink hover:bg-soft-pink/10 rounded-lg transition-all"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => onDeletePost(post.id)}
                    className="p-2 text-charcoal/60 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white p-8 rounded-2xl border border-charcoal/5 shadow-sm max-w-2xl">
          <h3 className="text-xl font-bold mb-8">일반 설정</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">사이트 이름</label>
              <input 
                type="text" 
                value={settings.siteName}
                onChange={(e) => onUpdateSettings({ ...settings, siteName: e.target.value })}
                className="w-full p-3 rounded-xl border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-soft-pink"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">슬로건</label>
              <input 
                type="text" 
                value={settings.slogan}
                onChange={(e) => onUpdateSettings({ ...settings, slogan: e.target.value })}
                className="w-full p-3 rounded-xl border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-soft-pink"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">포인트 컬러</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    value={settings.primaryColor}
                    onChange={(e) => onUpdateSettings({ ...settings, primaryColor: e.target.value })}
                    className="w-10 h-10 rounded-lg border-none cursor-pointer"
                  />
                  <span className="text-sm font-mono">{settings.primaryColor}</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">인스타그램 URL</label>
              <input 
                type="text" 
                value={settings.instagramUrl}
                onChange={(e) => onUpdateSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full p-3 rounded-xl border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-soft-pink"
              />
            </div>
          </div>
        </div>
      )}

      {/* Post Edit Modal */}
      <AnimatePresence>
        {editingPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-ivory w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">게시글 수정</h3>
                <button onClick={onCancelEdit}><X /></button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">제목</label>
                  <input 
                    type="text" 
                    value={editingPost.title}
                    onChange={(e) => onEditPost({ ...editingPost as Post, title: e.target.value })}
                    className="w-full p-3 rounded-xl border border-charcoal/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">카테고리</label>
                  <input 
                    type="text" 
                    value={editingPost.category}
                    onChange={(e) => onEditPost({ ...editingPost as Post, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-charcoal/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">요약</label>
                  <textarea 
                    value={editingPost.excerpt}
                    onChange={(e) => onEditPost({ ...editingPost as Post, excerpt: e.target.value })}
                    className="w-full p-3 rounded-xl border border-charcoal/10 h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">본문 내용</label>
                  <textarea 
                    value={editingPost.content}
                    onChange={(e) => onEditPost({ ...editingPost as Post, content: e.target.value })}
                    className="w-full p-3 rounded-xl border border-charcoal/10 h-64"
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button 
                    onClick={onCancelEdit}
                    className="px-6 py-2 rounded-full border border-charcoal/20 font-bold"
                  >
                    취소
                  </button>
                  <button 
                    onClick={() => onSavePost(editingPost as Post)}
                    className="px-6 py-2 rounded-full bg-charcoal text-ivory font-bold hover:bg-soft-pink transition-colors"
                  >
                    저장하기
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
