import React from 'react';

interface SidebarProps {
  activeSection?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection = 'sales' }) => {
  const menuItems = [
    { id: 'payments', label: 'Платежи', icon: '💳' },
    { id: 'accounts', label: 'Счета', icon: '📊' },
    { id: 'analytics', label: 'Аналитика', icon: '📈' },
    { id: 'sales', label: 'Продажи', icon: '🛒' },
    { id: 'contracts', label: 'Договоры', icon: '📋' },
    { id: 'purchases', label: 'Закупки', icon: '📦' },
    { id: 'warehouse', label: 'Склад', icon: '🏭' },
    { id: 'products', label: 'Товары и услуги', icon: '📦' },
    { id: 'loyalty', label: 'Карты лояльности', icon: '🎫' },
    { id: 'counterparties', label: 'Контрагенты', icon: '👥' },
    { id: 'integrations', label: 'Интеграции', icon: '🔗' },
    { id: 'projects', label: 'Проекты', icon: '📁' },
    { id: 'users', label: 'Пользователи', icon: '👤' },
    { id: 'events', label: 'События', icon: '📅' },
    { id: 'organizations', label: 'Организации', icon: '🏢' },
    { id: 'segments', label: 'Сегменты', icon: '📊' },
    { id: 'rent', label: 'Аренда', icon: '🏠' },
    { id: 'swagger', label: 'Swagger API', icon: '📚' },
    { id: 'docs', label: 'Документация', icon: '📖' },
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen flex flex-col">
      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </a>
              {activeSection === item.id && item.id === 'sales' && (
                <ul className="ml-8 mt-1 space-y-1">
                  <li>
                    <a
                      href="#sales"
                      className="flex items-center px-3 py-1 text-sm text-blue-400 hover:text-white"
                    >
                      Продажи
                    </a>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Settings */}
      <div className="p-4 border-t border-gray-700">
        <a
          href="#settings"
          className="flex items-center text-gray-300 hover:text-white text-sm"
        >
          <span className="mr-3">⚙️</span>
          Настройки
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
