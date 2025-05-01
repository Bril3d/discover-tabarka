'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowUpIcon,
    ArrowDownIcon,
    EyeIcon,
    ImageIcon,
    Users,
    MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';
import {
    Activity,
    MapPin,
    TrendingUp,
    BarChartIcon,
    Camera,
    Download,
    Calendar
} from 'lucide-react';

// Types for statistics data
type StatCard = {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  description: string;
};

// Types for analytics data
type TimeRange = '7d' | '30d' | '90d' | '12m';

type VisitData = {
  date: string;
  visits: number;
  uniqueVisitors: number;
};

type LocationData = {
  name: string;
  visits: number;
  percentage: number;
};

type ContentEngagementData = {
  type: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
};

type UserEngagementData = {
  date: string;
  signups: number;
  activeUsers: number;
};

type ContentDistributionData = {
  name: string;
  value: number;
  color: string;
};

// Sample data 
const pageViews: StatCard = {
  title: 'Page Views',
  value: '24,532',
  change: 12.5,
  icon: <EyeIcon className="h-5 w-5 text-primary" />,
  description: 'Total page views in the last 30 days'
};

const totalUsers: StatCard = {
  title: 'Total Users',
  value: '1,245',
  change: 5.2,
  icon: <Users className="h-5 w-5 text-primary" />,
  description: 'Registered users on the platform'
};

const contentSubmissions: StatCard = {
  title: 'Content Submissions',
  value: '352',
  change: -2.3,
  icon: <ImageIcon className="h-5 w-5 text-primary" />,
  description: 'Photos, videos and stories submitted'
};

const pendingModeration: StatCard = {
  title: 'Pending Moderation',
  value: '24',
  change: 8.1,
  icon: <MessageSquare className="h-5 w-5 text-primary" />,
  description: 'Content waiting for review'
};

// Recent activity data
const recentActivities = [
  {
    id: 1,
    user: {
      name: 'Ahmed Ben Ali',
      avatar: '/avatars/ahmed.jpg',
      fallback: 'AB'
    },
    action: 'submitted',
    content: 'a new photo of Coral Bay',
    time: '10 minutes ago',
    status: 'pending'
  },
  {
    id: 2,
    user: {
      name: 'Sophie Martin',
      avatar: '/avatars/sophie.jpg',
      fallback: 'SM'
    },
    action: 'created',
    content: 'a new blog post about hiking trails',
    time: '3 hours ago',
    status: 'approved'
  },
  {
    id: 3,
    user: {
      name: 'Mohamed Trabelsi',
      avatar: '/avatars/mohamed.jpg',
      fallback: 'MT'
    },
    action: 'commented',
    content: 'on historical fort photos',
    time: '5 hours ago',
    status: 'approved'
  },
  {
    id: 4,
    user: {
      name: 'Leila Kacem',
      avatar: '/avatars/leila.jpg',
      fallback: 'LK'
    },
    action: 'submitted',
    content: 'a restaurant review for Les Aiguilles',
    time: 'Yesterday at 15:30',
    status: 'rejected'
  },
  {
    id: 5,
    user: {
      name: 'Thomas Bernard',
      avatar: '/avatars/thomas.jpg',
      fallback: 'TB'
    },
    action: 'registered',
    content: 'as a new user',
    time: 'Yesterday at 09:15',
    status: 'none'
  }
];

// Sample data for analytics
const visitData: Record<TimeRange, VisitData[]> = {
  '7d': [
    { date: 'May 10', visits: 245, uniqueVisitors: 180 },
    { date: 'May 11', visits: 288, uniqueVisitors: 212 },
    { date: 'May 12', visits: 275, uniqueVisitors: 201 },
    { date: 'May 13', visits: 310, uniqueVisitors: 234 },
    { date: 'May 14', visits: 365, uniqueVisitors: 270 },
    { date: 'May 15', visits: 390, uniqueVisitors: 290 },
    { date: 'May 16', visits: 410, uniqueVisitors: 320 },
  ],
  '30d': Array.from({ length: 30 }, (_, i) => ({
    date: `May ${i + 1}`,
    visits: Math.floor(Math.random() * 300) + 200,
    uniqueVisitors: Math.floor(Math.random() * 200) + 150,
  })),
  '90d': Array.from({ length: 12 }, (_, i) => ({
    date: `Week ${i + 1}`,
    visits: Math.floor(Math.random() * 2000) + 1500,
    uniqueVisitors: Math.floor(Math.random() * 1500) + 1000,
  })),
  '12m': Array.from({ length: 12 }, (_, i) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      date: months[i],
      visits: Math.floor(Math.random() * 8000) + 5000,
      uniqueVisitors: Math.floor(Math.random() * 6000) + 3000,
    };
  }),
};

const popularLocations: LocationData[] = [
  { name: 'Tabarka Beach', visits: 1245, percentage: 22 },
  { name: 'Genoese Fort', visits: 952, percentage: 17 },
  { name: 'Coral Reef Diving Sites', visits: 845, percentage: 15 },
  { name: 'The Needles', visits: 742, percentage: 13 },
  { name: 'Tabarka Marina', visits: 624, percentage: 11 },
  { name: 'Other locations', visits: 1238, percentage: 22 },
];

const contentEngagement: ContentEngagementData[] = [
  { type: 'Photos', views: 5240, likes: 3150, comments: 412, shares: 128 },
  { type: 'Guides', views: 3180, likes: 1950, comments: 324, shares: 95 },
  { type: 'Reviews', views: 2840, likes: 1540, comments: 286, shares: 76 },
  { type: 'Events', views: 1520, likes: 890, comments: 145, shares: 42 },
];

const userEngagementData: Record<TimeRange, UserEngagementData[]> = {
  '7d': Array.from({ length: 7 }, (_, i) => ({
    date: `May ${i + 10}`,
    signups: Math.floor(Math.random() * 15) + 5,
    activeUsers: Math.floor(Math.random() * 100) + 150,
  })),
  '30d': Array.from({ length: 30 }, (_, i) => ({
    date: `May ${i + 1}`,
    signups: Math.floor(Math.random() * 10) + 3,
    activeUsers: Math.floor(Math.random() * 150) + 100,
  })),
  '90d': Array.from({ length: 12 }, (_, i) => ({
    date: `Week ${i + 1}`,
    signups: Math.floor(Math.random() * 60) + 20,
    activeUsers: Math.floor(Math.random() * 300) + 500,
  })),
  '12m': Array.from({ length: 12 }, (_, i) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      date: months[i],
      signups: Math.floor(Math.random() * 200) + 50,
      activeUsers: Math.floor(Math.random() * 1000) + 800,
    };
  }),
};

const contentDistribution: ContentDistributionData[] = [
  { name: 'Photos', value: 45, color: '#8884d8' },
  { name: 'Reviews', value: 25, color: '#82ca9d' },
  { name: 'Guides', value: 15, color: '#ffc658' },
  { name: 'Events', value: 10, color: '#ff8042' },
  { name: 'Stories', value: 5, color: '#0088fe' },
];

// Custom chart tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-md">
        <p className="font-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  // Stats cards data (summary metrics)
  const summaryStats = [
    {
      title: 'Total Visitors',
      value: '15,487',
      change: '+12.5%',
      trend: 'up',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: 'Page Views',
      value: '42,984',
      change: '+8.2%',
      trend: 'up',
      icon: <EyeIcon className="h-5 w-5" />,
    },
    {
      title: 'New Users',
      value: '1,324',
      change: '+22.4%',
      trend: 'up',
      icon: <Activity className="h-5 w-5" />,
    },
    {
      title: 'Content Submissions',
      value: '876',
      change: '-3.1%',
      trend: 'down',
      icon: <Camera className="h-5 w-5" />,
    },
  ];

  // Handler for time range change
  const handleTimeRangeChange = (value: TimeRange) => {
    setTimeRange(value);
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
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Site traffic, popular locations, and user engagement metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary stats cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-2 rounded-full ${
                    stat.trend === 'up' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className={stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground ml-1">vs previous period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main analytics dashboard tabs */}
        <Tabs defaultValue="traffic">
          <TabsList className="mb-4">
            <TabsTrigger value="traffic">
              <TrendingUp className="h-4 w-4 mr-2" />
              Traffic & Visitors
            </TabsTrigger>
            <TabsTrigger value="locations">
              <MapPin className="h-4 w-4 mr-2" />
              Popular Locations
            </TabsTrigger>
            <TabsTrigger value="engagement">
              <BarChartIcon className="h-4 w-4 mr-2" />
              User Engagement
            </TabsTrigger>
          </TabsList>

          {/* Traffic & Visitors Tab */}
          <TabsContent value="traffic">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-5">
              <Card className="lg:col-span-5">
                <CardHeader>
                  <CardTitle>Website Traffic</CardTitle>
                  <CardDescription>
                    Site visits and unique visitors over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={visitData[timeRange]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorUniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="visits" 
                          stroke="#8884d8" 
                          fillOpacity={1} 
                          fill="url(#colorVisits)"
                          name="Total Visits"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="uniqueVisitors" 
                          stroke="#82ca9d" 
                          fillOpacity={1} 
                          fill="url(#colorUniqueVisitors)"
                          name="Unique Visitors"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>
                    Where visitors are coming from
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Organic Search', value: 45, color: '#8884d8' },
                            { name: 'Social Media', value: 25, color: '#82ca9d' },
                            { name: 'Direct', value: 15, color: '#ffc658' },
                            { name: 'Referral', value: 10, color: '#ff8042' },
                            { name: 'Other', value: 5, color: '#0088fe' },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {contentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>
                    Visits by device type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Mobile', value: 65 },
                          { name: 'Desktop', value: 25 },
                          { name: 'Tablet', value: 10 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis unit="%" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="value" name="Percentage" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Popular Locations Tab */}
          <TabsContent value="locations">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Most Viewed Locations</CardTitle>
                  <CardDescription>
                    Popular spots visitors are interested in
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={popularLocations}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="visits" name="Visits" fill="#8884d8" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location Popularity</CardTitle>
                  <CardDescription>
                    Percentage distribution of views
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={popularLocations}
                          dataKey="percentage"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {popularLocations.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={[
                                '#8884d8', '#82ca9d', '#ffc658', 
                                '#ff8042', '#0088fe', '#00C49F'
                              ][index % 6]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Performance by Location</CardTitle>
                  <CardDescription>
                    Engagement metrics per location
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Tabarka Beach', photos: 245, reviews: 128, bookmarks: 89 },
                          { name: 'Genoese Fort', photos: 185, reviews: 95, bookmarks: 67 },
                          { name: 'Coral Reefs', photos: 165, reviews: 82, bookmarks: 58 },
                          { name: 'The Needles', photos: 145, reviews: 75, bookmarks: 52 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="photos" name="Photos" stackId="a" fill="#8884d8" />
                        <Bar dataKey="reviews" name="Reviews" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="bookmarks" name="Bookmarks" stackId="a" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Engagement Tab */}
          <TabsContent value="engagement">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>User Growth & Activity</CardTitle>
                  <CardDescription>
                    New signups and active users over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userEngagementData[timeRange]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="signups" 
                          name="New Signups" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="activeUsers" 
                          name="Active Users" 
                          stroke="#82ca9d" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Engagement</CardTitle>
                  <CardDescription>
                    Interactions by content type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={contentEngagement}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="views" name="Views" fill="#8884d8" />
                        <Bar dataKey="likes" name="Likes" fill="#82ca9d" />
                        <Bar dataKey="comments" name="Comments" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of content types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={contentDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {contentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}

// Stat Card Component
function StatCard({ stat }: { stat: StatCard }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.title}
        </CardTitle>
        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
          {stat.icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat.value}</div>
        <div className="flex items-center pt-1 text-xs">
          {stat.change > 0 ? (
            <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />
          )}
          <span className={stat.change > 0 ? 'text-green-500' : 'text-red-500'}>
            {Math.abs(stat.change)}%
          </span>
          <span className="text-muted-foreground ml-1">from last period</span>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          {stat.description}
        </div>
      </CardContent>
    </Card>
  );
} 