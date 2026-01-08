import { Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { CourseListPDF } from './CourseListPDF';

export function MyCourseListPage() {
  const [selectedSemester, setSelectedSemester] = useState('Semester 2');
  const [showPDF, setShowPDF] = useState(false);

  const semester1Courses = [
    { slNo: 1, courseName: 'MTH100-Maths I-Lecture-4', courseType: 'Mandatory (Core)', creditAudit: 'Credit', credit: 4, semester: 'Semester 1' },
    { slNo: 2, courseName: 'COM101-Communication Skills-Lecture-4', courseType: 'Mandatory (Core)', creditAudit: 'Credit', credit: 4, semester: 'Semester 1' },
    { slNo: 3, courseName: 'CSE101-Introduction to Programming-Lecture-4', courseType: 'Mandatory (Core)', creditAudit: 'Credit', credit: 4, semester: 'Semester 1' },
    { slNo: 4, courseName: 'DES102-Introduction to HCI-Lecture-4', courseType: 'Mandatory (Core)', creditAudit: 'Credit', credit: 4, semester: 'Semester 1' },
    { slNo: 5, courseName: 'ECE111-Digital Circuits-Lecture-4', courseType: 'Mandatory (Core)', creditAudit: 'Credit', credit: 4, semester: 'Semester 1' },
  ];

  const semester2Courses = [
    { slNo: 1, courseName: 'ECO201-Principles Of Economics', courseType: 'Open Elective', creditAudit: 'Credit', credit: 4, semester: 'Semester 2' },
    { slNo: 2, courseName: 'CSE102-Data Structures and Algorithms', courseType: 'Department Elective', creditAudit: 'Credit', credit: 4, semester: 'Semester 2' },
    { slNo: 3, courseName: 'CSE112-Computer Organization', courseType: 'Department Elective', creditAudit: 'Credit', credit: 4, semester: 'Semester 2' },
    { slNo: 4, courseName: 'ECE111-Basic Electronics', courseType: 'Open Elective', creditAudit: 'Credit', credit: 4, semester: 'Semester 2' },
    { slNo: 5, courseName: 'MTH201-Probability and Statistics', courseType: 'Department Elective', creditAudit: 'Credit', credit: 4, semester: 'Semester 2' },
  ];

  const courses = selectedSemester === 'Semester 1' ? semester1Courses : semester2Courses;

  const handleDownloadReport = () => {
    setShowPDF(true);
  };

  const handleSave = () => {
    toast.success('Changes saved successfully!', {
      description: 'Your course selection has been updated.'
    });
  };

  const handleFetchCourses = () => {
    toast.success('Courses fetched successfully!', {
      description: `Loaded courses for ${selectedSemester}.`
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* PDF Modal */}
      {showPDF && (
        <CourseListPDF 
          courses={courses}
          semester={selectedSemester}
          onClose={() => setShowPDF(false)} 
        />
      )}

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm text-blue-800">
          The Course registration end date: 2026-01-09 23:59:59.999. Registered course PDF will be emailed to download only when minimum credit/courses criteria is fulfilled (for approved courses only).
        </p>
      </div>

      {/* Registered Courses Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-indigo-900 text-white px-3 sm:px-6 py-2 sm:py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <h2 className="font-medium text-sm sm:text-base">Registered Courses</h2>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={handleSave}
              className="bg-indigo-700 hover:bg-indigo-600 px-3 sm:px-4 py-1.5 rounded text-xs sm:text-sm transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleDownloadReport}
              className="bg-indigo-700 hover:bg-indigo-600 px-3 sm:px-4 py-1.5 rounded text-xs sm:text-sm transition-colors flex items-center space-x-1"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">download Registered Courses report</span>
              <span className="sm:hidden">Download</span>
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-6">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <label className="text-xs sm:text-sm text-red-600">Batch / Term Code</label>
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="border border-gray-300 rounded px-2 sm:px-3 py-1.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
            >
              <option>Semester 2</option>
              <option>Semester 1</option>
            </select>
            <button 
              onClick={handleFetchCourses}
              className="bg-indigo-900 text-white px-3 sm:px-4 py-1.5 rounded text-xs sm:text-sm hover:bg-indigo-800 transition-colors w-full sm:w-auto"
            >
              fetch courses
            </button>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3">
            {courses.map((course) => (
              <div key={course.slNo} className="border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-gray-900 flex-1 pr-2">{course.courseName}</p>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{course.slNo}</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><span className="font-medium">Type:</span> {course.courseType}</p>
                  <p><span className="font-medium">Credit/Audit:</span> {course.creditAudit}</p>
                  <p><span className="font-medium">Credit:</span> {course.credit}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700">Sl No.</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700">Course Name</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700">Course Type</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700">Credit/Audit</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.slNo} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{course.slNo}</td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{course.courseName}</td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{course.courseType}</td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{course.creditAudit}</td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900">{course.credit}</td>
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