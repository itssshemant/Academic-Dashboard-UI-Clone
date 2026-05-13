import { UserX, Info } from 'lucide-react';

export function TADetailsPage() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Teaching Assistant Details</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Your TA assignments and responsibilities</p>
        </div>

        {/* Not Eligible State */}
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
          <div className="rounded-full bg-red-50 p-6 mb-6">
            <UserX className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 text-center">Not Eligible for TA Program</h3>
          <p className="text-sm sm:text-base text-gray-600 text-center max-w-md mb-6">
            You are currently not eligible for the Teaching Assistant program. Eligibility is typically based on academic performance and semester standing.
          </p>
          
          {/* Eligibility Info Card */}
          <div className="w-full max-w-lg bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-blue-900 mb-2">Eligibility Criteria</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-blue-800">
                  <li>• Minimum CGPA of 7.5 or higher</li>
                  <li>• Must be in 3rd semester or above</li>
                  <li>• Good academic standing with no disciplinary issues</li>
                  <li>• Recommendation from a faculty member</li>
                </ul>
                <p className="text-xs sm:text-sm text-blue-700 mt-3">
                  Contact the Academic Office for more information about TA eligibility requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}