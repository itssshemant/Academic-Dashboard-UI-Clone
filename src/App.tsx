import { useState, useEffect } from 'react';
import { Toaster } from 'sonner@2.0.3';
import { supabase } from './utils/supabase/client';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { LoadingProvider } from './contexts/LoadingContext';
import { TopLoadingBar } from './components/TopLoadingBar';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DashboardContent } from './components/DashboardContent';
import { GradesPage } from './components/pages/GradesPage';
import { MyCourseListPage } from './components/pages/MyCourseListPage';
import { StudentRequestsPage } from './components/pages/StudentRequestsPage';
import { HostelRequestPage } from './components/pages/HostelRequestPage';
import { FeeDetailsPage } from './components/pages/FeeDetailsPage';
import { RegisterCoursesPage } from './components/pages/RegisterCoursesPage';
import { ProjectRegistrationPage } from './components/pages/ProjectRegistrationPage';
import { DualDegreePage } from './components/pages/DualDegreePage';
import { TADetailsPage } from './components/pages/TADetailsPage';

export type PageType = 'dashboard' | 'hostel' | 'courses' | 'fees' | 'project' | 'grades' | 'courselist' | 'dual' | 'ta' | 'requests';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  useEffect(() => {
    // One-time user creation on app load
    const createVanshUser = async () => {
      const userCreated = localStorage.getItem('vansh_user_created');
      if (!userCreated) {
        try {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-fa2e4b52/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: JSON.stringify({ 
              email: 'vansh25533@iiitd.ac.in', 
              password: 'vansh25533',
              name: 'Vansh Tomar'
            })
          });

          const data = await response.json();
          
          if (response.ok) {
            console.log('User created successfully:', data);
            localStorage.setItem('vansh_user_created', 'true');
          } else {
            // User might already exist, that's okay
            console.log('User creation response:', data);
            localStorage.setItem('vansh_user_created', 'true');
          }
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }
    };

    createVanshUser();

    // Check if user has an active session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        localStorage.setItem('access_token', session.access_token);
        setIsAuthenticated(true);
      } else {
        // Check for stored access token
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        localStorage.setItem('access_token', session.access_token);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_email');
        setIsAuthenticated(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleNavigate = (page: PageType) => {
    setIsNavigating(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsNavigating(false);
    }, 300);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent onNavigate={handleNavigate} />;
      case 'grades':
        return <GradesPage />;
      case 'courselist':
        return <MyCourseListPage />;
      case 'requests':
        return <StudentRequestsPage />;
      case 'hostel':
        return <HostelRequestPage />;
      case 'fees':
        return <FeeDetailsPage />;
      case 'courses':
        return <RegisterCoursesPage />;
      case 'project':
        return <ProjectRegistrationPage />;
      case 'dual':
        return <DualDegreePage />;
      case 'ta':
        return <TADetailsPage />;
      default:
        return <DashboardContent onNavigate={setCurrentPage} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" richColors />
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      <TopLoadingBar isLoading={isNavigating} />
      <Toaster position="top-right" richColors />
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-gray-50 pb-16 lg:pb-0">
          {renderPage()}
        </main>
        
        {/* Mobile Bottom Navigation */}
        <MobileBottomNav currentPage={currentPage} onNavigate={handleNavigate} />
      </div>
    </div>
  );
}