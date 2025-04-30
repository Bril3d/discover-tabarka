export type BlogPost = {
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
};

// Mock data for blog posts - would be fetched from Supabase in production
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Phoenician Legacy: How Purple Dye Put Tabarka on the Map',
    excerpt: 'Discover how Tabarka became an important trading post for the precious purple dye extracted from murex shells.',
    content: `<p>Long before it became a tourist destination, Tabarka was known throughout the ancient world for something quite unexpected: the color purple. Around 1100 BCE, Phoenician traders established a settlement in what is now modern-day Tabarka, recognizing its strategic location and abundant natural resources.</p>
      
      <p>The Phoenicians, skilled maritime traders from the eastern Mediterranean, were particularly interested in one resource: murex shells. These mollusks, found in abundance in Tabarka's coastal waters, were the source of the famous Tyrian purple dye – perhaps the ancient world's most prestigious luxury good.</p>
      
      <p>The process of extracting this dye was painstaking. Thousands of murex shells would be collected, crushed, and left to ferment in large vats. The resulting liquid would then undergo a complex process of exposure to sunlight to develop its vibrant purple hue. The entire procedure was not only labor-intensive but also extremely malodorous – ancient texts describe the overwhelming stench that surrounded dye-making facilities.</p>
      
      <p>But the end result was worth it. This rare and vibrant purple dye became highly prized throughout the Mediterranean, particularly because it didn't fade but actually brightened with weathering and sunlight. The color became so valuable that in many societies, including Ancient Rome, purple-dyed garments were reserved exclusively for royalty and the highest-ranking officials.</p>
      
      <p>Tabarka's importance in this ancient trade network cannot be overstated. Archaeological excavations in the area have uncovered evidence of large-scale purple dye production, including crushed shell middens and remnants of dye-making facilities. These findings suggest that Tabarka wasn't merely a minor outpost but a significant industrial center in the ancient Mediterranean economy.</p>
      
      <p>This purple legacy laid the foundation for what would become a pattern throughout Tabarka's history – the strategic utilization of natural resources that would repeatedly put this small coastal town on the map of great empires and trading networks. From Phoenician purple to Genoese coral and modern tourism, Tabarka's story is one of natural abundance attracting global attention.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1617624085810-3df2165bd11b',
    publishedAt: '2023-05-12',
    author: {
      name: 'Dr. Amina Benali',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg'
    },
    category: 'Ancient History',
    readTime: 8
  },
  {
    id: '2',
    title: 'Genoese Coral Hunters: The 16th Century Tabarka Connection',
    excerpt: 'The fascinating story of how Italian coral fishermen transformed Tabarka and built the iconic fortress.',
    content: `<p>In the 1540s, Tabarka entered one of its most distinctive historical periods when the Lomellini family of Genoa obtained rights to establish a trading post on the island of Tabarka, just off the mainland coast. What began as a commercial venture would transform both the landscape and legacy of Tabarka for centuries to come.</p>
      
      <p>The primary attraction for the Genoese was the rich red coral beds found in the waters surrounding Tabarka. Red coral was highly prized throughout Europe and the Mediterranean for jewelry, religious artifacts, and medicinal purposes. The Lomellini family secured an agreement with the Ottoman authorities that gave them exclusive rights to harvest these valuable marine treasures.</p>
      
      <p>To protect their lucrative coral operation, the Genoese constructed the imposing fortress that still stands as Tabarka's most recognizable landmark today. The fort served not only as a defensive structure but also as the administrative center for what became a small but thriving Genoese colony. At its height, hundreds of Genoese settlers lived on the island, establishing a unique cultural enclave on the North African coast.</p>
      
      <p>The coral harvesting itself was a dangerous and difficult profession. Divers would descend to significant depths without any modern equipment, using weighted ropes and nets to collect the precious coral branches. The harvested coral would then be carefully processed and shipped to markets across Europe, where Tabarka coral gained a reputation for exceptional quality.</p>
      
      <p>The Genoese presence in Tabarka lasted for nearly two centuries, creating a unique cultural blend that left lasting imprints on local architecture, cuisine, and even genetic heritage. The end of Genoese Tabarka came in 1741 when the Bey of Tunis, frustrated by years of declining tribute payments, seized the island and ended the arrangement.</p>
      
      <p>Many of the Genoese residents were taken captive or fled to other Mediterranean locations, including Sardinia, where they established a settlement that still bears the name "Carloforte" (or "New Tabarka" as it was originally known). These Tabarka diaspora communities maintained their distinctive Genoese dialect and customs well into the modern era, representing a fascinating example of cultural preservation across the Mediterranean.</p>
      
      <p>Today, the fortress stands as a testament to this remarkable period in Tabarka's history, when Italian coral hunters made this small corner of Tunisia their home and connected it to the wider Mediterranean world through their valuable marine harvest.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1552406612-3bfff359cd4e',
    publishedAt: '2023-06-22',
    author: {
      name: 'Marco Lombardi',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    category: 'Colonial History',
    readTime: 10
  },
  {
    id: '3',
    title: 'The Birth of the Tabarka Jazz Festival: A Cultural Revolution',
    excerpt: 'How a small Tunisian coastal town became an unlikely jazz capital of the Mediterranean.',
    content: `<p>In 1973, something unexpected happened in the quiet fishing town of Tabarka: the launch of a jazz festival that would grow to become one of North Africa's premier cultural events and put this small Tunisian town on the international cultural map.</p>
      
      <p>The inaugural Tabarka Jazz Festival was the brainchild of a group of Tunisian music enthusiasts and cultural visionaries who saw potential in combining Tabarka's natural beauty with the universal language of jazz. The timing was significant - Tunisia in the early 1970s was finding its cultural identity following independence, and jazz, with its emphasis on improvisation and freedom of expression, resonated with this national spirit of reinvention.</p>
      
      <p>The first festival was modest in scale but ambitious in vision. Performances were held in the shadow of the historic Genoese fort, creating a stunning juxtaposition of ancient stone walls and modern musical innovation. Local accounts recall how the melodies would drift across the harbor, drawing in locals who had never before experienced jazz music.</p>
      
      <p>What made the festival particularly special was its commitment to musical fusion from the very beginning. While international jazz stars were invited to perform, there was always an emphasis on collaboration with local North African musicians. This created a unique sound that blended traditional Tunisian and Maghrebi musical elements with classic jazz structures - a Mediterranean jazz fusion that became one of the festival's hallmarks.</p>
      
      <p>Through the subsequent decades, the festival grew in prominence, attracting legendary performers from across the globe. Names like Miles Davis, Dizzy Gillespie, Stan Getz, and later Wynton Marsalis graced the Tabarka stages, performing alongside the best talent from Tunisia and the broader Arab world.</p>
      
      <p>The economic impact on Tabarka was transformative. The once-sleepy fishing village began developing tourism infrastructure specifically to accommodate the annual influx of jazz enthusiasts. Hotels, restaurants, and other businesses found new life during the festival weeks, eventually expanding to serve tourists year-round.</p>
      
      <p>Perhaps most importantly, the festival became a powerful symbol of Tunisia's openness to the world and commitment to cultural exchange. During political transitions and challenges, the continuation of the jazz festival served as a reminder of the country's cosmopolitan aspirations and artistic resilience.</p>
      
      <p>Today, though it has faced interruptions due to various factors including political events and global health crises, the Tabarka Jazz Festival remains an integral part of the town's identity. When the notes of saxophone and piano once again fill the Mediterranean air each summer, they echo not just across the water but across the decades of cultural history that have made Tabarka much more than just another coastal destination.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    publishedAt: '2023-07-15',
    author: {
      name: 'Sami Touré',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    category: 'Cultural History',
    readTime: 12
  },
  {
    id: '4',
    title: 'Underwater Treasures: The Archaeological Discoveries of Tabarka\'s Coast',
    excerpt: 'Recent marine archaeological findings reveal Tabarka\'s importance as an ancient Mediterranean port.',
    content: `<p>Beneath the crystal-clear waters that attract divers to Tabarka today lies a treasure trove of archaeological evidence that continues to reshape our understanding of this coastal town's historical significance. Recent underwater excavations have uncovered remarkably preserved artifacts that tell the story of Tabarka as a bustling maritime hub across multiple civilizations.</p>
      
      <p>Marine archaeology off Tabarka's coast began in earnest in the 1990s, but accelerated significantly in the 2010s with advances in underwater archaeological techniques. The most significant discoveries have been concentrated around the natural harbor and the small island that once housed the Genoese settlement.</p>
      
      <p>Perhaps the most spectacular finds have been several remarkably well-preserved shipwrecks dating from different historical periods. A Roman merchant vessel discovered in 2015 contained hundreds of amphoras (storage jars) still arranged in their original shipping configuration - many still sealed with their contents intact. Analysis revealed these containers held wine, olive oil, and garum (a fermented fish sauce that was a staple of Roman cuisine), providing direct evidence of the trade goods that passed through Tabarka's harbor.</p>
      
      <p>Phoenician artifacts have also been recovered, including distinctive pottery and religious items that confirm the written accounts of early Phoenician settlement. Perhaps most intriguing was the 2018 discovery of what appears to be the remains of a Phoenician purple-dye production facility on the submerged portion of the coastline - evidence of sea level changes over the millennia and confirmation of Tabarka's role in this luxury trade.</p>
      
      <p>The underwater archaeological record has also yielded evidence of Tabarka's role during the Byzantine period, a phase of its history that had been poorly documented in written sources. Bronze coins, religious artifacts, and architectural elements suggest that Tabarka remained an important regional port during this era of transition.</p>
      
      <p>For the Genoese period, underwater archaeology has provided particularly vivid insights. Divers have recovered coral harvesting tools, navigational instruments, and everyday items from the settlement. These findings help reconstruct the daily life of the Italian coral hunters who made Tabarka their home for two centuries.</p>
      
      <p>Conservation efforts are now underway to protect these underwater historical sites while making them accessible to visitors. Several "underwater heritage trails" have been established, allowing experienced divers to witness these archaeological treasures firsthand while ensuring their preservation for future generations.</p>
      
      <p>As marine archaeologists continue their meticulous work mapping and excavating Tabarka's underwater landscape, each new discovery adds another piece to the complex puzzle of this remarkable coastal town's history - proving that in Tabarka, some of the most significant historical evidence lies not on land, but beneath the waves.</p>`,
    coverImage: 'https://images.unsplash.com/photo-1551244072-5d11fb7cd239',
    publishedAt: '2023-08-05',
    author: {
      name: 'Dr. Youssef Morsi',
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
    },
    category: 'Archaeology',
    readTime: 9
  }
]; 