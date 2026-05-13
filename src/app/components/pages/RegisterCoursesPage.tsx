import { Search, FileText } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { CourseRegistrationPDF } from './CourseRegistrationPDF';

export function RegisterCoursesPage() {
  const [showPDF, setShowPDF] = useState(false);

  const registeredCourses = [
    { slNo: 1, courseName: 'ECO201-Principles Of Economics', courseType: 'Open Elective', creditAudit: 'Credit', credit: 4 },
    { slNo: 2, courseName: 'CSE102-Data Structures and Algorithms', courseType: 'Department Elective', creditAudit: 'Credit', credit: 4 },
    { slNo: 3, courseName: 'CSE112-Computer Organization', courseType: 'Department Elective', creditAudit: 'Credit', credit: 4 },
    { slNo: 4, courseName: 'ECE111-Basic Electronics', courseType: 'Open Elective', creditAudit: 'Credit', credit: 4 },
    { slNo: 5, courseName: 'MTH201-Probability and Statistics', courseType: 'Department Elective', creditAudit: 'Credit', credit: 4 },
  ];

  const availableCourses = [
    { code: 'CSE301', name: 'Operating Systems', credits: 4, instructor: 'Dr. Kumar', slots: 'Mon-Wed 10:00-11:30' },
    { code: 'CSE302', name: 'Database Management Systems', credits: 4, instructor: 'Dr. Patel', slots: 'Tue-Thu 14:00-15:30' },
    { code: 'CSE303', name: 'Computer Networks', credits: 4, instructor: 'Dr. Mehta', slots: 'Mon-Wed 14:00-15:30' },
    { code: 'MTH301', name: 'Probability and Statistics', credits: 4, instructor: 'Dr. Reddy', slots: 'Tue-Thu 10:00-11:30' },
  ];

  const handleRegister = (courseName: string) => {
    toast.success('Course registered successfully!', {
      description: `You have been registered for ${courseName}`
    });
  };

  const handlePrintPDF = () => {
    setShowPDF(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* PDF Modal */}
      {showPDF && (
        <CourseRegistrationPDF 
          courses={registeredCourses} 
          onClose={() => setShowPDF(false)} 
        />
      )}

      {/* Reminder Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>Reminder:</strong> The Course registration end date: 2026-01-09 23:59:59.999. Registered course PDF will be enabled to download only when minimum credit/courses criteria is fulfilled (for approved courses only).
        </p>
      </div>

      {/* Registered Courses Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
        <div className="bg-indigo-900 text-white px-6 py-3 flex justify-between items-center">
          <h2 className="font-medium">Registered Courses</h2>
          <button
            onClick={handlePrintPDF}
            className="bg-indigo-700 hover:bg-indigo-600 px-4 py-1.5 rounded text-sm transition-colors flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generate PDF</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Sl No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Course Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Course Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Credit/Audit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Credit</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {registeredCourses.map((course, index) => (
                <tr key={course.slNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.slNo}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.courseName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.courseType}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.creditAudit}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{course.credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
          <p className="text-sm text-blue-800">
            All The Courses You Have Pre-registered Are Available. Please Take A Print Out By Clicking On PDF Button.
          </p>
        </div>
      </div>

      {/* Available Courses for Registration */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Available Courses for Registration</h2>
          <p className="text-sm text-gray-500 mt-1">Semester 3 - 2026-27</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Course Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Course Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Credits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Instructor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Slots</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {availableCourses.map((course) => (
                  <tr key={course.code} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-indigo-700">{course.code}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{course.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{course.credits}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{course.instructor}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{course.slots}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => handleRegister(course.name)}
                        className="text-sm text-indigo-700 hover:text-indigo-900 font-medium"
                      >
                        Register
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}