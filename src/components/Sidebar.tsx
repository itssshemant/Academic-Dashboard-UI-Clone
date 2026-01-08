import { 
  LayoutDashboard, 
  Home, 
  BookOpen, 
  CreditCard, 
  FolderKanban, 
  GraduationCap, 
  BookMarked, 
  Users, 
  ClipboardList, 
  FileText,
  Search,
  X
} from 'lucide-react';
import logo from 'figma:asset/d54fdb9c2fb0c7d2dbec35ce6b388ea5a264634f.png';
import { PageType } from '/App';

const menuItems = [
  { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'hostel' as PageType, label: 'Hostel Request', icon: Home },
  { id: 'courses' as PageType, label: 'Register for Courses', icon: BookOpen },
  { id: 'fees' as PageType, label: 'My Fee Details', icon: CreditCard },
  { id: 'project' as PageType, label: 'Project Registration', icon: FolderKanban },
  { id: 'grades' as PageType, label: 'Grades', icon: GraduationCap },
  { id: 'courselist' as PageType, label: 'My Course List', icon: BookMarked },
  { id: 'dual' as PageType, label: 'Dual Degree', icon: Users },
  { id: 'ta' as PageType, label: 'TA Details', icon: ClipboardList },
  { id: 'requests' as PageType, label: 'Student Requests', icon: FileText },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export function Sidebar({ isOpen, onClose, currentPage, onNavigate }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Logo & Close Button */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="IIIT-Delhi Logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="font-semibold text-gray-900">IIIT DELHI</div>
                <div className="text-xs text-gray-500">Student Portal</div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                        transition-colors duration-150
                        ${currentPage === item.id
                          ? 'bg-indigo-50 text-indigo-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}