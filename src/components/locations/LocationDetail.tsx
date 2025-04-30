'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

// This would typically come from a database
const mockNearbyLocations = [
  {
    id: '2',
    name: 'Needles Rock Formation',
    image: 'https://images.unsplash.com/photo-1566409358502-1fe56a505a43',
    category: 'landscapes'
  },
  {
    id: '3',
    name: 'Tabarka Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    category: 'beaches'
  },
  {
    id: '7',
    name: 'Tabarka Marina',
    image: 'https://images.unsplash.com/photo-1565369728672-f490366173ba',
    category: 'food'
  }
];

// Types for the location data
export type Location = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  latitude: number;
  longitude: number;
  features?: string[];
  openingHours?: {
    days: string;
    hours: string;
  }[];
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  images?: string[];
};

type LocationDetailProps = {
  location: Location;
};

const LocationDetail = ({ location }: LocationDetailProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const defaultImages = [
    location.image,
    'https://images.unsplash.com/photo-1566409358502-1fe56a505a43',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    'https://images.unsplash.com/photo-1546026423-cc4642628d2b'
  ];
  
  const images = location.images || defaultImages;
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleImageChange = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-600 hover:text-tabarka-blue-600 inline-flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link href="/locations" className="ml-1 text-gray-600 hover:text-tabarka-blue-600 md:ml-2">Locations</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2 font-medium">{location.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-[21/9] relative">
              <Image
                src={images[activeImageIndex]}
                alt={location.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{location.name}</h1>
                  <div className="mt-2 flex items-center">
                    <div className="bg-tabarka-blue-500 text-white text-sm px-3 py-1 rounded-full">
                      {location.category.charAt(0).toUpperCase() + location.category.slice(1)}
                    </div>
                    <div className="bg-white/90 ml-3 px-3 py-1 rounded-full text-sm font-semibold text-tabarka-blue-700 flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-500 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      {location.rating} / 5
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex space-x-2">
                  <button 
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm p-2 rounded-full transition-colors"
                    aria-label="Share"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                  </button>
                  <button 
                    className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm p-2 rounded-full transition-colors"
                    aria-label="Save"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="px-6 py-4 bg-gray-50 border-y border-gray-100">
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleImageChange(index)}
                  className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                    activeImageIndex === index ? 'border-tabarka-blue-500' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${location.name} image ${index + 1}`}
                    fill
                    sizes="5vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex px-6" aria-label="Tabs">
              <button
                onClick={() => handleTabChange('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-tabarka-blue-500 text-tabarka-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap`}
              >
                Overview
              </button>
              <button
                onClick={() => handleTabChange('map')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ml-8 ${
                  activeTab === 'map'
                    ? 'border-tabarka-blue-500 text-tabarka-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap`}
              >
                Map
              </button>
              <button
                onClick={() => handleTabChange('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ml-8 ${
                  activeTab === 'reviews'
                    ? 'border-tabarka-blue-500 text-tabarka-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap`}
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this location</h2>
                    <p className="text-gray-700">{location.description}</p>
                    
                    {location.features && location.features.length > 0 && (
                      <>
                        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Features</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {location.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="w-5 h-5 text-tabarka-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Nearby Locations</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {mockNearbyLocations.map((nearbyLocation) => (
                        <Link 
                          href={`/locations/${nearbyLocation.id}`} 
                          key={nearbyLocation.id}
                          className="group"
                        >
                          <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-32">
                              <Image
                                src={nearbyLocation.image}
                                alt={nearbyLocation.name}
                                fill
                                sizes="(max-width: 640px) 100vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-gray-900 group-hover:text-tabarka-blue-600 transition-colors">{nearbyLocation.name}</h4>
                              <p className="text-sm text-gray-500">{nearbyLocation.category.charAt(0).toUpperCase() + nearbyLocation.category.slice(1)}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Information</h3>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Location</h4>
                    <div className="flex items-start mb-4">
                      <svg className="w-5 h-5 text-tabarka-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <p className="text-gray-700">
                        {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                        <br />
                        <span className="text-sm text-tabarka-blue-600 cursor-pointer hover:underline">View on map</span>
                      </p>
                    </div>
                    
                    {location.openingHours && location.openingHours.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Opening Hours</h4>
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-tabarka-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <div>
                            {location.openingHours.map((item, index) => (
                              <div key={index} className="mb-1 last:mb-0">
                                <span className="font-medium">{item.days}:</span> {item.hours}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {location.contactInfo && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Contact</h4>
                        {location.contactInfo.phone && (
                          <div className="flex items-start mb-3">
                            <svg className="w-5 h-5 text-tabarka-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <p className="text-gray-700">{location.contactInfo.phone}</p>
                          </div>
                        )}
                        
                        {location.contactInfo.email && (
                          <div className="flex items-start mb-3">
                            <svg className="w-5 h-5 text-tabarka-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <p className="text-gray-700">{location.contactInfo.email}</p>
                          </div>
                        )}
                        
                        {location.contactInfo.website && (
                          <div className="flex items-start mb-3">
                            <svg className="w-5 h-5 text-tabarka-blue-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <a href={location.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-tabarka-blue-600 hover:underline">
                              {location.contactInfo.website.replace(/^https?:\/\//, '')}
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8">
                    <button className="w-full bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      Add to Itinerary
                    </button>
                    <div className="flex mt-3">
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors mr-2">
                        Share
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'map' && (
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                  </svg>
                  <p className="mt-4 text-gray-600">Interactive map will be displayed here.<br />Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</p>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Review System Coming Soon</h3>
                <p className="mt-2 text-gray-600">We're working on a review system to help you share your experiences.</p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-tabarka-blue-50 rounded-xl p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-tabarka-blue-800 mb-4">Plan Your Visit to Tabarka</h2>
          <p className="text-tabarka-blue-600 max-w-2xl mx-auto mb-6">
            Discover more amazing locations and create your perfect itinerary for an unforgettable experience in Tabarka.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/locations" className="bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Explore More Locations
            </Link>
            <Link href="/submit" className="bg-white hover:bg-gray-50 text-tabarka-blue-600 border border-tabarka-blue-200 font-medium py-3 px-6 rounded-lg transition-colors">
              Share Your Experience
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LocationDetail; 