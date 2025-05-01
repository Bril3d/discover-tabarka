'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    BarChart3,
    Users,
    ImageIcon,
    FilePenLine,
    Bell,
    LogOut,
    Menu,
    ChevronDown,
    Settings,
    User
} from 'lucide-react';

// Admin navigation items
const navItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Overview and statistics'
  },
  {
    title: 'User Management',
    href: '/admin/users',
    icon: <Users className="w-5 h-5" />,
    description: 'Manage users and permissions'
  },
  {
    title: 'Content Moderation',
    href: '/admin/moderation',
    icon: <ImageIcon className="w-5 h-5" />,
    description: 'Review and approve content',
    badge: 12
  },
  {
    title: 'Content Editor',
    href: '/admin/editor',
    icon: <FilePenLine className="w-5 h-5" />,
    description: 'Create and edit content'
  },
  {
    title: 'Notifications',
    href: '/admin/notifications',
    icon: <Bell className="w-5 h-5" />,
    description: 'System notifications',
    badge: 5
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: <Settings className="w-5 h-5" />,
    description: 'Admin settings'
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsive sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-muted/10 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isMobile ? 0 : 280 }}
        animate={{ width: isSidebarOpen ? 280 : (isMobile ? 0 : 80) }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-card dark:bg-card fixed top-0 left-0 h-full border-r border-border z-50 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 flex justify-between items-center h-16 border-b border-border">
            <motion.div
              animate={{ opacity: isSidebarOpen ? 1 : 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
                DT
              </div>
              {isSidebarOpen && (
                <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
              )}
            </motion.div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="lg:flex hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow overflow-y-auto py-4 flex flex-col justify-between">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} passHref>
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className={`w-full justify-start ${
                        isSidebarOpen ? 'py-3' : 'justify-center py-3'
                      } relative group`}
                    >
                      <span className="flex items-center">
                        {item.icon}
                        {isSidebarOpen && (
                          <motion.span 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="ml-3"
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </span>

                      {/* Badge */}
                      {item.badge && (
                        <Badge 
                          variant="destructive" 
                          className={`${isSidebarOpen ? 'absolute right-3' : 'absolute -top-1 -right-1'} transition-all bg-destructive text-destructive-foreground`}
                        >
                          {item.badge}
                        </Badge>
                      )}

                      {/* Tooltip for collapsed sidebar */}
                      {!isSidebarOpen && (
                        <div className="absolute left-full ml-6 rounded-md px-2 py-1 bg-popover dark:bg-popover/90 text-popover-foreground shadow-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <div className="absolute w-0 h-0 -left-2 top-[50%] transform -translate-y-[50%]">
                            <div className="w-2 h-2 bg-popover rotate-45 dark:bg-popover/90"></div>
                          </div>
                          <div>{item.title}</div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          )}
                        </div>
                      )}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>

            {/* User profile section */}
            <div className="mt-auto pt-4 border-t border-border px-2">
              <div className={`p-2 ${isSidebarOpen ? 'flex items-center' : 'flex flex-col items-center'}`}>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatar.png" alt="Admin User" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                
                {isSidebarOpen && (
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                    <p className="text-xs text-muted-foreground truncate">admin@discover-tabarka.com</p>
                  </div>
                )}

                {isSidebarOpen && (
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {isSidebarOpen && (
                <div className="mt-2 px-2 grid grid-cols-2 gap-1">
                  <Button variant="outline" className="w-full text-xs" size="sm">
                    <User className="h-3 w-3 mr-1" />
                    Profile
                  </Button>
                  <Button variant="outline" className="w-full text-xs" size="sm">
                    <LogOut className="h-3 w-3 mr-1" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </motion.aside>

      {/* Mobile sidebar toggle */}
      {isMobile && !isSidebarOpen && (
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-4 left-4 z-50 rounded-full w-12 h-12 shadow-lg"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Main content */}
      <main 
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen 
            ? 'lg:ml-[280px] ml-0' 
            : isMobile 
              ? 'ml-0' 
              : 'lg:ml-[80px] ml-0'
        }`}
      >
        {/* Page content */}
        <div className="min-h-screen p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 