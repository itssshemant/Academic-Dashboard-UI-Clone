import { FrequentlyUsedCard } from './FrequentlyUsedCard';
import { EventsWidget } from './EventsWidget';
import { 
  BookMarked, 
  GraduationCap, 
  FileText, 
  Home, 
  CreditCard 
} from 'lucide-react';
import { PageType } from '/App';

const frequentlyUsedApps = [
  { 
    id: 'courselist' as PageType, 
    title: 'My Course List', 
    icon: BookMarked,
    description: 'View enrolled courses'
  },
  { 
    id: 'grades' as PageType, 
    title: 'Grades', 
    icon: GraduationCap,
    description: 'Check your grades'
  },
  { 
    id: 'requests' as PageType, 
    title: 'Student Requests', 
    icon: FileText,
    description: 'Submit requests'
  },
  { 
    id: 'hostel' as PageType, 
    title: 'Hostel Request', 
    icon: Home,
    description: 'Manage hostel booking'
  },
  { 
    id: 'fees' as PageType, 
    title: 'My Fee Details', 
    icon: CreditCard,
    description: 'View fee status'
  },
];

interface DashboardContentProps {
  onNavigate: (page: PageType) => void;
}

export function DashboardContent({ onNavigate }: DashboardContentProps) {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Frequently Used Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
          Frequently Used Apps & Services
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {frequentlyUsedApps.map((app) => (
            <FrequentlyUsedCard key={app.id} {...app} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* Events Widget */}
      <div className="flex justify-center lg:justify-end">
        <div className="w-full lg:w-96">
          <EventsWidget />
        </div>
      </div>
    </div>
  );
}