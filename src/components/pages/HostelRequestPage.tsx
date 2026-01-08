import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function HostelRequestPage() {
  const [formData, setFormData] = useState({
    requestType: 'Room Change Request',
    preferredBlock: 'Block A',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reason.trim()) {
      toast.error('Please provide a reason for your request');
      return;
    }

    // Simulate submission
    toast.success('Hostel request submitted successfully!', {
      description: 'Your request will be reviewed within 2-3 business days.'
    });
    
    // Reset form
    setFormData({
      requestType: 'Room Change Request',
      preferredBlock: 'Block A',
      reason: ''
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Hostel Room Request</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Apply for hostel accommodation</p>
        </div>

        <div className="p-4 sm:p-6">
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-green-700 uppercase mb-2">Current Status</p>
                <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-2 sm:mb-3">Hostel Already Allocated</h3>
                <div className="space-y-1">
                  <p className="text-base sm:text-lg text-green-800">
                    <span className="font-semibold">Hostel:</span> H2
                  </p>
                  <p className="text-base sm:text-lg text-green-800">
                    <span className="font-semibold">Room:</span> 407
                  </p>
                </div>
              </div>
              <div className="text-green-600 self-center">
                <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Request Type</label>
              <select 
                value={formData.requestType}
                onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Room Change Request</option>
                <option>New Hostel Allocation</option>
                <option>Room Repair Request</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Preferred Block</label>
              <select 
                value={formData.preferredBlock}
                onChange={(e) => setFormData({ ...formData, preferredBlock: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Block A</option>
                <option>Block B</option>
                <option>Block C</option>
                <option>Block D</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Reason for Request</label>
              <textarea 
                rows={4}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Please provide a reason for your request..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => setFormData({ requestType: 'Room Change Request', preferredBlock: 'Block A', reason: '' })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}