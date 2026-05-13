import { LayoutDashboard, GraduationCap, BookMarked, FileText, Home } from 'lucide-react';
import { PageType } from '/App';

const navItems = [
  { id: 'dashboard' as PageType, label: 'Home', icon: LayoutDashboard },
  { id: 'grades' as PageType, label: 'Grades', icon: GraduationCap },
  { id: 'courselist' as PageType, label: 'Courses', icon: BookMarked },
  { id: 'hostel' as PageType, label: 'Hostel', icon: Home },
  { id: 'requests' as PageType, label: 'More', icon: FileText },
];

interface MobileBottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function MobileBottomNav({ currentPage, onNavigate }: MobileBottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg transition-colors
                ${isActive 
                  ? 'text-indigo-700' 
                  : 'text-gray-600 active:bg-gray-100'
                }
              `}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-2' : 'stroke-1.5'}`} />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
