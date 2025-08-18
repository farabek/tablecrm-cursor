import SalesTable from './SalesTable';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sales CRM Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your sales data efficiently
          </p>
        </div>
        <SalesTable />
      </div>
    </div>
  );
}
