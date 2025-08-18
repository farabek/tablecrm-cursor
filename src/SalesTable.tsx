import React from 'react';

interface SalesData {
  id: number;
  customer: string;
  product: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

interface SalesTableProps {
  data?: SalesData[];
}

const SalesTable: React.FC<SalesTableProps> = ({ data = [] }) => {
  const defaultData: SalesData[] = [
    {
      id: 1,
      customer: 'John Doe',
      product: 'Product A',
      amount: 150.00,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      customer: 'Jane Smith',
      product: 'Product B',
      amount: 275.50,
      date: '2024-01-16',
      status: 'pending'
    },
    {
      id: 3,
      customer: 'Bob Johnson',
      product: 'Product C',
      amount: 89.99,
      date: '2024-01-17',
      status: 'completed'
    }
  ];

  const tableData = data.length > 0 ? data : defaultData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.customer}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.product}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${row.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(row.status)}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;