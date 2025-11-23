import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Video } from '../types';
import { LikeIcon, ShareIcon, MoreIcon, SparklesIcon } from '../components/Icons';
import VideoCard from '../components/VideoCard';
import { generateVideoSummary } from '../services/geminiService';

// Reusing generator for mock recommendations
const generateRecommendations = (count: number): Video[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `r${i}`,
    title: `Recommended Video Title #${i + 1}`,
    thumbnail: `https://picsum.photos/seed/${i + 500}/320/180`,
    author: `Creator_${i}`,
    views: `${Math.floor(Math.random() * 500)}k`,
    date: `2 days ago`,
    duration: "12:34",
    category: 'Recommended',
    avatar: `https://picsum.photos/seed/u${i}/50`
  }));
};

const Watch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [recommendations, setRecommendations] = useState<Video[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  useEffect(() => {
    // Mock fetch current video details
    const mockVideo: Video = {
      id: id || 'v1',
      title: "Building a Modern Frontend with React & Tailwind CSS",
      thumbnail: `https://picsum.photos/seed/${id}/1280/720`,
      author: "TechGuru_Official",
      views: "234.5k",
      date: "3 days ago",
      duration: "15:42",
      category: "Tech",
      avatar: "https://picsum.photos/seed/techguru/100"
    };
    setVideo(mockVideo);
    setRecommendations(generateRecommendations(10));
    setSummary(""); // Reset summary on new video
  }, [id]);

  const handleGenerateSummary = async () => {
    if (!video) return;
    setIsLoadingSummary(true);
    const result = await generateVideoSummary(video.title, video.author);
    setSummary(result);
    setIsLoadingSummary(false);
  };

  if (!video) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8">
      
      {/* Left Column: Player & Info */}
      <div className="flex-1 min-w-0">
        
        {/* Player Container */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative group">
            {/* Mock Video Element */}
            <img src={video.thumbnail} className="w-full h-full opacity-50 object-cover" alt="Video Placeholder" />
            <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-[#FB7299] text-white p-4 rounded-full shadow-lg transform transition-transform group-hover:scale-110">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
            </div>
            
            {/* Mock Controls */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent px-4 flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="w-full bg-gray-600 h-1 rounded-full overflow-hidden">
                 <div className="w-1/3 h-full bg-[#FB7299]"></div>
               </div>
               <span className="text-xs">05:12 / {video.duration}</span>
            </div>
        </div>

        {/* Video Info */}
        <div className="mt-4 pb-6 border-b border-gray-100">
          <h1 className="text-xl md:text-2xl font-medium text-gray-900 leading-snug">{video.title}</h1>
          
          <div className="mt-3 flex items-center justify-between text-gray-500 text-sm">
             <div className="flex items-center gap-4">
               <span className="flex items-center gap-1"><span className="text-gray-400">Views</span> {video.views}</span>
               <span className="flex items-center gap-1"><span className="text-gray-400">Date</span> {video.date}</span>
             </div>
             
             <div className="flex items-center gap-6 text-gray-600">
               <button className="flex items-center gap-2 hover:text-[#FB7299] transition-colors">
                  <LikeIcon className="w-6 h-6" />
                  <span className="hidden sm:inline">Like</span>
               </button>
               <button className="flex items-center gap-2 hover:text-[#FB7299] transition-colors">
                  <ShareIcon className="w-6 h-6" />
                  <span className="hidden sm:inline">Share</span>
               </button>
               <button className="hover:text-[#FB7299]">
                  <MoreIcon className="w-6 h-6" />
               </button>
             </div>
          </div>
        </div>

        {/* AI Summary Section */}
        <div className="mt-4 bg-pink-50 rounded-xl p-4 border border-pink-100">
           <div className="flex items-center justify-between mb-2">
             <h3 className="flex items-center gap-2 text-sm font-bold text-[#FB7299]">
               <SparklesIcon className="w-4 h-4" />
               AI Assistant
             </h3>
             {!summary && !isLoadingSummary && (
                <button 
                  onClick={handleGenerateSummary}
                  className="text-xs bg-white text-[#FB7299] border border-[#FB7299] px-3 py-1 rounded-full hover:bg-[#FB7299] hover:text-white transition-colors"
                >
                  Summarize Video
                </button>
             )}
           </div>
           
           {isLoadingSummary && <p className="text-xs text-gray-500 animate-pulse">Generating summary with Gemini...</p>}
           
           {summary && (
             <p className="text-sm text-gray-700 leading-relaxed">
               {summary}
             </p>
           )}
           {!summary && !isLoadingSummary && <p className="text-xs text-gray-400">Click to generate a quick summary of this content.</p>}
        </div>

        {/* Description & Author */}
        <div className="mt-6 flex gap-4">
           <img src={video.avatar} alt={video.author} className="w-12 h-12 rounded-full border border-gray-100" />
           <div>
             <div className="flex items-center gap-2">
               <h3 className="font-bold text-gray-800 hover:text-[#FB7299] cursor-pointer">{video.author}</h3>
               <span className="bg-[#FB7299] text-white text-[10px] px-1 rounded">UP</span>
             </div>
             <p className="text-xs text-gray-400 mt-1">256k subscribers</p>
             <p className="text-sm text-gray-600 mt-3 leading-relaxed">
               This is a mock description for the Bilibili clone project. In this video, we explore how to build high-quality frontend interfaces using React and Tailwind CSS. Don't forget to like and subscribe!
             </p>
           </div>
        </div>

        {/* Comments Section (Static Mock) */}
        <div className="mt-8">
           <h3 className="text-lg font-bold mb-4">Comments <span className="text-gray-400 text-sm font-normal">(1,234)</span></h3>
           {/* Comment Input */}
           <div className="flex gap-4 mb-6">
             <img src="https://picsum.photos/seed/me/50" className="w-10 h-10 rounded-full" alt="Me" />
             <div className="flex-1">
               <textarea className="w-full bg-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#FB7299] transition-all resize-none h-20" placeholder="Add a comment..."></textarea>
               <div className="mt-2 flex justify-end">
                 <button className="bg-[#FB7299] text-white px-6 py-2 rounded-md text-sm hover:bg-[#ff8eb3] transition-colors">Post</button>
               </div>
             </div>
           </div>

           {/* Comment List */}
           {[1, 2, 3].map(i => (
             <div key={i} className="flex gap-4 mb-6">
               <img src={`https://picsum.photos/seed/comment${i}/50`} className="w-10 h-10 rounded-full" alt="User" />
               <div className="flex-1 pb-4 border-b border-gray-100">
                 <div className="flex items-center gap-2 mb-1">
                   <span className="font-medium text-sm text-gray-600">User_{i * 99}</span>
                   <span className="text-xs text-gray-400">Lv.5</span>
                 </div>
                 <p className="text-sm text-gray-800">Great video! Really helped me understand the concepts better.</p>
                 <div className="mt-2 flex gap-4 text-xs text-gray-400">
                    <span>2024-05-{10+i}</span>
                    <span className="cursor-pointer hover:text-[#FB7299]">Like</span>
                    <span className="cursor-pointer hover:text-[#FB7299]">Reply</span>
                 </div>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Right Column: Recommendations */}
      <div className="w-full lg:w-[350px] flex-shrink-0">
        <h3 className="text-base font-bold mb-4">Up Next</h3>
        <div className="flex flex-col gap-4">
          {recommendations.map((rec) => (
             <div key={rec.id} className="flex gap-3 group cursor-pointer">
               <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                 <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover" />
                 <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">
                   {rec.duration}
                 </span>
               </div>
               <div className="flex flex-col gap-1">
                 <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-[#FB7299] transition-colors">
                   {rec.title}
                 </h4>
                 <span className="text-xs text-gray-400 mt-auto">{rec.author}</span>
                 <span className="text-xs text-gray-400">{rec.views} views</span>
               </div>
             </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Watch;