import { Bell, Mail, Menu, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../utils/supabase/client';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const handleNotifications = () => {
    toast.info('Notifications', {
      description: 'You have 3 new notifications: Course registration reminder, Fee payment confirmation, and Hostel allocation update.'
    });
  };

  const handleMail = () => {
    toast.info('Messages', {
      description: 'You have 2 unread messages from Academic Office and Course Coordinator.'
    });
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_email');
      toast.success('Logged out successfully');
      // Reload the page to reset the app state
      window.location.reload();
    } catch (error) {
      toast.error('Error logging out', {
        description: 'Please try again'
      });
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Left: Greeting */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-gray-900 flex-shrink-0"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
              Welcome, Vansh Tomar!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 hidden sm:block">
              Last login: Wednesday, January 7, 2026 at 10:45 AM
            </p>
          </div>
        </div>

        {/* Right: Icons & Profile */}
        <div className="flex items-center space-x-1 sm:space-x-4 flex-shrink-0">
          <button 
            onClick={handleNotifications}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={handleMail}
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
          >
            <Mail className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>

          <button 
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors hidden sm:block"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
          
          <ImageWithFallback 
            src="figma:asset/528e1afbb8972e8e2e7979ec1531b2e6d548480f.png" 
            alt="Vansh Tomar" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-indigo-200"
          />
        </div>
      </div>
    </header>
  );
}