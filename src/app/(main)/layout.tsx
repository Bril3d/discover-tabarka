'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageTransition } from '@/components/ui/page-transition';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-background text-foreground">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </>
  );
} 