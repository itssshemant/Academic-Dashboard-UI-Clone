import { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

type TabType = 'events' | 'calendar';

const upcomingEvents = [
  {
    id: 1,
    title: 'Course Registration Deadline',
    date: 'January 09, 2026',
    time: '11:59 PM',
    location: 'Online Portal',
    type: 'Registration'
  },
];

export function EventsWidget() {
  const [activeTab, setActiveTab] = useState<TabType>('events');

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'events'
              ? 'bg-indigo-700 text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          Upcoming / Ongoing Events
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'calendar'
              ? 'bg-indigo-700 text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          My Calendar
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'events' ? (
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                    {event.type}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="w-3.5 h-3.5 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock className="w-3.5 h-3.5 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="w-3.5 h-3.5 mr-2" />
                    {event.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No calendar events to display</p>
            <p className="text-xs text-gray-400 mt-1">Your personal calendar will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}