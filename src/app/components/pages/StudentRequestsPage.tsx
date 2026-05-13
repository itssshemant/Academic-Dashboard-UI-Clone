import { Plus, FileX } from 'lucide-react';
import { toast } from 'sonner';

export function StudentRequestsPage() {
  const handleNewRequest = () => {
    toast.success('New request form opened!', {
      description: 'Fill in the details to submit your request.'
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Student Requests</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Submit and track your requests</p>
          </div>
          <button 
            onClick={handleNewRequest}
            className="flex items-center space-x-2 bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors text-sm w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
          <div className="rounded-full bg-gray-100 p-6 mb-6">
            <FileX className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 text-center">No Requests to Track</h3>
          <p className="text-sm sm:text-base text-gray-500 text-center max-w-md mb-6">
            You haven't submitted any requests yet. Click the "New Request" button to create your first request.
          </p>
          <button 
            onClick={handleNewRequest}
            className="flex items-center space-x-2 bg-indigo-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-indigo-800 transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Submit Your First Request</span>
          </button>
        </div>
      </div>
    </div>
  );
}