'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation } from 'framer-motion';

type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  description: string;
  image: string;
  period: 'ancient' | 'medieval' | 'colonial' | 'modern';
};

// Sample timeline data
const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    year: '1100 BCE',
    title: 'Phoenician Settlement',
    description: 'Phoenician traders established a settlement at what is now Tabarka, using it as a trading post for the purple dye from murex shells found in local waters.',
    image: 'https://images.unsplash.com/photo-1610631087218-f8a464f0125a',
    period: 'ancient'
  },
  {
    id: '2',
    year: '146 BCE',
    title: 'Roman Conquest',
    description: 'After the fall of Carthage, Tabarka became part of the Roman province of Africa Proconsularis. Romans developed the area, building infrastructure including baths and temples.',
    image: 'https://images.unsplash.com/photo-1555993539-1732b0258235',
    period: 'ancient'
  },
  {
    id: '3',
    year: '435 CE',
    title: 'Vandal Occupation',
    description: 'The Vandals, a Germanic tribe, conquered North Africa including Tabarka, ending Roman rule in the region.',
    image: 'https://images.unsplash.com/photo-1581509732883-14d6eee288d8',
    period: 'medieval'
  },
  {
    id: '4',
    title: '534 CE',
    year: 'Byzantine Control',
    description: 'The Byzantine Empire under Justinian I reconquered North Africa from the Vandals, bringing Tabarka under Byzantine rule.',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b',
    period: 'medieval'
  },
  {
    id: '5',
    year: '698 CE',
    title: 'Arab Conquest',
    description: 'Arab forces defeated the Byzantines and brought Islamic rule to North Africa, including Tabarka, which would later become part of various Islamic dynasties.',
    image: 'https://images.unsplash.com/photo-1559066653-edfd1e6bbbd5',
    period: 'medieval'
  },
  {
    id: '6',
    year: '1540s',
    title: 'Genoese Control',
    description: 'The Republic of Genoa gained control of Tabarka and built the iconic fortress to protect their coral fishing operations in the area.',
    image: 'https://images.unsplash.com/photo-1552406612-3bfff359cd4e',
    period: 'colonial'
  },
  {
    id: '7',
    year: '1741',
    title: 'Ottoman Takeover',
    description: 'The Ottoman Empire seized Tabarka from the Genoese, incorporating it into their regency of Tunis.',
    image: 'https://images.unsplash.com/photo-1570568165178-7252854586d9',
    period: 'colonial'
  },
  {
    id: '8',
    year: '1881',
    title: 'French Protectorate',
    description: 'Tabarka, along with the rest of Tunisia, became a French protectorate, beginning an era of European colonization that would last until independence.',
    image: 'https://images.unsplash.com/photo-1590077428713-a6a400640c3b',
    period: 'colonial'
  },
  {
    id: '9',
    year: '1956',
    title: 'Tunisian Independence',
    description: 'Tunisia gained independence from France, and Tabarka became part of the modern Tunisian state.',
    image: 'https://images.unsplash.com/photo-1516175355345-817ee5f323c0',
    period: 'modern'
  },
  {
    id: '10',
    year: '1973',
    title: 'Tabarka Jazz Festival Founded',
    description: 'The first Tabarka Jazz Festival was held, establishing what would become one of Tunisia\'s most significant cultural events and putting Tabarka on the international cultural map.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    period: 'modern'
  },
  {
    id: '11',
    year: '2000s',
    title: 'Tourism Development',
    description: 'Tabarka saw significant development as a tourist destination, with new hotels, diving centers, and golf courses being built to attract international visitors.',
    image: 'https://images.unsplash.com/photo-1566409358502-1fe56a505a43',
    period: 'modern'
  }
];

const TimelineComponent = () => {
  const [activeEventId, setActiveEventId] = useState<string>(timelineEvents[0].id);
  const [activePeriod, setActivePeriod] = useState<string>('all');
  const timelineRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(timelineRef, { once: false, amount: 0.2 });
  
  // Filter timeline events based on selected period
  const filteredEvents = activePeriod === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.period === activePeriod);

  const periods = [
    { id: 'all', name: 'All Periods' },
    { id: 'ancient', name: 'Ancient Times' },
    { id: 'medieval', name: 'Medieval Era' },
    { id: 'colonial', name: 'Colonial Period' },
    { id: 'modern', name: 'Modern Tabarka' }
  ];

  // Get the currently active event object
  const activeEvent = timelineEvents.find(event => event.id === activeEventId) || timelineEvents[0];

  // Animate the timeline when it comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Scroll active event into view in the timeline
  useEffect(() => {
    const activeElement = document.getElementById(`timeline-event-${activeEventId}`);
    if (activeElement && timelineRef.current) {
      const containerWidth = timelineRef.current.offsetWidth;
      const elementOffset = activeElement.offsetLeft;
      const elementWidth = activeElement.offsetWidth;
      
      // Center the element in the timeline
      timelineRef.current.scrollLeft = elementOffset - (containerWidth / 2) + (elementWidth / 2);
    }
  }, [activeEventId, filteredEvents]);

  const handleEventClick = (eventId: string) => {
    setActiveEventId(eventId);
  };

  const handlePeriodChange = (periodId: string) => {
    setActivePeriod(periodId);
    
    // Reset to the first event of the newly selected period
    if (periodId === 'all') {
      setActiveEventId(timelineEvents[0].id);
    } else {
      const firstEventOfPeriod = timelineEvents.find(event => event.period === periodId);
      if (firstEventOfPeriod) {
        setActiveEventId(firstEventOfPeriod.id);
      }
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
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
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      {/* Period Filters */}
      <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => handlePeriodChange(period.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activePeriod === period.id
                  ? 'bg-tabarka-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Timeline Track */}
      <div 
        ref={timelineRef}
        className="relative p-4 overflow-x-auto scrollbar-hide"
      >
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-tabarka-blue-200 dark:bg-tabarka-blue-900 transform -translate-y-1/2"></div>
        
        <div className="flex space-x-6 md:space-x-10 py-6 min-w-max">
          {filteredEvents.map((event, index) => (
            <motion.div
              id={`timeline-event-${event.id}`}
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative flex flex-col items-center cursor-pointer group ${
                index % 2 === 0 ? 'pt-8 pb-2' : 'pt-2 pb-8'
              }`}
              onClick={() => handleEventClick(event.id)}
            >
              {/* Timeline point */}
              <div
                className={`w-5 h-5 rounded-full z-10 transition-all duration-300 ${
                  activeEventId === event.id
                    ? 'bg-tabarka-blue-600 scale-125'
                    : 'bg-tabarka-blue-400 group-hover:bg-tabarka-blue-500'
                }`}
              ></div>
              
              {/* Year label */}
              <div
                className={`absolute ${
                  index % 2 === 0 ? 'bottom-full mb-2' : 'top-full mt-2'
                } text-center`}
              >
                <div
                  className={`text-sm font-bold ${
                    activeEventId === event.id
                      ? 'text-tabarka-blue-600 dark:text-tabarka-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {event.year}
                </div>
                <div
                  className={`text-xs transition-all duration-300 ${
                    activeEventId === event.id
                      ? 'font-medium text-gray-800 dark:text-gray-200'
                      : 'font-normal text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`}
                >
                  {event.title}
                </div>
              </div>
              
              {/* Vertical line */}
              <div
                className={`absolute w-0.5 ${index % 2 === 0 ? 'h-8 top-0' : 'h-8 bottom-0'} ${
                  activeEventId === event.id ? 'bg-tabarka-blue-600' : 'bg-tabarka-blue-200 dark:bg-tabarka-blue-900'
                }`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Feature Event Display */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-4 md:p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Text content */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <span className="text-sm font-semibold text-tabarka-blue-600 dark:text-tabarka-blue-400 mb-2">
              {activeEvent.year}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {activeEvent.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {activeEvent.description}
            </p>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full capitalize bg-tabarka-blue-100 text-tabarka-blue-800 dark:bg-tabarka-blue-900 dark:text-tabarka-blue-100">
                {activeEvent.period.replace('-', ' ')}
              </span>
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="relative h-60 md:h-80 overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={activeEvent.image}
              alt={activeEvent.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          </motion.div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => {
              const currentIndex = filteredEvents.findIndex(e => e.id === activeEventId);
              if (currentIndex > 0) {
                setActiveEventId(filteredEvents[currentIndex - 1].id);
              }
            }}
            disabled={filteredEvents.findIndex(e => e.id === activeEventId) === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              filteredEvents.findIndex(e => e.id === activeEventId) === 0
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>
          
          <button
            onClick={() => {
              const currentIndex = filteredEvents.findIndex(e => e.id === activeEventId);
              if (currentIndex < filteredEvents.length - 1) {
                setActiveEventId(filteredEvents[currentIndex + 1].id);
              }
            }}
            disabled={filteredEvents.findIndex(e => e.id === activeEventId) === filteredEvents.length - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              filteredEvents.findIndex(e => e.id === activeEventId) === filteredEvents.length - 1
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineComponent; 