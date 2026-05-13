import { X } from 'lucide-react';
import { useEffect } from 'react';
import { IMAGE_URLS } from '../../utils/imageUrls';

interface Course {
  slNo: number;
  courseName: string;
  courseType: string;
  creditAudit: string;
  credit: number;
  semester: string;
}

interface CourseListPDFProps {
  courses: Course[];
  semester: string;
  onClose: () => void;
}

export function CourseListPDF({ courses, semester, onClose }: CourseListPDFProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Calculate total credits
  const totalCredits = courses.reduce((sum, course) => sum + course.credit, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header - Hide on print */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center print:hidden">
          <h3 className="text-lg font-semibold text-gray-900">Registered Courses Report</h3>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors"
            >
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="p-8 bg-white" id="courselist-pdf-content">
          {/* Header */}
          <div className="flex items-center justify-center mb-6 pb-4 border-b-2 border-black">
            <img
              src={IMAGE_URLS.LOGO_FULL}
              alt="IIIT-Delhi Logo"
              className="h-16 object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-center font-bold text-base mb-6">Registered Courses Report</h2>

          {/* Student Details - Two Columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 mb-6 text-sm">
            <div className="flex">
              <span className="font-semibold w-40">Student Name</span>
              <span className="mr-2">:</span>
              <span>Vansh Tomar</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-40">Roll Number</span>
              <span className="mr-2">:</span>
              <span>2025533</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-40">Program</span>
              <span className="mr-2">:</span>
              <span>B.Tech/CSE-IIITD</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-40">Academic Year</span>
              <span className="mr-2">:</span>
              <span className="text-blue-700">2025-2026</span>
            </div>
          </div>

          {/* Semester Section */}
          <div className="mb-6">
            <div className="bg-gray-800 text-white px-4 py-2 mb-3">
              <h3 className="font-semibold text-sm">Academic Year 2025-2026 - B.Tech/CSE-IIITD / {semester}</h3>
            </div>

            {/* Courses Table */}
            <table className="w-full border-collapse border-2 border-black mb-3 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-black px-2 py-2 text-left font-semibold">Sl. No</th>
                  <th className="border border-black px-2 py-2 text-left font-semibold">Course Name</th>
                  <th className="border border-black px-2 py-2 text-left font-semibold">Course Type</th>
                  <th className="border border-black px-2 py-2 text-center font-semibold">Credit/Audit</th>
                  <th className="border border-black px-2 py-2 text-center font-semibold">Credit</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.slNo}>
                    <td className="border border-black px-2 py-2 text-center">{course.slNo}</td>
                    <td className="border border-black px-2 py-2 text-blue-700">{course.courseName}</td>
                    <td className="border border-black px-2 py-2">{course.courseType}</td>
                    <td className="border border-black px-2 py-2 text-center">{course.creditAudit}</td>
                    <td className="border border-black px-2 py-2 text-center">{course.credit}</td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={4} className="border border-black px-2 py-2 text-right">Total Credits:</td>
                  <td className="border border-black px-2 py-2 text-center text-red-700">{totalCredits}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Important Notes */}
          <div className="border-2 border-black p-4 text-sm mb-6">
            <p className="font-semibold mb-2">Important Notes:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>This is a computer-generated document and does not require a signature.</li>
              <li>The course registration is subject to approval by the Academic Office.</li>
              <li>Students must fulfill minimum credit requirements as per program regulations.</li>
              <li>Course registration ends on: 2026-01-09 23:59:59</li>
              <li>Any changes to registered courses must be done within the add/drop period.</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-600 pt-4 border-t border-gray-300">
            <p>Indraprastha Institute of Information Technology, Delhi (IIIT-Delhi)</p>
            <p>Okhla Industrial Estate, Phase III, New Delhi - 110020</p>
            <p className="mt-2">Generated on: {new Date().toLocaleDateString('en-IN', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
