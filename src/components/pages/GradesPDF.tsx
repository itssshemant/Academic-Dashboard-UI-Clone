import { X } from 'lucide-react';
import { useEffect } from 'react';
import logoFull from 'figma:asset/97c2a527215d4815f31fb2d6d63560240c905711.png';

interface Course {
  slNo: number;
  course: string;
  courseType: string;
  credit: number;
  grade: string;
  gradePoint: number;
}

interface GradesPDFProps {
  semester1Courses: Course[];
  onClose: () => void;
}

export function GradesPDF({ semester1Courses, onClose }: GradesPDFProps) {
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

  // Calculate totals for semester 1
  const sem1TotalCredits = semester1Courses.reduce((sum, course) => sum + course.credit, 0);
  const sem1TotalPoints = semester1Courses.reduce((sum, course) => sum + (course.credit * course.gradePoint), 0);
  const sem1SGPA = (sem1TotalPoints / sem1TotalCredits).toFixed(2);
  const cgpa = '6.50';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header - Hide on print */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center print:hidden">
          <h3 className="text-lg font-semibold text-gray-900">Grade Report</h3>
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
        <div className="p-8 bg-white" id="grades-pdf-content">
          {/* Header */}
          <div className="flex items-center justify-center mb-6 pb-4 border-b-2 border-black">
            <img src={logoFull} alt="IIIT-Delhi Logo" className="h-16 object-contain" />
          </div>

          {/* Title */}
          <h2 className="text-center font-bold text-base mb-6">Grade Report</h2>

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
              <span className="font-semibold w-40">Admission Year</span>
              <span className="mr-2">:</span>
              <span className="text-blue-700">July 2025</span>
            </div>
          </div>

          {/* Semester 1 Section */}
          <div className="mb-6">
            <div className="bg-gray-800 text-white px-4 py-2 mb-3">
              <h3 className="font-semibold text-sm">July 2025 - B.Tech/CSE-IIITD / Semester 1</h3>
            </div>

            {/* Semester 1 Table */}
            <table className="w-full border-collapse border-2 border-black mb-3 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-black px-2 py-2 text-left font-semibold">Sl. No</th>
                  <th className="border border-black px-2 py-2 text-left font-semibold">Course</th>
                  <th className="border border-black px-2 py-2 text-left font-semibold">Course Type</th>
                  <th className="border border-black px-2 py-2 text-center font-semibold">Credit</th>
                  <th className="border border-black px-2 py-2 text-center font-semibold">Grade</th>
                  <th className="border border-black px-2 py-2 text-center font-semibold">Grade Point</th>
                </tr>
              </thead>
              <tbody>
                {semester1Courses.map((course) => (
                  <tr key={course.slNo}>
                    <td className="border border-black px-2 py-2 text-center">{course.slNo}</td>
                    <td className="border border-black px-2 py-2 text-blue-700">{course.course}</td>
                    <td className="border border-black px-2 py-2">{course.courseType}</td>
                    <td className="border border-black px-2 py-2 text-center">{course.credit}</td>
                    <td className="border border-black px-2 py-2 text-center font-bold">{course.grade}</td>
                    <td className="border border-black px-2 py-2 text-center">{course.gradePoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* SGPA/CGPA Row */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div className="flex justify-end">
                <span className="font-bold">SGPA:</span>
                <span className="ml-4 text-red-700 font-bold">{sem1SGPA}</span>
              </div>
              <div className="flex">
                <span className="font-bold">CGPA:</span>
                <span className="ml-4 text-red-700 font-bold">{cgpa}</span>
              </div>
            </div>
          </div>

          {/* Semester 2 Section */}
          <div className="mb-8">
            <div className="bg-gray-800 text-white px-4 py-2 mb-3">
              <h3 className="font-semibold text-sm">July 2025 - B.Tech/CSE-IIITD / Semester 2</h3>
            </div>

            <div className="border-2 border-black p-4 text-sm">
              <p className="font-semibold mb-2">Note:</p>
              <p>1. (*)-Grades have not been given or Frozen for one or more subjects for this student-Hence SGPA and CGPA not calculated.</p>
            </div>
          </div>

          {/* Grading System Information */}
          <div className="mb-8 text-xs border-2 border-black p-4">
            <h4 className="font-bold mb-2">Grading System:</h4>
            <div className="grid grid-cols-2 gap-x-8">
              <div>
                <p><strong>A+</strong> : 10 (Outstanding)</p>
                <p><strong>A</strong> : 10 (Excellent)</p>
                <p><strong>A-</strong> : 9 (Very Good)</p>
                <p><strong>B+</strong> : 8 (Good)</p>
                <p><strong>B</strong> : 7 (Above Average)</p>
              </div>
              <div>
                <p><strong>B-</strong> : 7 (Average)</p>
                <p><strong>C+</strong> : 6 (Below Average)</p>
                <p><strong>C</strong> : 5 (Marginal)</p>
                <p><strong>D</strong> : 4 (Poor)</p>
                <p><strong>F</strong> : 2 (Fail)</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8 text-sm space-y-3">
            <div className="flex">
              <span className="font-bold w-48">Email-Id of Student</span>
              <span className="mr-2">:</span>
              <span className="text-blue-700">vansh25533@iiitd.ac.in</span>
            </div>
            <div className="flex">
              <span className="font-bold w-48">Contact No</span>
              <span className="mr-2">:</span>
              <span>8929189705</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-12 mt-16 text-sm">
            <div>
              <div className="mb-2">
                <span className="font-bold text-blue-700">Student's Signature</span>
              </div>
              <div className="flex">
                <span className="font-bold">Date :</span>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <span className="font-bold text-blue-700">Registrar's Signature</span>
              </div>
              <div className="flex">
                <span className="font-bold">Date :</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-xs text-gray-600 italic">
            <p>Note: This is a system generated document. Signature is not required for system generated PDF.</p>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 mt-4">
            © 2025 All rights reserved.
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #grades-pdf-content, #grades-pdf-content * {
            visibility: visible;
          }
          #grades-pdf-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}