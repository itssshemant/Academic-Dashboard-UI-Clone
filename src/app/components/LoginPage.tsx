import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase/client';
import bgImage from '../../imports/download-1.jpg';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) {
        toast.error('Google Sign-In Error', { description: error.message });
      }
    } catch {
      toast.error('Error', { description: 'An unexpected error occurred during Google Sign-In' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Validation Error', { description: 'Please enter both username and password' });
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });
      if (error) {
        toast.error('Login Failed', { description: error.message });
      } else if (data.session) {
        toast.success('Login Successful!', { description: 'Welcome to IIIT-Delhi ERP' });
        localStorage.setItem('access_token', data.session.access_token);
        localStorage.setItem('user_email', username);
        onLoginSuccess();
      }
    } catch {
      toast.error('Error', { description: 'An unexpected error occurred during login' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Login Card */}
      <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-2xl px-8 py-8">

        {/* Logo + Institute name */}
        <div className="flex flex-col items-center mb-2">
          <img
            src="https://i.postimg.cc/T1wxs2Zd/style1colorlarge_(1).png"
            alt="IIIT-Delhi Logo"
            className="h-12 object-contain mb-1.5"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://i.postimg.cc/RhFmYCjC/style3colorlarge.jpg';
            }}
          />
          <p className="text-[9.5px] text-gray-500 tracking-widest text-center font-medium leading-snug uppercase">
            Indraprastha Institute of<br />Information Technology Delhi
          </p>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-4" />

        {/* Heading */}
        <h1 className="text-base font-semibold text-gray-800 text-center mb-4">
          Sign-In to your ERP
        </h1>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2.5 border border-gray-300 rounded-md px-3 py-2.5 hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3 bg-white shadow-sm"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-xs font-medium text-gray-700">Sign in with Google</span>
        </button>

        {/* Info text */}
        <p className="text-[10px] text-gray-500 leading-relaxed mb-4 text-left">
          Please log in using Google Sign In with your IIITD email ID for accessing the ERP system.
          The below username and password is only for some specific users.
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-[11px] font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400 bg-white transition-shadow"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 pr-9 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400 bg-white transition-shadow"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold px-10 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? 'Logging in…' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
