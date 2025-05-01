'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Calendar,
  Filter,
  MoreVertical,
  Info,
  Flag,
  AlertTriangle
} from 'lucide-react';

// Sample data for content moderation
const pendingContent = [
  {
    id: '1',
    type: 'photo',
    title: 'Sunset at Tabarka Beach',
    description: "Amazing colors during sunset at the main beach. One of the most beautiful scenes I've witnessed!",
    imageUrl: 'https://images.unsplash.com/photo-1548578456-daf174ee83f8',
    timestamp: '2023-05-12T14:30:00Z',
    location: 'Tabarka Beach',
    category: 'beaches',
    flags: 0,
    submitter: {
      id: 'user1',
      name: 'Ahmed Ben Ali',
      avatar: '/avatars/ahmed.jpg',
      fallback: 'AB',
      role: 'user'
    }
  },
  {
    id: '2',
    type: 'photo',
    title: 'Coral Reef Diving Experience',
    description: 'Found this amazing coral formation while diving today at Coral Bay. The marine life is thriving!',
    imageUrl: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b',
    timestamp: '2023-05-11T10:15:00Z',
    location: 'Coral Bay',
    category: 'diving',
    flags: 0,
    submitter: {
      id: 'user2',
      name: 'Sophie Martin',
      avatar: '/avatars/sophie.jpg',
      fallback: 'SM',
      role: 'contributor'
    }
  },
  {
    id: '3',
    type: 'story',
    title: 'A Day at the Genoese Fort',
    description: "Spent the day exploring the historical Genoese Fort and learning about its fascinating history. The views from the top are breathtaking and give you a panoramic perspective of Tabarka's coastline. I'd recommend visiting early in the morning to avoid crowds and enjoy the cool breeze.",
    timestamp: '2023-05-10T16:45:00Z',
    location: 'Genoese Fort',
    category: 'history',
    flags: 2,
    submitter: {
      id: 'user3',
      name: 'Mohamed Trabelsi',
      avatar: '/avatars/mohamed.jpg',
      fallback: 'MT',
      role: 'user'
    }
  },
  {
    id: '4',
    type: 'review',
    title: 'Seafood at Les Aiguilles Restaurant',
    description: 'Had the most amazing seafood platter at Les Aiguilles Restaurant. The food was fresh, well-prepared, and the service was excellent. Highly recommend their grilled sea bass with local spices. The view of the marina makes dining here even more special.',
    rating: 4.5,
    timestamp: '2023-05-09T19:20:00Z',
    location: 'Les Aiguilles Restaurant',
    category: 'food',
    flags: 0,
    submitter: {
      id: 'user4',
      name: 'Leila Kacem',
      avatar: '/avatars/leila.jpg',
      fallback: 'LK',
      role: 'user'
    }
  },
  {
    id: '5',
    type: 'photo',
    title: 'Needles Rock Formation',
    description: `The iconic Needles rock formation at sunset. Nature's masterpiece!`,
    imageUrl: 'https://images.unsplash.com/photo-1566409358502-1fe56a505a43',
    timestamp: '2023-05-08T18:30:00Z',
    location: 'Needles Viewpoint',
    category: 'landscapes',
    flags: 1,
    submitter: {
      id: 'user5',
      name: 'Thomas Bernard',
      avatar: '/avatars/thomas.jpg',
      fallback: 'TB',
      role: 'contributor'
    }
  }
];

const flaggedContent = [
  {
    id: '101',
    type: 'comment',
    content: `This place is totally overrated. Don't waste your time or money!`,
    timestamp: '2023-05-12T09:15:00Z',
    targetPost: 'Restaurant Review: Marina Seafood',
    flags: 3,
    flagReason: 'inappropriate',
    submitter: {
      id: 'user6',
      name: 'Anonymous User',
      fallback: 'AU',
      role: 'user'
    }
  },
  {
    id: '102',
    type: 'photo',
    title: 'Beach Party Night',
    description: 'Great night at Tabarka Beach Club!',
    imageUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
    timestamp: '2023-05-10T23:30:00Z',
    location: 'Tabarka Beach Club',
    category: 'nightlife',
    flags: 5,
    flagReason: 'inappropriate content',
    submitter: {
      id: 'user7',
      name: 'Jean Dupont',
      avatar: '/avatars/jean.jpg',
      fallback: 'JD',
      role: 'user'
    }
  }
];

// Type for content items
type ContentItem = {
  id: string;
  type: 'photo' | 'story' | 'review' | 'comment';
  title?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  rating?: number;
  timestamp: string;
  location?: string;
  targetPost?: string;
  category?: string;
  flags: number;
  flagReason?: string;
  submitter: {
    id: string;
    name: string;
    avatar?: string;
    fallback: string;
    role: 'user' | 'contributor' | 'admin';
  };
};

export default function ContentModerationPage() {
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  
  // Handle content action (approve/reject)
  const handleApprove = (content: ContentItem) => {
    // In a real app, this would call an API
    alert(`Content ID: ${content.id} approved!`);
    // You would also update the content list after approval
  };
  
  const handleReject = (content: ContentItem) => {
    // In a real app, this would call an API
    alert(`Content ID: ${content.id} rejected!`);
    // You would also update the content list after rejection
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Content Moderation</h1>
          <p className="text-muted-foreground">Review and approve user-submitted content</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Moderation Guidelines
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending Review
            <Badge className="ml-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/10">
              {pendingContent.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="flagged" className="relative">
            Flagged Content
            <Badge className="ml-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/10">
              {flaggedContent.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="bg-transparent border-none p-0 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Content List */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle>Pending Content</CardTitle>
                <CardDescription>Content awaiting moderation</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <ul className="space-y-2 px-2">
                    {pendingContent.map((content) => (
                      <li key={content.id}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-left p-3 rounded-md hover:bg-muted ${
                            selectedContent?.id === content.id ? 'bg-primary/10 border-l-4 border-primary' : 'border-l-4 border-transparent'
                          }`}
                          onClick={() => setSelectedContent(content)}
                        >
                          <div className="flex items-start space-x-3 w-full">
                            <Avatar className="h-9 w-9 mt-0.5">
                              <AvatarImage src={content.submitter.avatar} alt={content.submitter.name} />
                              <AvatarFallback>{content.submitter.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {content.title}
                              </p>
                              <div className="flex items-center mt-1">
                                <Badge variant="secondary" className="mr-2 text-xs">
                                  {content.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(content.timestamp).toLocaleDateString()}
                                </span>
                                {content.flags > 0 && (
                                  <Badge variant="outline" className="ml-auto bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/10">
                                    <Flag className="h-3 w-3 mr-1" />
                                    {content.flags}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
            
            {/* Content Preview */}
            <Card className="md:col-span-2">
              {selectedContent ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{selectedContent.title || 'Content Review'}</CardTitle>
                        <CardDescription>
                          Submitted by {selectedContent.submitter.name} • {formatDate(selectedContent.timestamp)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="destructive" onClick={() => handleReject(selectedContent)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button size="sm" variant="default" onClick={() => handleApprove(selectedContent)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-col space-y-4">
                      {/* Content preview section */}
                      {selectedContent.type === 'photo' && selectedContent.imageUrl && (
                        <div className="overflow-hidden rounded-md border border-border">
                          <div className="relative h-[300px] w-full">
                            <Image
                              src={selectedContent.imageUrl}
                              alt={selectedContent.title || 'Image preview'}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Content details */}
                      <div className="space-y-3">
                        {selectedContent.description && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                            <p className="text-foreground">{selectedContent.description}</p>
                          </div>
                        )}
                        
                        {selectedContent.content && (
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Content</h3>
                            <p className="text-foreground">{selectedContent.content}</p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          {selectedContent.location && (
                            <div className="space-y-1">
                              <h3 className="text-xs font-medium text-muted-foreground">Location</h3>
                              <p className="text-sm text-foreground">{selectedContent.location}</p>
                            </div>
                          )}
                          
                          {selectedContent.category && (
                            <div className="space-y-1">
                              <h3 className="text-xs font-medium text-muted-foreground">Category</h3>
                              <p className="text-sm text-foreground capitalize">{selectedContent.category}</p>
                            </div>
                          )}
                          
                          {selectedContent.targetPost && (
                            <div className="space-y-1">
                              <h3 className="text-xs font-medium text-muted-foreground">Target Post</h3>
                              <p className="text-sm text-foreground">{selectedContent.targetPost}</p>
                            </div>
                          )}
                          
                          {selectedContent.rating && (
                            <div className="space-y-1">
                              <h3 className="text-xs font-medium text-muted-foreground">Rating</h3>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i} 
                                    className={`w-4 h-4 ${i < Math.floor(selectedContent.rating!) ? 'text-amber-500' : 'text-muted'}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <span className="ml-1 text-sm text-foreground">{selectedContent.rating.toFixed(1)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Flag information */}
                      {selectedContent.flags > 0 && (
                        <div className="bg-red-500/5 border border-red-200 dark:border-red-900 rounded-md p-4 mt-4">
                          <div className="flex items-center">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                            <h3 className="text-sm font-medium text-red-500">Content has been flagged {selectedContent.flags} times</h3>
                          </div>
                          {selectedContent.flagReason && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Reason: {selectedContent.flagReason}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between border-t border-border pt-4">
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-3 w-3 mr-2" />
                        Add Note
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-2" />
                        View User
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] text-center p-6">
                  <Info className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-xl font-medium text-foreground mb-2">Select Content to Review</h3>
                  <p className="text-muted-foreground">
                    Choose an item from the list to view its details and take moderation actions.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="flagged" className="bg-transparent border-none p-0 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Similar structure as "pending" tab but with flaggedContent data */}
            <Card className="md:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle>Flagged Content</CardTitle>
                <CardDescription>Content with user reports</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <ul className="space-y-2 px-2">
                    {flaggedContent.map((content) => (
                      <li key={content.id}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-left p-3 rounded-md hover:bg-muted ${
                            selectedContent?.id === content.id ? 'bg-red-500/10 border-l-4 border-red-500' : 'border-l-4 border-transparent'
                          }`}
                          onClick={() => setSelectedContent(content)}
                        >
                          <div className="flex items-start space-x-3 w-full">
                            <Avatar className="h-9 w-9 mt-0.5">
                              <AvatarImage src={content.submitter.avatar} alt={content.submitter.name} />
                              <AvatarFallback>{content.submitter.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {content.title || content.content?.substring(0, 30) + '...'}
                              </p>
                              <div className="flex items-center mt-1">
                                <Badge variant="secondary" className="mr-2 text-xs">
                                  {content.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(content.timestamp).toLocaleDateString()}
                                </span>
                                <Badge variant="destructive" className="ml-auto text-xs">
                                  <Flag className="h-3 w-3 mr-1" />
                                  {content.flags}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
            
            {/* Content Preview - same as in "pending" tab */}
            <Card className="md:col-span-2">
              {/* Content to display would be the same as in the pending tab */}
              {/* You can reuse the same code here or extract it into a separate component */}
              <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] text-center p-6">
                <Info className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">Select Flagged Content</h3>
                <p className="text-muted-foreground">
                  Choose an item from the list to review content that has been flagged by users.
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="approved" className="bg-transparent border-none p-0 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Approved Content</CardTitle>
              <CardDescription>Content that has been approved and published</CardDescription>
            </CardHeader>
            <CardContent>
              {/* This would show a table or list of approved content */}
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Info className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">Approved Content</h3>
                <p className="text-muted-foreground">
                  This section will show a history of all approved content.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejected" className="bg-transparent border-none p-0 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Content</CardTitle>
              <CardDescription>Content that has been rejected</CardDescription>
            </CardHeader>
            <CardContent>
              {/* This would show a table or list of rejected content */}
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Info className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-2">Rejected Content</h3>
                <p className="text-muted-foreground">
                  This section will show a history of all rejected content.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 