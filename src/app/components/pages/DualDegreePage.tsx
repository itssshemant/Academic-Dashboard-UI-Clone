import { toast } from 'sonner';

export function DualDegreePage() {
  const handleApply = () => {
    toast.success('Application submitted successfully!', {
      description: 'Your dual degree application is under review. You will be notified via email.'
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Dual Degree Program</h2>
          <p className="text-sm text-gray-500 mt-1">Information about dual degree options</p>
        </div>

        <div className="p-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-indigo-900 mb-2">Program Overview</h3>
            <p className="text-sm text-indigo-800">
              The Dual Degree Program allows students to pursue both B.Tech and M.Tech degrees in an integrated manner, 
              typically completed in 5 years instead of 6 years when pursued separately.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Eligibility Criteria</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                <li>Minimum CGPA of 8.0 at the end of 3rd semester</li>
                <li>No backlogs in core courses</li>
                <li>Approval from faculty advisor</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Available Specializations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Computer Science & AI</h4>
                  <p className="text-sm text-gray-600 mt-1">Focus on Machine Learning and Deep Learning</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Data Science & Analytics</h4>
                  <p className="text-sm text-gray-600 mt-1">Statistical modeling and big data</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Cyber Security</h4>
                  <p className="text-sm text-gray-600 mt-1">Network security and cryptography</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900">Software Systems</h4>
                  <p className="text-sm text-gray-600 mt-1">Advanced software engineering</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Application Period:</strong> Applications open in July for eligible students
              </p>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleApply}
                className="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800"
              >
                Apply for Dual Degree
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}