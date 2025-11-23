import React, { useState, useEffect } from 'react';
import { Video, Category } from '../types';
import VideoCard from '../components/VideoCard';
import { GameIcon, TechIcon, MusicIcon, TvIcon, HomeIcon } from '../components/Icons';

// Mock Data Generator
const generateVideos = (count: number): Video[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `v${i + 100}`,
    title: [
      "Building a React App in 10 Minutes with AI",
      "Top 10 Anime Battles of 2024",
      "Why Rust is the Future of Web Development",
      "Genshin Impact: New Region Walkthrough",
      "Mechanical Keyboard ASMR - 4K 60FPS",
      "Understanding Quantum Computing Basics",
      "Cyberpunk 2077: Phantom Liberty Review",
      "How to Make Perfect Ramen at Home",
      "The History of Street Fighter",
      "Cat Funny Moments Compilation #52",
      "Exploring Tokyo: Akihabara Guide",
      "RTX 5090 Leaks & Rumors Analysis"
    ][i % 12] + (i > 11 ? ` - Part ${i}` : ""),
    thumbnail: `https://picsum.photos/seed/${i + 200}/640/360`,
    author: `User_${Math.floor(Math.random() * 1000)}`,
    views: `${Math.floor(Math.random() * 900) + 10}k`,
    date: `${Math.floor(Math.random() * 11) + 1} months ago`,
    duration: `${Math.floor(Math.random() * 20)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    category: Object.values(Category)[Math.floor(Math.random() * 5)],
    avatar: `https://picsum.photos/seed/user_${i}/100`
  }));
};

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.RECOMMENDED);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    // Simulate fetch
    setVideos(generateVideos(20));
  }, []);

  const categories = [
    { name: Category.RECOMMENDED, icon: <HomeIcon className="w-4 h-4" /> },
    { name: Category.ANIME, icon: <TvIcon className="w-4 h-4" /> },
    { name: Category.GAMING, icon: <GameIcon className="w-4 h-4" /> },
    { name: Category.TECH, icon: <TechIcon className="w-4 h-4" /> },
    { name: Category.MUSIC, icon: <MusicIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Category Nav - Sticky below Navbar */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-3">
        <div className="max-w-[1800px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap
                ${activeCategory === cat.name 
                  ? 'bg-[#FB7299] text-white shadow-md shadow-pink-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-4 py-6">
        
        {/* Featured / Carousel Simulation */}
        {activeCategory === Category.RECOMMENDED && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="col-span-1 md:col-span-2 row-span-2 relative rounded-xl overflow-hidden group cursor-pointer aspect-video md:aspect-auto">
              <img src="https://picsum.photos/seed/banner1/1280/720" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Banner" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                 <h2 className="text-white text-2xl font-bold mb-2">Summer Event 2025</h2>
                 <p className="text-white/80 line-clamp-1">Join the biggest anime convention live stream exclusively on Bilibili!</p>
              </div>
            </div>
            {/* Side banners */}
            {[1, 2].map((i) => (
               <div key={i} className="relative rounded-xl overflow-hidden group cursor-pointer aspect-video">
                 <img src={`https://picsum.photos/seed/banner${i+1}/640/360`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Banner" />
                 <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                   <p className="text-white text-sm font-medium">Featured Content {i}</p>
                 </div>
               </div>
            ))}
          </div>
        )}

        {/* Video Grid */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          {activeCategory === Category.RECOMMENDED ? <SparklesIcon className="w-5 h-5 text-[#FB7299] fill-current" /> : null}
          {activeCategory} Videos
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
import { SparklesIcon } from '../components/Icons';