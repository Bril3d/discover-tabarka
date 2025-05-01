'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';

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

// Color scheme mapping for periods
const periodColorMap = {
  ancient: {
    light: 'bg-amber-100 text-amber-800',
    dark: 'dark:bg-amber-900/30 dark:text-amber-300',
    accent: 'bg-amber-600',
    lightAccent: 'bg-amber-400',
    text: 'text-amber-600',
    darkText: 'dark:text-amber-400',
  },
  medieval: {
    light: 'bg-emerald-100 text-emerald-800',
    dark: 'dark:bg-emerald-900/30 dark:text-emerald-300',
    accent: 'bg-emerald-600',
    lightAccent: 'bg-emerald-400',
    text: 'text-emerald-600',
    darkText: 'dark:text-emerald-400',
  },
  colonial: {
    light: 'bg-sky-100 text-sky-800',
    dark: 'dark:bg-sky-900/30 dark:text-sky-300',
    accent: 'bg-sky-600',
    lightAccent: 'bg-sky-400',
    text: 'text-sky-600',
    darkText: 'dark:text-sky-400',
  },
  modern: {
    light: 'bg-purple-100 text-purple-800',
    dark: 'dark:bg-purple-900/30 dark:text-purple-300',
    accent: 'bg-purple-600',
    lightAccent: 'bg-purple-400',
    text: 'text-purple-600',
    darkText: 'dark:text-purple-400',
  },
};

const TimelineComponent = () => {
  const [activeEventId, setActiveEventId] = useState<string>(timelineEvents[0].id);
  const [activePeriod, setActivePeriod] = useState<string>('all');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const contentControls = useAnimation();
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
      contentControls.start('visible');
    }
  }, [contentControls, isInView]);

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
    if (eventId !== activeEventId) {
      setIsNavigating(true);
      setTimeout(() => {
        setActiveEventId(eventId);
        setTimeout(() => {
          setIsNavigating(false);
        }, 300);
      }, 300);
    }
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

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = filteredEvents.findIndex(event => event.id === activeEventId);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredEvents.length - 1;
    } else {
      newIndex = currentIndex < filteredEvents.length - 1 ? currentIndex + 1 : 0;
    }
    
    handleEventClick(filteredEvents[newIndex].id);
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

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Get color scheme for active event
  const getColorScheme = (period: string) => {
    return periodColorMap[period as keyof typeof periodColorMap] || {
      light: 'bg-primary-100 text-primary-800',
      dark: 'dark:bg-primary-900/30 dark:text-primary-300',
      accent: 'bg-primary',
      lightAccent: 'bg-primary/60',
      text: 'text-primary',
      darkText: 'dark:text-primary/80',
    };
  };

  const activeColorScheme = getColorScheme(activeEvent.period);

  return (
    <div className="w-full bg-card dark:bg-card rounded-xl shadow-md overflow-hidden">
      {/* Period Filters */}
      <div className="p-4 md:p-6 bg-muted dark:bg-muted border-b border-border">
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => handlePeriodChange(period.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activePeriod === period.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background dark:bg-background/80 text-foreground hover:bg-background/80 dark:hover:bg-background/60'
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
        className="relative p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
      >
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-primary/20 transform -translate-y-1/2"></div>
        
        <div className="flex space-x-6 md:space-x-10 py-6 min-w-max">
          {filteredEvents.map((event, index) => {
            const colorScheme = getColorScheme(event.period);
            
            return (
              <motion.div
                id={`timeline-event-${event.id}`}
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`relative flex flex-col items-center cursor-pointer group ${
                  index % 2 === 0 ? 'pt-8 pb-2' : 'pt-2 pb-8'
                }`}
                onClick={() => handleEventClick(event.id)}
              >
                {/* Timeline point */}
                <div className="relative">
                  <div
                    className={`w-5 h-5 rounded-full z-10 transition-all duration-300 ${
                      activeEventId === event.id
                        ? colorScheme.accent
                        : colorScheme.lightAccent
                    }`}
                  ></div>
                  
                  {/* Pulse effect for active point */}
                  {activeEventId === event.id && (
                    <div className="absolute inset-0 -m-1 rounded-full animate-ping bg-primary/30"></div>
                  )}
                </div>
                
                {/* Year label */}
                <div
                  className={`absolute ${
                    index % 2 === 0 ? 'bottom-full mb-2' : 'top-full mt-2'
                  } text-center`}
                >
                  <div
                    className={`text-sm font-bold transition-colors duration-300 ${
                      activeEventId === event.id
                        ? colorScheme.text + ' ' + colorScheme.darkText
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`}
                  >
                    {event.year}
                  </div>
                  <div
                    className={`text-xs transition-all duration-300 max-w-[120px] ${
                      activeEventId === event.id
                        ? 'font-medium text-foreground'
                        : 'font-normal text-muted-foreground group-hover:text-foreground'
                    }`}
                  >
                    {event.title}
                  </div>
                </div>
                
                {/* Vertical line */}
                <div
                  className={`absolute w-0.5 ${index % 2 === 0 ? 'h-8 top-0' : 'h-8 bottom-0'} ${
                    activeEventId === event.id 
                      ? colorScheme.accent
                      : 'bg-primary/20'
                  }`}
                ></div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Feature Event Display */}
      <motion.div
        initial="hidden"
        animate={contentControls}
        variants={containerVariants}
        className="p-4 md:p-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEventId}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {/* Text content */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center order-2 md:order-1">
              <span className={`text-sm font-semibold inline-block px-3 py-1 rounded-full mb-4 ${activeColorScheme.light} ${activeColorScheme.dark}`}>
                {activeEvent.year} • {activeEvent.period.charAt(0).toUpperCase() + activeEvent.period.slice(1)} Period
              </span>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {activeEvent.title}
              </h3>
              <p className="text-muted-foreground">
                {activeEvent.description}
              </p>
            </motion.div>
            
            {/* Image */}
            <motion.div
              variants={itemVariants}
              className="relative h-60 md:h-80 overflow-hidden rounded-lg shadow-md order-1 md:order-2"
            >
              <Image
                src={activeEvent.image}
                alt={activeEvent.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => handleNavigation('prev')}
            disabled={isNavigating}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            aria-label="Previous event"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground">
            {filteredEvents.findIndex(e => e.id === activeEventId) + 1} of {filteredEvents.length}
          </div>
          
          <button
            onClick={() => handleNavigation('next')}
            disabled={isNavigating}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            aria-label="Next event"
          >
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