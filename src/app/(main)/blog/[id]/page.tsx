'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { contentService } from '@/lib/services/contentService';

// Convert database post to blog post format
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  readTime: number;
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the post from Supabase based on the ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the current post
        const postData = await contentService.getContentById(id as string);
        
        if (!postData) {
          setError('Post not found');
          setIsLoading(false);
          return;
        }
        
        // Calculate read time based on content length (approx 200 words per minute)
        const wordCount = postData.content ? postData.content.split(/\s+/).length : 0;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));
        
        // Format the post for display
        const formattedPost: BlogPost = {
          id: postData.id,
          title: postData.title,
          excerpt: postData.excerpt || 'Read more about this interesting topic...',
          content: postData.content || '',
          coverImage: postData.media_url || 'https://images.unsplash.com/photo-1617624085810-3df2165bd11b',
          publishedAt: postData.published_at || postData.created_at,
          author: {
            name: postData.users?.full_name || 'Anonymous Author',
            avatar: postData.users?.avatar_url || 'https://randomuser.me/api/portraits/people/1.jpg'
          },
          category: postData.categories?.name || 'Uncategorized',
          readTime: readTime
        };
        
        setPost(formattedPost);
        
        // Fetch related posts (same category)
        const { content } = await contentService.getContent(1, 3, {
          type: 'post',
          status: 'published',
          category: postData.category_id
        });
        
        // Filter out the current post and format related posts
        const formattedRelatedPosts = content
          .filter((relatedPost: any) => relatedPost.id !== id)
          .slice(0, 3)
          .map((relatedPost: any) => {
            const relatedReadTime = relatedPost.content ? 
              Math.max(1, Math.ceil(relatedPost.content.split(/\s+/).length / 200)) : 
              3;
              
            return {
              id: relatedPost.id,
              title: relatedPost.title,
              excerpt: relatedPost.excerpt || 'Read more about this interesting topic...',
              content: relatedPost.content || '',
              coverImage: relatedPost.media_url || 'https://images.unsplash.com/photo-1617624085810-3df2165bd11b',
              publishedAt: relatedPost.published_at || relatedPost.created_at,
              author: {
                name: relatedPost.users?.full_name || 'Anonymous Author',
                avatar: relatedPost.users?.avatar_url || 'https://randomuser.me/api/portraits/people/1.jpg'
              },
              category: relatedPost.categories?.name || 'Uncategorized',
              readTime: relatedReadTime
            };
          });
        
        setRelatedPosts(formattedRelatedPosts);
        
        // Increment view count for analytics
        if (postData.id) {
          contentService.incrementViews(postData.id);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchPost();
    }
  }, [id]);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 w-3/4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md mb-10 w-1/2"></div>
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {error || "The blog post you're looking for doesn't exist or has been removed."}
          </p>
          <Link 
            href="/blog"
            className="px-6 py-3 bg-tabarka-blue-600 text-white rounded-lg hover:bg-tabarka-blue-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-tabarka-blue-100 dark:bg-tabarka-blue-900/40 text-tabarka-blue-800 dark:text-tabarka-blue-300">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(post.publishedAt)} · {post.readTime} min read
              </p>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-80 md:h-96 rounded-xl overflow-hidden mb-10"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-16"
        >
          <div className="flex items-center">
            <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{post.author.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Expert on {post.category} with a passion for uncovering and sharing Tabarka's rich cultural heritage.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="block group">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 250px"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-tabarka-blue-600 dark:group-hover:text-tabarka-blue-400 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(relatedPost.publishedAt)} · {relatedPost.readTime} min read
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <Link 
            href="/blog"
            className="inline-flex items-center text-tabarka-blue-600 dark:text-tabarka-blue-400 font-medium hover:text-tabarka-blue-800 dark:hover:text-tabarka-blue-300 transition-colors"
          >
            <svg className="mr-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to All Stories
          </Link>
        </motion.div>
      </div>
    </article>
  );
} 