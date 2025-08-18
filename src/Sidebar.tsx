import React from 'react';

interface SidebarProps {
  activeSection?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection = 'sales' }) => {
  const menuItems = [
    { id: 'payments', label: 'Платежи', icon: '📈' },
    { id: 'accounts', label: 'Счета', icon: '📄' },
    { id: 'analytics', label: 'Аналитика', icon: '📊' },
    { id: 'sales', label: 'Продажи', icon: '💰' },
    { id: 'contracts', label: 'Договоры', icon: '📋' },
    { id: 'purchases', label: 'Закупки', icon: '🛒' },
    { id: 'warehouse', label: 'Склад', icon: '📦', hasDropdown: true },
    { id: 'products', label: 'Товары и услуги', icon: '🛍️', hasDropdown: true },
    { id: 'loyalty', label: 'Карты лояльн...', icon: '💳', hasDropdown: true },
    { id: 'counterparties', label: 'Контрагенты', icon: '👥' },
    { id: 'integrations', label: 'Интеграции', icon: '🔗' },
    { id: 'projects', label: 'Проекты', icon: '📁' },
    { id: 'users', label: 'Пользователи', icon: '👤' },
    { id: 'events', label: 'События', icon: '🕐' },
    { id: 'organizations', label: 'Организации', icon: '🏢' },
    { id: 'segments', label: 'Сегменты', icon: '🏷️' },
    { id: 'rent', label: 'Аренда', icon: '📊' },
    { id: 'settings', label: 'Настройки', icon: '⚙️' },
    { id: 'swagger', label: 'Swagger API', icon: 'Σ' },
    { id: 'docs', label: 'Документация', icon: '📄' },
  ];

  const renderMenuItem = (item: {
    id: string;
    label: string;
    icon: string;
    hasDropdown?: boolean;
  }) => (
    <li key={item.id}>
      <a
        href={`#${item.id}`}
        className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
          activeSection === item.id
            ? 'bg-blue-600 text-white'
            : 'text-gray-300 hover:bg-gray-600 hover:text-white'
        }`}
      >
        <span className="mr-3 text-lg">{item.icon}</span>
        <span className="flex-1">{item.label}</span>
        {item.hasDropdown && <span className="text-xs">▼</span>}
      </a>
    </li>
  );

  return (
    <div className="w-64 bg-gray-700 min-h-screen flex flex-col">
      {/* Scrollable Navigation Container */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation Menu */}
        <nav className="px-4 py-6">
          <ul className="space-y-1">{menuItems.map(renderMenuItem)}</ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
