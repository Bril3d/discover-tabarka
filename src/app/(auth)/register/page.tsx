'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLocal, setIsLocal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    // Basic password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setIsLoading(true);

    try {
      const { error } = await signUp(email, password, fullName);
      
      if (error) {
        setError(error.message);
        return;
      }
      
      // Redirect to success page or login
      router.push('/register/success');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError('An error occurred with Google sign up. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-tabarka-blue-50 dark:bg-gray-900 flex items-center justify-center px-4 py-12">
      <motion.div 
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your Account</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Join our community and share your Tabarka adventures</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="isLocal"
                type="checkbox"
                checked={isLocal}
                onChange={(e) => setIsLocal(e.target.checked)}
                className="h-4 w-4 text-tabarka-blue-600 focus:ring-tabarka-blue-500 border-gray-300 dark:border-gray-700 rounded"
              />
              <label htmlFor="isLocal" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I am a local resident of Tabarka
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-tabarka-blue-600 hover:bg-tabarka-blue-700 text-white py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-tabarka-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                  fill="#4285F4"
                />
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-tabarka-blue-600 dark:text-tabarka-blue-400 hover:text-tabarka-blue-800 dark:hover:text-tabarka-blue-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
          
          <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-tabarka-blue-600 dark:text-tabarka-blue-400 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-tabarka-blue-600 dark:text-tabarka-blue-400 hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
        
        {/* Decorative wave pattern at bottom */}
        <div className="h-12 bg-gradient-to-r from-tabarka-blue-500 to-tabarka-blue-600 relative overflow-hidden">
          <svg
            className="absolute bottom-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              className="text-white dark:text-gray-800"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,256C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </motion.div>
    </div>
  );
} 