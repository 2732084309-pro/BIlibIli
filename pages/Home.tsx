import React, { useState, useEffect } from 'react';
import { Video, Category } from '../types';
import VideoCard from '../components/VideoCard';
import { GameIcon, TechIcon, MusicIcon, TvIcon, HomeIcon, SparklesIcon } from '../components/Icons';
import { videoService } from '../services/videoService';

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.RECOMMENDED);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      try {
        const data = await videoService.getVideos(activeCategory);
        setVideos(data);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, [activeCategory]);

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
        
        {/* Featured / Carousel Simulation - Only on Recommended */}
        {activeCategory === Category.RECOMMENDED && !loading && (
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
        
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
             {Array.from({length: 10}).map((_, i) => (
               <div key={i} className="animate-pulse">
                 <div className="bg-gray-200 aspect-video rounded-lg mb-2"></div>
                 <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                 <div className="h-3 bg-gray-200 rounded w-1/2"></div>
               </div>
             ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;