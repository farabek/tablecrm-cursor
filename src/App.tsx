// import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SalesTable from './SalesTable';

export default function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeSection="sales" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header balance={1000} username="Рушан_113" />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <SalesTable />
        </main>
      </div>
    </div>
  );
}
