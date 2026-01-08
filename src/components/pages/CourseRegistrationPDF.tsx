import { X } from 'lucide-react';
import { useEffect } from 'react';
import logoFull from 'figma:asset/97c2a527215d4815f31fb2d6d63560240c905711.png';

interface Course {
  slNo: number;
  courseName: string;
  courseType: string;
  creditAudit: string;
  credit: number;
}

interface CourseRegistrationPDFProps {
  courses: Course[];
  onClose: () => void;
}

export function CourseRegistrationPDF({ courses, onClose }: CourseRegistrationPDFProps) {
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

  const totalCredits = courses.reduce((sum, course) => sum + course.credit, 0);

  // Map course codes to instructor names (dummy data)
  const instructorMap: Record<string, string> = {
    'ECO201': 'New',
    'CSE102': 'Dr. Debarka Sengupta, Dr. Ojaswa Sharma',
    'CSE112': 'Dr. Karan Bhattacharya, Dr. Sujay Deb',
    'ECE111': 'Dr. Chandraker Prasad Vyas, Dr. Sayan Basu Roy',
    'MTH201': 'Dr. Sanjit Krishnan Kaul, Dr. Sneha Chaubey'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header - Hide on print */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center print:hidden">
          <h3 className="text-lg font-semibold text-gray-900">Course Registration Form</h3>
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
        <div className="p-8 bg-white" id="pdf-content">
          {/* Header */}
          <div className="flex items-center justify-center mb-6 pb-4 border-b-2 border-black">
            <img src={logoFull} alt="IIIT-Delhi Logo" className="h-16 object-contain" />
          </div>

          {/* Title */}
          <h2 className="text-center font-bold text-base mb-6">Course Registration Form</h2>

          {/* Student Details - Two Columns */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 mb-6 text-sm">
            <div className="flex">
              <span className="font-semibold w-40">Admission Year</span>
              <span className="mr-2">:</span>
              <span className="text-blue-700">July 2025</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-40">Academic Year</span>
              <span className="mr-2">:</span>
              <span className="text-blue-700">July 2025</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-40">Student Name</span>
              <span className="mr-2">:</span>
              <span>Vansh Tomar</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-40">Semester</span>
              <span className="mr-2">:</span>
              <span>Semester 2</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-40">Roll Number</span>
              <span className="mr-2">:</span>
              <span>2025533</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-40">Batch Code</span>
              <span className="mr-2">:</span>
              <span>CSE</span>
            </div>
          </div>

          {/* Course Table */}
          <table className="w-full border-collapse border-2 border-black mb-4 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black px-2 py-2 text-left font-semibold">Sl. No</th>
                <th className="border border-black px-2 py-2 text-left font-semibold">Course Code</th>
                <th className="border border-black px-2 py-2 text-left font-semibold">Course Description</th>
                <th className="border border-black px-2 py-2 text-left font-semibold">Instructor</th>
                <th className="border border-black px-2 py-2 text-left font-semibold">Course Status</th>
                <th className="border border-black px-2 py-2 text-left font-semibold">In lieu of</th>
                <th className="border border-black px-2 py-2 text-left font-semibold">Course Type</th>
                <th className="border border-black px-2 py-2 text-center font-semibold">Credits</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => {
                const courseCode = course.courseName.split('-')[0];
                const courseDescription = course.courseName.split('-').slice(1).join('-');
                const instructor = instructorMap[courseCode] || 'New';
                
                return (
                  <tr key={course.slNo}>
                    <td className="border border-black px-2 py-2 text-center">{course.slNo}</td>
                    <td className="border border-black px-2 py-2">{courseCode}</td>
                    <td className="border border-black px-2 py-2 text-blue-700">{courseDescription}</td>
                    <td className="border border-black px-2 py-2 text-red-700 text-xs">{instructor}</td>
                    <td className="border border-black px-2 py-2">New</td>
                    <td className="border border-black px-2 py-2"></td>
                    <td className="border border-black px-2 py-2">{course.courseType}</td>
                    <td className="border border-black px-2 py-2 text-center">{course.credit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Total Credits */}
          <div className="text-right mb-8 text-sm">
            <span className="font-bold">Total Credit :</span>
            <span className="ml-4 text-red-700 font-bold">{totalCredits}</span>
          </div>

          {/* Correspondence Section */}
          <div className="mb-8 text-sm space-y-3">
            <div className="flex">
              <span className="font-bold w-48">Correspondence address</span>
              <span className="mr-2">:</span>
              <span></span>
            </div>
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
            <div className="flex">
              <span className="font-bold w-48">Home Phone No</span>
              <span className="mr-2">:</span>
              <span>9136214212</span>
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
                <span className="font-bold text-blue-700">Authorized Signature</span>
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
          #pdf-content, #pdf-content * {
            visibility: visible;
          }
          #pdf-content {
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