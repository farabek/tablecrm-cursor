import React from 'react';
import SalesTable from './components/SalesTable';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Боковая панель навигации */}
        <nav className="hidden lg:block w-64 bg-gray-800 min-h-screen p-4">
          <div className="space-y-4">
            <div className="text-white font-semibold text-lg mb-6">TableCRM</div>
            
            <div className="space-y-2">
              <div className="text-gray-300 text-sm uppercase tracking-wider">Основное</div>
              <a href="#" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <span className="mr-3">📊</span>
                Платежи
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <span className="mr-3">📋</span>
                Счета
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <span className="mr-3">📈</span>
                Аналитика
              </a>
            </div>

            <div className="space-y-2">
              <div className="text-gray-300 text-sm uppercase tracking-wider">Продажи</div>
              <a href="#" className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium">
                <span className="mr-3">💰</span>
                Продажи
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <span className="mr-3">📄</span>
                Договоры
              </a>
            </div>

            <div className="space-y-2">
              <a href="#" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <span className="mr-3">🛒</span>
                Закупки
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <span className="mr-3">📦</span>
                Склад
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <span className="mr-3">🏷️</span>
                Товары и услуги
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <span className="mr-3">🎫</span>
                Карты лояльности
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <span className="mr-3">👥</span>
                Контрагенты
              </a>
            </div>
          </div>
        </nav>

        {/* Основной контент */}
        <div className="flex-1">
          {/* Заголовок */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                  + Новая продажа
                </button>
                <span className="text-gray-600 text-sm">
                  &gt; Фильтры поиска продаж...
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Баланс аккаунта: 1000</div>
                  <div className="font-medium">Рушан_113</div>
                </div>
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-lg">👤</span>
                </div>
              </div>
            </div>
          </header>

          {/* Таблица */}
          <main className="p-4">
            <SalesTable />
          </main>
        </div>
      </div>

      {/* Плавающая кнопка чата */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center">
          <span className="text-blue-600 text-xl">💬</span>
        </button>
      </div>
    </div>
  );
}

export default App;
