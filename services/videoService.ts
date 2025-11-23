import { Video, Comment, Category } from '../types';

// Toggle this to true when your Spring Boot backend is running
const USE_REAL_API = false;
const API_BASE_URL = 'http://localhost:8080/api/v1';

// Mock Data Generators (Moved from components)
const generateMockVideos = (count: number, category?: string): Video[] => {
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
    category: category || 'Recommended',
    avatar: `https://picsum.photos/seed/user_${i}/100`
  }));
};

const generateMockComments = (count: number): Comment[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `c${i}`,
    user: `User_${i * 99}`,
    avatar: `https://picsum.photos/seed/comment${i}/50`,
    content: "Great video! Really helped me understand the concepts better.",
    likes: Math.floor(Math.random() * 100),
    date: `2024-05-${10 + i}`
  }));
};

export const videoService = {
  // Get list of videos (Home Page)
  getVideos: async (category: Category): Promise<Video[]> => {
    if (USE_REAL_API) {
      try {
        const response = await fetch(`${API_BASE_URL}/videos?category=${category}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
      } catch (error) {
        console.error("API Error, falling back to mock:", error);
      }
    }
    
    // Mock simulation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateMockVideos(20, category);
  },

  // Get single video details (Watch Page)
  getVideoById: async (id: string): Promise<Video | null> => {
    if (USE_REAL_API) {
      try {
        const response = await fetch(`${API_BASE_URL}/videos/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
      } catch (error) {
        console.error("API Error, falling back to mock:", error);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      id: id,
      title: "Building a Modern Frontend with React & Tailwind CSS",
      thumbnail: `https://picsum.photos/seed/${id}/1280/720`,
      author: "TechGuru_Official",
      views: "234.5k",
      date: "3 days ago",
      duration: "15:42",
      category: "Tech",
      avatar: "https://picsum.photos/seed/techguru/100"
    };
  },

  // Get related/recommended videos (Watch Page Sidebar)
  getRelatedVideos: async (id: string): Promise<Video[]> => {
    if (USE_REAL_API) {
      try {
        const response = await fetch(`${API_BASE_URL}/videos/${id}/related`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
      } catch (error) {
        console.error("API Error, falling back to mock:", error);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    return generateMockVideos(8);
  },

  // Get comments for a video
  getComments: async (id: string): Promise<Comment[]> => {
    if (USE_REAL_API) {
      try {
        const response = await fetch(`${API_BASE_URL}/videos/${id}/comments`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
      } catch (error) {
        console.error("API Error, falling back to mock:", error);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    return generateMockComments(5);
  }
};