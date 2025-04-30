'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        return;
      }
      
      // Redirect to home page on successful login
      router.push('/');
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
      setError('An error occurred with Google sign in. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-tabarka-blue-50 flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to continue your Tabarka adventure</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-tabarka-blue-600 hover:text-tabarka-blue-800 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-tabarka-blue-500 focus:border-tabarka-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-tabarka-blue-600 text-white py-2 px-4 rounded-lg hover:bg-tabarka-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-tabarka-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="relative flex items-center justify-center mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              Or continue with
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full border border-gray-300 bg-white text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-tabarka-blue-500 focus:ring-offset-2 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
                  fill="#4285F4"
                />
                <path
                  d="M5.01 7.83l2.66 1.98C8.69 7.38 10.28 6 12.1 6c1.81 0 3.43.88 4.2 2.24l2.66-2.23C17.21 4.09 14.85 2 12.09 2c-3.99 0-7.29 3.24-8.54 7.83h1.46z"
                  fill="#EA4335"
                />
                <path
                  d="M12.1 22c3.1 0 5.5-1.25 7.11-3.37l-3.1-2.41c-.95 1.33-2.38 2.12-4.01 2.12-3.16 0-5.62-2.13-6.53-4.98H2l-3.06 2.39C3.11 19.3 7.12 22 12.1 22z"
                  fill="#34A853"
                />
                <path
                  d="M5.57 13.36c-.25-.72-.38-1.49-.38-2.27 0-.79.14-1.55.38-2.27V6.35H2.58c-.78 1.57-1.23 3.33-1.23 5.18 0 1.96.4 3.78 1.23 5.36l3.01-2.36-.02-1.17z"
                  fill="#FBBC05"
                />
              </svg>
              Sign in with Google
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-tabarka-blue-600 hover:text-tabarka-blue-800 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
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
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,256C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </motion.div>
    </div>
  );
} 