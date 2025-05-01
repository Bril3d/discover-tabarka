'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FilePenLine,
  ImageIcon,
  MapPin,
  Calendar,
  Tag,
  MessageSquare,
  UploadCloud,
  Save,
  Plus,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash,
  Copy,
  Star,
  Globe,
  BookOpen,
  ListChecks,
  Camera,
  Layout,
  Search
} from 'lucide-react';

// Types for content
type ContentCategory = 
  | 'beaches' 
  | 'dining' 
  | 'activities' 
  | 'landmarks' 
  | 'accommodation' 
  | 'events' 
  | 'guides' 
  | 'diving'
  | 'history'
  | 'nightlife';

type ContentType = 'post' | 'guide' | 'event' | 'location' | 'review';

type ContentStatus = 'draft' | 'published' | 'scheduled';

type ContentItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  type: ContentType;
  category: ContentCategory;
  status: ContentStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata: {
    views: number;
    likes: number;
    comments: number;
  };
};

// Sample content data
const sampleContent: ContentItem[] = [
  {
    id: '1',
    title: 'Top 10 Beaches in Tabarka You Must Visit',
    slug: 'top-10-beaches-tabarka',
    excerpt: 'Discover the most beautiful beaches in Tabarka with crystal clear waters and pristine sands.',
    content: '# Top 10 Beaches in Tabarka\n\nTabarka is famous for its stunning beaches with crystal clear waters...',
    featuredImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    type: 'guide',
    category: 'beaches',
    status: 'published',
    featured: true,
    createdAt: '2023-05-01T09:00:00Z',
    updatedAt: '2023-05-02T11:30:00Z',
    publishedAt: '2023-05-02T12:00:00Z',
    author: {
      id: '1',
      name: 'Admin User',
      avatar: '/avatars/admin.jpg',
    },
    metadata: {
      views: 1245,
      likes: 86,
      comments: 23,
    },
  },
  {
    id: '2',
    title: 'The History of Genoese Fort: A Complete Guide',
    slug: 'genoese-fort-history-guide',
    excerpt: "Explore the rich history of the Genoese Fort, one of Tabarka's most iconic landmarks.",
    content: '# The History of Genoese Fort\n\nBuilt in the 16th century, the Genoese Fort has a fascinating history...',
    featuredImage: 'https://images.unsplash.com/photo-1564509435793-300c48aabf47',
    type: 'post',
    category: 'history',
    status: 'published',
    featured: true,
    createdAt: '2023-04-15T10:20:00Z',
    updatedAt: '2023-04-16T14:45:00Z',
    publishedAt: '2023-04-16T15:00:00Z',
    author: {
      id: '1',
      name: 'Admin User',
      avatar: '/avatars/admin.jpg',
    },
    metadata: {
      views: 968,
      likes: 57,
      comments: 14,
    },
  },
  {
    id: '3',
    title: 'Annual Coral Diving Festival 2023',
    slug: 'coral-diving-festival-2023',
    excerpt: "Join the biggest diving event of the year at Tabarka's famous coral reefs.",
    content: '# Annual Coral Diving Festival 2023\n\nThe festival will feature diving competitions, underwater photography contests...',
    featuredImage: 'https://images.unsplash.com/photo-1544551763-92ab472cad5f',
    type: 'event',
    category: 'diving',
    status: 'scheduled',
    featured: false,
    createdAt: '2023-05-10T08:15:00Z',
    updatedAt: '2023-05-10T16:30:00Z',
    publishedAt: '2023-06-01T00:00:00Z',
    author: {
      id: '1',
      name: 'Admin User',
      avatar: '/avatars/admin.jpg',
    },
    metadata: {
      views: 0,
      likes: 0,
      comments: 0,
    },
  },
  {
    id: '4',
    title: 'Best Seafood Restaurants in Tabarka',
    slug: 'best-seafood-restaurants-tabarka',
    excerpt: 'A culinary guide to the most delicious seafood spots in Tabarka.',
    content: '# Best Seafood Restaurants in Tabarka\n\nTabarka is known for its fresh seafood and these restaurants serve the best dishes...',
    featuredImage: 'https://images.unsplash.com/photo-1551218808-94e220e084d2',
    type: 'guide',
    category: 'dining',
    status: 'draft',
    featured: false,
    createdAt: '2023-05-14T11:40:00Z',
    updatedAt: '2023-05-14T11:40:00Z',
    author: {
      id: '1',
      name: 'Admin User',
      avatar: '/avatars/admin.jpg',
    },
    metadata: {
      views: 0,
      likes: 0,
      comments: 0,
    },
  },
];

// Content category options
const categoryOptions = [
  { value: 'beaches', label: 'Beaches' },
  { value: 'dining', label: 'Dining' },
  { value: 'activities', label: 'Activities' },
  { value: 'landmarks', label: 'Landmarks' },
  { value: 'accommodation', label: 'Accommodation' },
  { value: 'events', label: 'Events' },
  { value: 'guides', label: 'Guides' },
  { value: 'diving', label: 'Diving' },
  { value: 'history', label: 'History' },
  { value: 'nightlife', label: 'Nightlife' },
];

// Content type options
const contentTypeOptions = [
  { value: 'post', label: 'Post', icon: <FilePenLine className="h-4 w-4" /> },
  { value: 'guide', label: 'Guide', icon: <BookOpen className="h-4 w-4" /> },
  { value: 'event', label: 'Event', icon: <Calendar className="h-4 w-4" /> },
  { value: 'location', label: 'Location', icon: <MapPin className="h-4 w-4" /> },
  { value: 'review', label: 'Review', icon: <Star className="h-4 w-4" /> },
];

export default function ContentEditorPage() {
  const router = useRouter();
  const [contents, setContents] = useState<ContentItem[]>(sampleContent);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [contentForm, setContentForm] = useState<Partial<ContentItem>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    type: 'post',
    category: 'beaches',
    status: 'draft',
    featured: false,
  });

  // Filter content based on tab and search
  const filteredContent = contents.filter(content => {
    // Filter by tab
    if (activeTab !== 'all' && content.status !== activeTab) {
      return false;
    }
    
    // Filter by search
    if (
      searchQuery && 
      !content.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !content.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });

  // Initialize new content form
  const handleNewContent = (type: ContentType) => {
    setSelectedContent(null);
    setContentForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      type,
      category: 'beaches',
      status: 'draft',
      featured: false,
    });
    setIsEditing(true);
  };

  // Edit existing content
  const handleEditContent = (content: ContentItem) => {
    setSelectedContent(content);
    setContentForm({ ...content });
    setIsEditing(true);
  };

  // Delete content
  const handleDeleteContent = (id: string) => {
    if (confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      setContents(contents.filter(content => content.id !== id));
      if (selectedContent?.id === id) {
        setSelectedContent(null);
        setIsEditing(false);
      }
    }
  };

  // Save content changes
  const handleSaveContent = () => {
    if (!contentForm.title || !contentForm.content) {
      alert('Title and content are required');
      return;
    }
    
    // If we're editing an existing content
    if (selectedContent) {
      setContents(contents.map(content => 
        content.id === selectedContent.id 
          ? { 
              ...content,
              ...contentForm,
              updatedAt: new Date().toISOString(),
            } 
          : content
      ));
    } else {
      // Create new content
      const newContent: ContentItem = {
        id: `new-${Date.now()}`,
        title: contentForm.title || '',
        slug: contentForm.slug || contentForm.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || '',
        excerpt: contentForm.excerpt || '',
        content: contentForm.content || '',
        type: contentForm.type as ContentType || 'post',
        category: contentForm.category as ContentCategory || 'beaches',
        status: contentForm.status as ContentStatus || 'draft',
        featured: contentForm.featured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
          id: '1',
          name: 'Admin User',
          avatar: '/avatars/admin.jpg',
        },
        metadata: {
          views: 0,
          likes: 0,
          comments: 0,
        },
      };
      
      setContents([newContent, ...contents]);
    }
    
    setIsEditing(false);
    setSelectedContent(null);
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setContentForm({ ...contentForm, slug });
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: ContentStatus }) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Published</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Badge for secondary UI elements
  const Badge = ({ 
    children, 
    className = "", 
    variant = "default" 
  }: { 
    children: React.ReactNode; 
    className?: string; 
    variant?: "default" | "secondary" | "destructive" | "outline"; 
  }) => {
    const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
    
    const variantClasses = {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input bg-background"
    };
    
    return (
      <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  // Content card component
  const ContentCard = ({ content }: { content: ContentItem }) => (
    <Card className="mb-4 overflow-hidden transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        {content.featuredImage && (
          <div className="w-full sm:w-48 h-32 sm:h-auto relative bg-muted">
            <div 
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${content.featuredImage})` }}
            />
          </div>
        )}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge 
                  variant="secondary" 
                  className="capitalize"
                >
                  {content.type}
                </Badge>
                <StatusBadge status={content.status} />
                {content.featured && (
                  <Badge className="bg-amber-500">Featured</Badge>
                )}
              </div>
              <h3 className="text-lg font-medium line-clamp-1">{content.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {content.excerpt}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleEditContent(content)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive"
                  onClick={() => handleDeleteContent(content.id)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center text-xs text-muted-foreground">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={content.author.avatar} alt={content.author.name} />
                <AvatarFallback>
                  {content.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span>{content.author.name}</span>
              <span className="mx-2">•</span>
              <span>
                {new Date(content.updatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {content.metadata.views}
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {content.metadata.comments}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Editor</h1>
            <p className="text-muted-foreground">
              Create and manage content for the Discover Tabarka website
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Content
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {contentTypeOptions.map((type) => (
                <DropdownMenuItem 
                  key={type.value}
                  onClick={() => handleNewContent(type.value as ContentType)}
                >
                  {type.icon}
                  <span className="ml-2">{type.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isEditing ? (
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedContent ? 'Edit Content' : 'Create New Content'}
              </CardTitle>
              <CardDescription>
                {selectedContent 
                  ? 'Update the content details and save your changes'
                  : 'Fill in the details to create new content'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={contentForm.title || ''} 
                    onChange={(e) => {
                      setContentForm({ ...contentForm, title: e.target.value });
                      if (!selectedContent) {
                        generateSlug(e.target.value);
                      }
                    }}
                    placeholder="Enter content title"
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="slug">
                    Slug
                    <span className="ml-1 text-xs text-muted-foreground">
                      (URL-friendly name)
                    </span>
                  </Label>
                  <Input 
                    id="slug" 
                    value={contentForm.slug || ''} 
                    onChange={(e) => setContentForm({ ...contentForm, slug: e.target.value })}
                    placeholder="enter-url-slug"
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="excerpt">Excerpt/Summary</Label>
                  <Textarea 
                    id="excerpt" 
                    value={contentForm.excerpt || ''} 
                    onChange={(e) => setContentForm({ ...contentForm, excerpt: e.target.value })}
                    placeholder="Brief summary of the content"
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="type">Content Type</Label>
                    <Select
                      value={contentForm.type || 'post'}
                      onValueChange={(value: ContentType) => 
                        setContentForm({ ...contentForm, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypeOptions.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              {type.icon}
                              <span className="ml-2">{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={contentForm.category || 'beaches'}
                      onValueChange={(value: ContentCategory) => 
                        setContentForm({ ...contentForm, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={contentForm.status || 'draft'}
                      onValueChange={(value: ContentStatus) => 
                        setContentForm({ ...contentForm, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      id="featured"
                      checked={contentForm.featured || false}
                      onCheckedChange={(checked) => 
                        setContentForm({ ...contentForm, featured: checked })
                      }
                    />
                    <Label htmlFor="featured">
                      Featured Content
                      <span className="block text-xs text-muted-foreground">
                        Highlight this content on the homepage
                      </span>
                    </Label>
                  </div>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="featuredImage">Featured Image URL</Label>
                  <Input 
                    id="featuredImage" 
                    value={contentForm.featuredImage || ''} 
                    onChange={(e) => setContentForm({ ...contentForm, featuredImage: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a URL or upload an image (upload feature coming soon)
                  </p>
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="content">
                    Content
                    <span className="ml-1 text-xs text-muted-foreground">
                      (Markdown supported)
                    </span>
                  </Label>
                  <Textarea 
                    id="content" 
                    value={contentForm.content || ''} 
                    onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })}
                    placeholder="Write your content here..."
                    className="min-h-[300px] font-mono"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => {
                setIsEditing(false);
                setSelectedContent(null);
              }}>
                Cancel
              </Button>
              <Button onClick={handleSaveContent}>
                <Save className="mr-2 h-4 w-4" />
                {selectedContent ? 'Update Content' : 'Create Content'}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search content..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Content</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                <ScrollArea className="h-[calc(100vh-320px)]">
                  {filteredContent.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <Layout className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="font-medium">No content found</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery 
                          ? 'Try a different search term'
                          : 'Create new content to get started'
                        }
                      </p>
                    </div>
                  ) : (
                    filteredContent.map((content) => (
                      <ContentCard key={content.id} content={content} />
                    ))
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </motion.div>
  );
} 