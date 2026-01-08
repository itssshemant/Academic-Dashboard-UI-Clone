import { LucideIcon } from 'lucide-react';
import { PageType } from '/App';

interface FrequentlyUsedCardProps {
  id: PageType;
  title: string;
  icon: LucideIcon;
  description: string;
  onNavigate: (page: PageType) => void;
}

export function FrequentlyUsedCard({ id, title, icon: Icon, description, onNavigate }: FrequentlyUsedCardProps) {
  return (
    <button 
      onClick={() => onNavigate(id)}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 group"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
          <Icon className="w-6 h-6 text-indigo-700" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 text-sm mb-1">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );
}