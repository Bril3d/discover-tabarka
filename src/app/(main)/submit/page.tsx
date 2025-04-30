'use client';

import { useAuth } from '@/hooks/useAuth';
import ContentSubmissionForm from '@/components/features/ContentSubmissionForm';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SubmitPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If not logged in and not loading, show login prompt
  if (!loading && !user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h1>
            <p className="text-gray-600 mb-6">
              You need to be logged in to share your experiences about Tabarka.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/login"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-tabarka-blue-600 hover:bg-tabarka-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tabarka-blue-500"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tabarka-blue-500"
              >
                Create Account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Share Your Tabarka Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-xl mx-auto"
          >
            Help others discover the beauty of Tabarka by sharing your photos, videos, and stories.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ContentSubmissionForm
            onSuccess={() => {
              // Redirect after successful submission if needed
              // router.push('/thank-you');
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center text-gray-600 text-sm"
        >
          <p>
            By submitting content, you agree to our{' '}
            <Link href="/terms" className="text-tabarka-blue-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-tabarka-blue-600 hover:underline">
              Content Guidelines
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
} 