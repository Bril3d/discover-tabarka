'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from './data';

// Available blog categories
const categories = [
  { id: 'all', name: 'All Topics' },
  { id: 'ancient-history', name: 'Ancient History' },
  { id: 'colonial-history', name: 'Colonial History' },
  { id: 'cultural-history', name: 'Cultural History' },
  { id: 'archaeology', name: 'Archaeology' },
  { id: 'maritime-history', name: 'Maritime History' }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Filter posts based on category and search query
  useEffect(() => {
    let filtered = blogPosts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name || '';
      filtered = filtered.filter(post => post.category.toLowerCase() === categoryName.toLowerCase());
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        post => 
          post.title.toLowerCase().includes(query) || 
          post.excerpt.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery]);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Historical <span className="text-tabarka-blue-600 dark:text-tabarka-blue-400">Stories</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dive into Tabarka's rich history through stories that span centuries, from ancient Phoenician settlements to modern cultural revolutions.
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-80 lg:h-auto">
                <Image
                  src={blogPosts[0].coverImage}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-tabarka-blue-100 dark:bg-tabarka-blue-900/40 text-tabarka-blue-800 dark:text-tabarka-blue-300">
                    {blogPosts[0].category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={blogPosts[0].author.avatar}
                        alt={blogPosts[0].author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {blogPosts[0].author.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(blogPosts[0].publishedAt)} · {blogPosts[0].readTime} min read
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${blogPosts[0].id}`}
                    className="inline-flex items-center text-tabarka-blue-600 dark:text-tabarka-blue-400 font-medium hover:text-tabarka-blue-800 dark:hover:text-tabarka-blue-300 transition-colors"
                  >
                    Read more
                    <svg className="ml-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500 transition duration-150 ease-in-out"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-tabarka-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow group">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 right-3 z-10">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-white/90 dark:bg-black/70 text-tabarka-blue-800 dark:text-tabarka-blue-300 rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-tabarka-blue-600 dark:group-hover:text-tabarka-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(post.publishedAt)}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {post.readTime} min read
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-1">No stories found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center p-8 bg-tabarka-blue-50 dark:bg-tabarka-blue-900/20 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Have a Tabarka Story to Share?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Are you a historian, archaeologist, or simply someone with knowledge about Tabarka's past? Share your historical insights and stories with our community.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white font-medium transition-colors"
          >
            Submit Your Story
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 