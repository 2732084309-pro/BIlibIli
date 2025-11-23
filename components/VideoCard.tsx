import React from 'react';
import { Link } from 'react-router-dom';
import { PlayIcon, MessageIcon } from './Icons';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="group relative flex flex-col gap-2 cursor-pointer">
      <Link to={`/video/${video.id}`} className="block">
        {/* Thumbnail Container */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200">
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay Stats (visible on hover or always on mobile? Bilibili keeps them always visible but subtle) */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs font-medium">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <PlayIcon className="w-3 h-3" />
                {video.views}
              </span>
              <span className="flex items-center gap-1">
                <MessageIcon className="w-3 h-3" />
                {/* Mock comment count based on views roughly */}
                {Math.floor(parseInt(video.views) / 10)}
              </span>
            </div>
            <span>{video.duration}</span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-2.5 flex gap-3 items-start">
           <h3 className="text-sm md:text-[15px] font-medium text-gray-900 line-clamp-2 leading-tight group-hover:text-[#FB7299] transition-colors">
             {video.title}
           </h3>
        </div>
        
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          <span className="hover:text-[#FB7299] transition-colors flex items-center gap-1">
            <span className="border border-gray-200 rounded px-1 text-[10px] text-[#FB7299] hidden group-hover:inline-block">UP</span>
            {video.author}
          </span>
          <span>·</span>
          <span>{video.date}</span>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;