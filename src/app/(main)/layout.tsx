import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-white dark:bg-gray-950">
        {children}
      </main>
      <Footer />
    </>
  );
} 