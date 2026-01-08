import { Download, CreditCard } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function FeeDetailsPage() {
  const feeBreakdown = [
    { component: 'Tuition Fee', amount: 225000, status: 'Paid' },
    { component: 'Double Sharing Room (Aug - 15th Dec. 2025)', amount: 38250, status: 'Paid' },
    { component: 'Security (Refundable)', amount: 10000, status: 'Paid' },
    { component: 'Mess Charges (15 days coupon - Mandatory) (Aug - Nov)', amount: 8000, status: 'Paid' },
  ];

  const totalFee = feeBreakdown.reduce((sum, item) => sum + item.amount, 0);

  const handleDownloadReceipt = () => {
    toast.success('Receipt downloaded successfully!', {
      description: 'Your fee receipt has been saved to downloads.'
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Fee Details</h2>
          <p className="text-sm text-gray-500 mt-1">Academic Year 2025-26, Semester 2</p>
        </div>

        <div className="p-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Payment Status</p>
              <p className="text-lg font-semibold text-green-900">All Dues Cleared</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-600" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700">Fee Component</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700">Amount (₹)</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {feeBreakdown.map((fee) => (
                  <tr key={fee.component} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{fee.component}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">₹{fee.amount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {fee.status}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-6 py-4 text-sm text-gray-900">Total</td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">₹{totalFee.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleDownloadReceipt}
              className="flex items-center space-x-2 bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}