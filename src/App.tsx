import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SalesTable from './SalesTable';
import TokenAuth from './components/TokenAuth';

export default function App() {
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleTokenSubmit = (authToken: string) => {
    setToken(authToken);
    setIsAuthenticated(true);
  };

  // Если не авторизован, показываем форму авторизации
  if (!isAuthenticated) {
    return <TokenAuth onSubmit={handleTokenSubmit} />;
  }

  // Если авторизован, показываем основной интерфейс
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeSection="sales" activeSubSection="sales" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header balance={1000} username="Рушан_113" />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <SalesTable token={token} />
        </main>
      </div>
    </div>
  );
}
