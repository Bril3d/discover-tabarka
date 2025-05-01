import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
    AnimatedCard,
    AnimatedCardContent,
    AnimatedCardDescription,
    AnimatedCardFooter,
    AnimatedCardHeader,
    AnimatedCardTitle
} from "@/components/ui/animated-card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { fadeIn, slideInLeft, slideInRight, slideUp, staggerContainer } from "@/lib/animations";

const AnimatedComponentsDemo = () => {
  return (
    <div className="container mx-auto px-4 py-24 space-y-24">
      <AnimatedSection className="text-center space-y-6">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold tracking-tight"
          variants={fadeIn}
        >
          Discover Tabarka
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          variants={slideUp}
        >
          Explore Tunisia's breathtaking coastal paradise with modern UI animations.
        </motion.p>
        <motion.div className="flex flex-wrap gap-4 justify-center" variants={slideUp}>
          <AnimatedButton size="lg">Explore Destinations</AnimatedButton>
          <AnimatedButton 
            variant="outline" 
            size="lg"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Learn More
          </AnimatedButton>
        </motion.div>
      </AnimatedSection>

      <AnimatedSection 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
      >
        <AnimatedCard
          initial="hidden"
          animate="visible"
          variants={slideInLeft}
        >
          <AnimatedCardHeader>
            <AnimatedCardTitle>Beautiful Beaches</AnimatedCardTitle>
            <AnimatedCardDescription>
              Discover pristine shorelines and crystal-clear Mediterranean waters.
            </AnimatedCardDescription>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <p>
              Tabarka offers some of the most stunning beaches in Tunisia, with golden sands
              and clear waters perfect for swimming, snorkeling, and sunbathing.
            </p>
          </AnimatedCardContent>
          <AnimatedCardFooter>
            <AnimatedButton variant="secondary" size="sm">
              View Beaches
            </AnimatedButton>
          </AnimatedCardFooter>
        </AnimatedCard>

        <AnimatedCard
          initial="hidden"
          animate="visible"
          variants={slideUp}
          transition={{ delay: 0.1 }}
        >
          <AnimatedCardHeader>
            <AnimatedCardTitle>Coral Reefs</AnimatedCardTitle>
            <AnimatedCardDescription>
              Explore vibrant underwater ecosystems teeming with marine life.
            </AnimatedCardDescription>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <p>
              Known for its rich coral reefs, Tabarka is a paradise for diving enthusiasts.
              Experience the colorful underwater world with guided diving tours.
            </p>
          </AnimatedCardContent>
          <AnimatedCardFooter>
            <AnimatedButton variant="secondary" size="sm">
              Discover Diving
            </AnimatedButton>
          </AnimatedCardFooter>
        </AnimatedCard>

        <AnimatedCard
          initial="hidden"
          animate="visible"
          variants={slideInRight}
          transition={{ delay: 0.2 }}
        >
          <AnimatedCardHeader>
            <AnimatedCardTitle>Local Culture</AnimatedCardTitle>
            <AnimatedCardDescription>
              Immerse yourself in authentic Tunisian traditions and hospitality.
            </AnimatedCardDescription>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <p>
              Experience the rich cultural heritage of Tabarka, from traditional music
              festivals to local cuisine and handicrafts in the bustling markets.
            </p>
          </AnimatedCardContent>
          <AnimatedCardFooter>
            <AnimatedButton variant="secondary" size="sm">
              Explore Culture
            </AnimatedButton>
          </AnimatedCardFooter>
        </AnimatedCard>
      </AnimatedSection>

      <AnimatedSection className="flex flex-col items-center justify-center space-y-8">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold tracking-tight text-center"
          variants={fadeIn}
        >
          Ready to explore Tabarka?
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl text-center"
          variants={slideUp}
        >
          Book your trip today and discover all that this Tunisian paradise has to offer.
        </motion.p>
        <AnimatedButton 
          size="lg" 
          className="px-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 10
          }}
        >
          Plan Your Trip
        </AnimatedButton>
      </AnimatedSection>
    </div>
  );
};

export default AnimatedComponentsDemo; 