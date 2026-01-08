import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `https://${projectId}.supabase.co/auth/v1/callback`,
        }
      });

      if (error) {
        toast.error('Google Sign-In Error', {
          description: error.message
        });
      }
    } catch (error) {
      toast.error('Error', {
        description: 'An unexpected error occurred during Google Sign-In'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Validation Error', {
        description: 'Please enter both username and password'
      });
      return;
    }

    setIsLoading(true);

    try {
      // Try to sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        toast.error('Login Failed', {
          description: error.message
        });
      } else if (data.session) {
        toast.success('Login Successful!', {
          description: 'Welcome to IIIT-Delhi ERP'
        });
        // Store session in localStorage
        localStorage.setItem('access_token', data.session.access_token);
        localStorage.setItem('user_email', username);
        onLoginSuccess();
      }
    } catch (error) {
      toast.error('Error', {
        description: 'An unexpected error occurred during login'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Login Form */}
        <div className="p-6 sm:p-8 md:p-12">
          {/* Logo */}
          <div className="mb-6 sm:mb-8 text-center">
            <ImageWithFallback
              src="figma:asset/97c2a527215d4815f31fb2d6d63560240c905711.png"
              alt="IIIT-Delhi"
              className="h-16 sm:h-20 mx-auto mb-3 sm:mb-4 object-contain"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Sign-in to your ERP</h1>
            <p className="text-xs sm:text-sm text-gray-600">Indraprastha Institute of Information Technology, Delhi</p>
          </div>

          {/* Google Sign-In */}
          <div className="mb-4 sm:mb-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 sm:space-x-3 bg-white border-2 border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium text-gray-700">Sign in with Google</span>
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Please use Google Sign-In with your IIIT-D email ID to login
            </p>
          </div>

          {/* Divider */}
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-3 sm:px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Username / Email
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-700 text-white font-medium py-2.5 sm:py-3 rounded-lg hover:bg-indigo-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-4 sm:mt-6 text-center space-y-2">
            <a href="#" className="text-xs sm:text-sm text-indigo-700 hover:text-indigo-900 block">
              Forgot Password?
            </a>
            <p className="text-xs text-gray-500">
              Need help? Contact IT Support at support@iiitd.ac.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}