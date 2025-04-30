'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type PostCardProps = {
  id: string;
  title: string;
  excerpt: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'text';
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  category: string;
  locationName?: string;
};

const PostCard = ({
  id,
  title,
  excerpt,
  mediaUrl,
  mediaType,
  authorName,
  authorAvatar,
  createdAt,
  category,
  locationName,
}: PostCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <motion.div
      className="rounded-2xl overflow-hidden shadow-lg bg-white h-full"
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Section */}
      <div className="relative h-64 overflow-hidden">
        {mediaType === 'image' && (
          <>
            <Image
              src={mediaUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </>
        )}

        {mediaType === 'video' && (
          <>
            <video
              src={mediaUrl}
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
              autoPlay={isHovered}
              loop
              muted
              playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className={`bg-tabarka-blue-500/80 rounded-full p-3 text-white transform transition-all duration-300 ${
                  isHovered ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
                aria-label="Play video"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </>
        )}

        {mediaType === 'text' && (
          <div className={`h-full w-full flex items-center justify-center bg-gradient-to-br from-tabarka-blue-600 to-tabarka-blue-800 p-6 transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
            <span className="text-white text-2xl font-bold text-center italic">"{excerpt.substring(0, 100)}..."</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-tabarka-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        {locationName && (
          <div className="absolute bottom-4 left-4 z-10 flex items-center text-white">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
            <span className="text-sm">{locationName}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <Link href={`/posts/${id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-tabarka-blue-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {excerpt}
        </p>
        
        {/* Author and Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-tabarka-blue-100 mr-2">
              {authorAvatar ? (
                <Image 
                  src={authorAvatar} 
                  alt={authorName} 
                  width={32} 
                  height={32} 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-tabarka-blue-500 text-white font-semibold">
                  {authorName.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-sm text-gray-600">{authorName}</span>
          </div>
          <span className="text-xs text-gray-500">{formatDate(createdAt)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard; 