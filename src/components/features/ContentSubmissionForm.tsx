'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Mock categories and locations - would come from Supabase in production
const categories = [
  { id: '1', name: 'Beaches' },
  { id: '2', name: 'Diving' },
  { id: '3', name: 'Historical Sites' },
  { id: '4', name: 'Food & Cuisine' },
  { id: '5', name: 'Culture' },
  { id: '6', name: 'Nature' },
  { id: '7', name: 'Activities' },
];

const locations = [
  { id: '1', name: 'Tabarka Marina' },
  { id: '2', name: 'Coral Reef Bay' },
  { id: '3', name: 'The Needles Rock Formation' },
  { id: '4', name: 'Fort Tabarka' },
  { id: '5', name: 'Tabarka Beach' },
  { id: '6', name: 'Old Town Square' },
  { id: '7', name: 'Feija National Park' },
];

type SubmissionFormProps = {
  onSuccess?: () => void;
};

const ContentSubmissionForm = ({ onSuccess }: SubmissionFormProps) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'text'>('image');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Basic validation for file type
    if (mediaType === 'image' && !selectedFile.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, etc.)');
      return;
    }
    
    if (mediaType === 'video' && !selectedFile.type.startsWith('video/')) {
      setError('Please select a video file (MP4, MOV, etc.)');
      return;
    }
    
    // Basic validation for file size
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size exceeds 10MB. Please select a smaller file.');
      return;
    }

    setFile(selectedFile);
    
    // Create preview for images
    if (mediaType === 'image') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to submit content.');
      return;
    }
    
    if (mediaType !== 'text' && !file) {
      setError('Please select a file to upload.');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      let mediaUrl = null;
      
      // Upload file to Supabase Storage if media type is image or video
      if (mediaType !== 'text' && file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `${mediaType}s/${fileName}`;
        
        const { data, error: uploadError } = await supabase.storage
          .from('content')
          .upload(filePath, file);
          
        if (uploadError) {
          throw new Error(uploadError.message);
        }
        
        // Get public URL for the uploaded file
        const { data: urlData } = supabase.storage
          .from('content')
          .getPublicUrl(filePath);
          
        mediaUrl = urlData.publicUrl;
      }
      
      // Insert record in posts table
      const { error: insertError } = await supabase.from('posts').insert([
        {
          title,
          content,
          user_id: user.id,
          category_id: categoryId,
          location_id: locationId || null,
          media_url: mediaUrl,
          media_type: mediaType,
          is_featured: false,
          is_approved: false, // Needs admin approval
        },
      ]);
      
      if (insertError) {
        throw new Error(insertError.message);
      }
      
      // Reset form on success
      setTitle('');
      setContent('');
      setCategoryId('');
      setLocationId('');
      setFile(null);
      setFilePreview(null);
      setSuccess(true);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (err) {
      console.error('Error submitting content:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleMediaTypeChange = (type: 'image' | 'video' | 'text') => {
    setMediaType(type);
    setFile(null);
    setFilePreview(null);
    
    // Reset file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Share Your Tabarka Experience</h2>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700"
          >
            {error}
          </motion.div>
        )}
        
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700"
          >
            Your content was submitted successfully! It will be visible after approval by our moderators.
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Media Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Type of Content</label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleMediaTypeChange('image')}
                className={`px-4 py-2 rounded-lg border ${
                  mediaType === 'image'
                    ? 'bg-tabarka-blue-500 text-white border-tabarka-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Photo
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => handleMediaTypeChange('video')}
                className={`px-4 py-2 rounded-lg border ${
                  mediaType === 'video'
                    ? 'bg-tabarka-blue-500 text-white border-tabarka-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  Video
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => handleMediaTypeChange('text')}
                className={`px-4 py-2 rounded-lg border ${
                  mediaType === 'text'
                    ? 'bg-tabarka-blue-500 text-white border-tabarka-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Story
                </span>
              </button>
            </div>
          </div>
          
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500"
              placeholder="Give your experience a title"
            />
          </div>
          
          {/* Description / Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              {mediaType === 'text' ? 'Story' : 'Description'}
            </label>
            <textarea
              id="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={mediaType === 'text' ? 8 : 4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500"
              placeholder={mediaType === 'text' ? 'Share your story about Tabarka...' : 'Describe what you are sharing...'}
            />
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location (optional)
            </label>
            <select
              id="location"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500"
            >
              <option value="">Select a location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* File Upload - only for image and video */}
          {mediaType !== 'text' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {mediaType === 'image' ? 'Upload Photo' : 'Upload Video'}
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {!filePreview ? (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-tabarka-blue-600 hover:text-tabarka-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            ref={fileInputRef}
                            accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {mediaType === 'image' ? 'PNG, JPG, GIF up to 10MB' : 'MP4, MOV up to 10MB'}
                      </p>
                    </>
                  ) : (
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-lg h-48 w-full">
                        <Image
                          src={filePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setFilePreview(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-tabarka-blue-600 hover:bg-tabarka-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tabarka-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Your Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentSubmissionForm; 