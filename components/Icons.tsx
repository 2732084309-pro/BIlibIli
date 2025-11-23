import React from 'react';
import { 
  Search, 
  Upload, 
  Tv, 
  Gamepad2, 
  Cpu, 
  Music, 
  Home, 
  PlayCircle, 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  MoreHorizontal,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export const SearchIcon = ({ className }: { className?: string }) => <Search className={className} />;
export const UploadIcon = ({ className }: { className?: string }) => <Upload className={className} />;
export const TvIcon = ({ className }: { className?: string }) => <Tv className={className} />;
export const GameIcon = ({ className }: { className?: string }) => <Gamepad2 className={className} />;
export const TechIcon = ({ className }: { className?: string }) => <Cpu className={className} />;
export const MusicIcon = ({ className }: { className?: string }) => <Music className={className} />;
export const HomeIcon = ({ className }: { className?: string }) => <Home className={className} />;
export const PlayIcon = ({ className }: { className?: string }) => <PlayCircle className={className} />;
export const MessageIcon = ({ className }: { className?: string }) => <MessageSquare className={className} />;
export const LikeIcon = ({ className }: { className?: string }) => <ThumbsUp className={className} />;
export const ShareIcon = ({ className }: { className?: string }) => <Share2 className={className} />;
export const MoreIcon = ({ className }: { className?: string }) => <MoreHorizontal className={className} />;
export const SparklesIcon = ({ className }: { className?: string }) => <Sparkles className={className} />;
export const MenuIcon = ({ className }: { className?: string }) => <Menu className={className} />;
export const CloseIcon = ({ className }: { className?: string }) => <X className={className} />;
