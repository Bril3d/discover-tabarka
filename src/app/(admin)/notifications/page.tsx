'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell, Camera,
  Check, Clock,
  ExternalLink,
  Flag, MessageSquare,
  MoreHorizontal, Search,
  Settings, Trash,
  UserPlus, XCircle
} from 'lucide-react';

// Types for notifications
type NotificationType = 
  | 'submission'
  | 'comment'
  | 'report'
  | 'system'
  | 'mention';

type NotificationPriority = 'low' | 'medium' | 'high';

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  meta?: {
    contentType?: string;
    contentId?: string;
    userId?: string;
    count?: number;
  };
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
};

// Sample notifications data
const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'submission',
    title: 'New photo submission',
    message: 'Ahmed Ben Ali submitted a new photo of Tabarka Beach',
    priority: 'medium',
    timestamp: '2023-05-16T10:23:00Z',
    read: false,
    actionUrl: '/admin/moderation?id=photo-123',
    meta: {
      contentType: 'photo',
      contentId: 'photo-123',
      userId: 'user1',
    },
    sender: {
      id: 'user1',
      name: 'Ahmed Ben Ali',
      avatar: '/avatars/ahmed.jpg',
    },
  },
  {
    id: '2',
    type: 'submission',
    title: 'New review submission',
    message: 'Sophie Martin posted a review for Les Aiguilles Restaurant',
    priority: 'medium',
    timestamp: '2023-05-16T09:45:00Z',
    read: false,
    actionUrl: '/admin/moderation?id=review-456',
    meta: {
      contentType: 'review',
      contentId: 'review-456',
      userId: 'user2',
    },
    sender: {
      id: 'user2',
      name: 'Sophie Martin',
      avatar: '/avatars/sophie.jpg',
    },
  },
  {
    id: '3',
    type: 'report',
    title: 'Content reported',
    message: 'A comment has been flagged as inappropriate by multiple users',
    priority: 'high',
    timestamp: '2023-05-16T08:12:00Z',
    read: false,
    actionUrl: '/admin/moderation?id=comment-789',
    meta: {
      contentType: 'comment',
      contentId: 'comment-789',
      count: 3,
    },
  },
  {
    id: '4',
    type: 'system',
    title: 'Backup completed',
    message: 'The daily content backup was completed successfully',
    priority: 'low',
    timestamp: '2023-05-16T03:00:00Z',
    read: true,
  },
  {
    id: '5',
    type: 'submission',
    title: 'New guide submission',
    message: 'Mohamed Trabelsi submitted a guide about diving sites',
    priority: 'medium',
    timestamp: '2023-05-15T15:30:00Z',
    read: true,
    actionUrl: '/admin/moderation?id=guide-321',
    meta: {
      contentType: 'guide',
      contentId: 'guide-321',
      userId: 'user3',
    },
    sender: {
      id: 'user3',
      name: 'Mohamed Trabelsi',
      avatar: '/avatars/mohamed.jpg',
    },
  },
  {
    id: '6',
    type: 'mention',
    title: 'You were mentioned',
    message: 'Leila Kacem mentioned you in a comment on "Coral Reef Diving Experience"',
    priority: 'low',
    timestamp: '2023-05-15T12:18:00Z',
    read: true,
    actionUrl: '/admin/moderation?id=comment-987',
    meta: {
      contentType: 'comment',
      contentId: 'comment-987',
      userId: 'user4',
    },
    sender: {
      id: 'user4',
      name: 'Leila Kacem',
      avatar: '/avatars/leila.jpg',
    },
  },
  {
    id: '7',
    type: 'system',
    title: 'New user registrations',
    message: '5 new users registered in the last 24 hours',
    priority: 'low',
    timestamp: '2023-05-15T09:00:00Z',
    read: true,
    actionUrl: '/admin/users?filter=recent',
    meta: {
      count: 5,
    },
  },
];

// Notification settings
type NotificationSetting = {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  inApp: boolean;
};

const notificationSettings: NotificationSetting[] = [
  {
    id: 'new_submissions',
    label: 'New Content Submissions',
    description: 'When users submit new content for approval',
    email: true,
    push: true,
    inApp: true,
  },
  {
    id: 'content_reports',
    label: 'Content Reports',
    description: 'When content is flagged or reported by users',
    email: true,
    push: true,
    inApp: true,
  },
  {
    id: 'user_registrations',
    label: 'New User Registrations',
    description: 'When new users sign up to the platform',
    email: true,
    push: false,
    inApp: true,
  },
  {
    id: 'comments',
    label: 'New Comments',
    description: 'When users comment on content',
    email: false,
    push: false,
    inApp: true,
  },
  {
    id: 'system_alerts',
    label: 'System Alerts',
    description: 'Important system notifications and updates',
    email: true,
    push: true,
    inApp: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [settings, setSettings] = useState<NotificationSetting[]>(notificationSettings);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter notifications based on tab and search
  const filteredNotifications = notifications.filter(notification => {
    // Filter by tab
    if (activeTab === 'unread' && notification.read) {
      return false;
    }
    
    // Filter by type
    if (activeTab !== 'all' && activeTab !== 'unread' && notification.type !== activeTab) {
      return false;
    }
    
    // Filter by search
    if (
      searchQuery && 
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });

  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true } 
        : notification
    ));
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  // Update notification settings
  const updateSetting = (id: string, field: 'email' | 'push' | 'inApp', value: boolean) => {
    setSettings(settings.map(setting => 
      setting.id === id 
        ? { ...setting, [field]: value } 
        : setting
    ));
  };

  // Icon for notification type
  const NotificationIcon = ({ type }: { type: NotificationType }) => {
    switch (type) {
      case 'submission':
        return <Camera className="h-5 w-5 text-blue-500" />;
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'report':
        return <Flag className="h-5 w-5 text-red-500" />;
      case 'system':
        return <Settings className="h-5 w-5 text-purple-500" />;
      case 'mention':
        return <UserPlus className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  // Priority badge
  const PriorityBadge = ({ priority }: { priority: NotificationPriority }) => {
    const colors = {
      low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    
    return (
      <span className={`text-xs px-1.5 py-0.5 rounded-sm ${colors[priority]}`}>
        {priority}
      </span>
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    // Less than 24 hours ago
    if (diff < 24 * 60 * 60 * 1000) {
      // Less than 60 minutes ago
      if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      }
      
      // Hours ago
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // More than 24 hours ago
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              Manage system alerts and user content submissions
            </p>
          </div>
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all" className="relative">
                All
                {unreadCount > 0 && (
                  <Badge className="ml-1 bg-primary absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="submission">Submissions</TabsTrigger>
              <TabsTrigger value="report">Reports</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative w-60">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search notifications..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={markAllAsRead} disabled={unreadCount === 0}>
                    <Check className="mr-2 h-4 w-4" />
                    Mark All as Read
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearAllNotifications} disabled={notifications.length === 0}>
                    <Trash className="mr-2 h-4 w-4" />
                    Clear All Notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <TabsContent value={activeTab} className="mt-0">
                <ScrollArea className="h-[calc(100vh-350px)]">
                  {filteredNotifications.length === 0 ? (
                    <div className="py-12 text-center">
                      <Bell className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        {searchQuery 
                          ? 'No notifications match your search'
                          : activeTab === 'unread'
                            ? 'No unread notifications'
                            : 'You have no notifications at the moment'
                        }
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-border">
                      {filteredNotifications.map((notification) => (
                        <li 
                          key={notification.id}
                          className={`p-4 hover:bg-muted/50 transition-colors ${
                            !notification.read ? 'bg-muted/30' : ''
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`mt-1 ${!notification.read ? 'text-primary' : 'text-muted-foreground'}`}>
                              <NotificationIcon type={notification.type} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {notification.title}
                                  </h4>
                                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                    {notification.message}
                                  </p>
                                  
                                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                    {notification.sender && (
                                      <div className="flex items-center">
                                        <Avatar className="h-4 w-4 mr-1">
                                          <AvatarImage src={notification.sender.avatar} alt={notification.sender.name} />
                                          <AvatarFallback className="text-[8px]">
                                            {notification.sender.name.split(' ').map(n => n[0]).join('')}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span>{notification.sender.name}</span>
                                        <span className="mx-1">•</span>
                                      </div>
                                    )}
                                    
                                    <div className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {formatDate(notification.timestamp)}
                                    </div>
                                    
                                    <PriorityBadge priority={notification.priority} />
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-1">
                                  {notification.actionUrl && (
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => {
                                        markAsRead(notification.id);
                                        // In a real app, this would navigate to the URL
                                        window.alert(`Navigating to: ${notification.actionUrl}`);
                                      }}
                                    >
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="sr-only">View</span>
                                    </Button>
                                  )}
                                  
                                  {!notification.read && (
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <Check className="h-4 w-4" />
                                      <span className="sr-only">Mark as read</span>
                                    </Button>
                                  )}
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <XCircle className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </ScrollArea>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        {/* Notification Settings */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <Card>
            <CardHeader>
              <CardTitle>Configure Alerts</CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {settings.map((setting) => (
                  <li key={setting.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{setting.label}</p>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-1.5">
                          <Switch
                            id={`${setting.id}-email`}
                            checked={setting.email}
                            onCheckedChange={(checked) => updateSetting(setting.id, 'email', checked)}
                          />
                          <Label htmlFor={`${setting.id}-email`} className="text-xs">Email</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Switch
                            id={`${setting.id}-push`}
                            checked={setting.push}
                            onCheckedChange={(checked) => updateSetting(setting.id, 'push', checked)}
                          />
                          <Label htmlFor={`${setting.id}-push`} className="text-xs">Push</Label>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Switch
                            id={`${setting.id}-inapp`}
                            checked={setting.inApp}
                            onCheckedChange={(checked) => updateSetting(setting.id, 'inApp', checked)}
                          />
                          <Label htmlFor={`${setting.id}-inapp`} className="text-xs">In-App</Label>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.div>
  );
} 