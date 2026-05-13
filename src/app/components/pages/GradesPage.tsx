import { Printer, Download, Mail, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { GradesPDF } from './GradesPDF';

const semester2Courses = [
  {
    slNo: 1,
    course: 'MTH201-Probability and Statistics-Lecture-',
    courseType: 'Mandatory (Core)',
    credit: 4,
    grade: 'C',
    gradePoint: 5
  },
  {
    slNo: 2,
    course: 'CSE102-Data Structures and Algorithms-Lecture-',
    courseType: 'Mandatory (Core)',
    credit: 4,
    grade: 'B+',
    gradePoint: 8
  },
  {
    slNo: 3,
    course: 'CSE112-Computer Organization-Lecture-',
    courseType: 'Mandatory (Core)',
    credit: 4,
    grade: 'B',
    gradePoint: 7
  },
  {
    slNo: 4,
    course: 'ECO201-Principles Of Economics-Lecture-',
    courseType: 'Mandatory (Core)',
    credit: 4,
    grade: 'B',
    gradePoint: 7
  },
  {
    slNo: 5,
    course: 'ECE111-Basic Electronics-Lecture-',
    courseType: 'Mandatory (Core)',
    credit: 4,
    grade: 'C+',
    gradePoint: 6
  }
];

const semester1Courses = [
  {
    slNo: 1,
    course: 'COM101-Communication Skills-Lecture-',
    courseType: 'Mandatory (Core)',
    credit: 4,
    grade: 'B-',
    gradePoint: 7
  },
  {
    slNo: 2,
    course: 'CSE101-Introduction to Programming-Lecture-',
    courseType: 'Mandatory (Core)',
    credit: 4,
    grade: 'B-',
    gradePoint: 7
  },
  {
    slNo: 3,
    course: 'DES102-Introduction to HCI-Lecture-',
    courseType: 'Mandatory (Core)',
    credit: 4,
    grade: 'B-',
    gradePoint: 7
  },
  {
    slNo: 4,
    course: 'ECE111-Digital Circuits-Lecture-',
    courseType: 'Mandatory (Core)',
    credit: 4,
    grade: 'C',
    gradePoint: 5
  },
  {
    slNo: 5,
    course: 'MTH100-Maths I-Lecture-',
    courseType: 'Mandatory (Core)',
    credit: 4,
    grade: 'D',
    gradePoint: 4
  }
];

export function GradesPage() {
  const [showPDF, setShowPDF] = useState(false);

  const handlePrint = () => {
    setShowPDF(true);
  };

  const handleDownload = () => {
    toast.success('Grade report downloaded!', {
      description: 'Your grade report has been saved as PDF.'
    });
  };

  const handleEmail = () => {
    toast.success('Grade report emailed!', {
      description: 'Your grade report has been sent to your registered email.'
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* PDF Modal */}
      {showPDF && (
        <GradesPDF
          semester1Courses={semester1Courses}
          semester2Courses={semester2Courses}
          onClose={() => setShowPDF(false)}
        />
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-end gap-2 mb-4 sm:mb-6">
        <button 
          onClick={handlePrint}
          className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition-colors text-sm" 
          title="Print"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Generate PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
        <button 
          onClick={handleDownload}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
          title="Download"
        >
          <Download className="w-5 h-5 text-gray-700" />
        </button>
        <button 
          onClick={handleEmail}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors" 
          title="Email"
        >
          <Mail className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Status Message */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm text-gray-700">Student status is active.</p>
      </div>

      {/* Semester 1 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 sm:mb-6">
        <div className="bg-indigo-900 text-white px-3 sm:px-4 py-2 sm:py-3">
          <h2 className="text-sm sm:text-base font-medium">July 2025-B.Tech/CSE-IIITD/Semester 1</h2>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden divide-y divide-gray-200">
          {semester1Courses.map((course) => (
            <div key={course.slNo} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <p className="text-sm font-medium text-gray-900">{course.course}</p>
                  <p className="text-xs text-gray-600 mt-1">{course.courseType}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm font-semibold">
                    {course.grade}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Credit: {course.credit}</span>
                <span>Grade Point: {course.gradePoint}</span>
              </div>
            </div>
          ))}
          <div className="p-4 bg-gray-50 font-medium text-sm text-gray-900">
            <div className="flex justify-between">
              <span>SGPA: 6.00</span>
              <span>CGPA: 6.00</span>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Sl No.</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Course</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Course Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Credit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {semester1Courses.map((course) => (
                <tr key={course.slNo} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{course.slNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.course}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.courseType}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.credit}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.grade}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.gradePoint}</td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td colSpan={5} className="px-4 py-3 text-sm font-medium text-gray-900">SGPA: 6.00</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">CGPA: 6.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Semester 2 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 sm:mb-6">
        <div className="bg-indigo-900 text-white px-3 sm:px-4 py-2 sm:py-3">
          <h2 className="text-sm sm:text-base font-medium">July 2025-B.Tech/CSE-IIITD/Semester 2</h2>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden divide-y divide-gray-200">
          {semester2Courses.map((course) => (
            <div key={course.slNo} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <p className="text-sm font-medium text-gray-900">{course.course}</p>
                  <p className="text-xs text-gray-600 mt-1">{course.courseType}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm font-semibold">
                    {course.grade}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Credit: {course.credit}</span>
                <span>Grade Point: {course.gradePoint}</span>
              </div>
            </div>
          ))}
          <div className="p-4 bg-gray-50 font-medium text-sm text-gray-900">
            <div className="flex justify-between">
              <span>SGPA: 6.60</span>
              <span>CGPA: 6.30</span>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Sl No.</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Course</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Course Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Credit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Grade</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {semester2Courses.map((course) => (
                <tr key={course.slNo} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{course.slNo}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.course}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.courseType}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.credit}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.grade}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{course.gradePoint}</td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td colSpan={5} className="px-4 py-3 text-sm font-medium text-gray-900">SGPA: 6.60</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">CGPA: 6.30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-6 sm:mt-8">
        © 2025 All rights reserved.
      </div>
    </div>
  );
}