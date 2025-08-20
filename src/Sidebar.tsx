import React, { useState } from 'react';

interface SidebarProps {
  activeSection?: string;
  activeSubSection?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeSection = 'sales',
  activeSubSection = 'sales',
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['sales']);

  const menuItems = [
    { id: 'payments', label: 'Платежи', icon: '📈' },
    { id: 'accounts', label: 'Счета', icon: '📄' },
    { id: 'analytics', label: 'Аналитика', icon: '📊' },
    {
      id: 'sales',
      label: 'Продажи',
      icon: '💰',
      hasDropdown: true,
      subItems: [
        { id: 'sales', label: 'Продажи' },
        { id: 'contracts', label: 'Договоры' },
      ],
    },
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

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const renderMenuItem = (item: {
    id: string;
    label: string;
    icon: string;
    hasDropdown?: boolean;
    subItems?: { id: string; label: string }[];
  }) => {
    const isExpanded = expandedSections.includes(item.id);
    const isActive = activeSection === item.id;
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          onClick={(e) => {
            if (item.hasDropdown) {
              e.preventDefault();
              toggleSection(item.id);
            }
          }}
          className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
            isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
        >
          <span className="mr-3 text-lg">{item.icon}</span>
          <span className="flex-1">{item.label}</span>
          {item.hasDropdown && (
            <span
              className={`text-xs transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          )}
        </a>

        {/* Sub-items */}
        {hasSubItems && isExpanded && (
          <ul className="ml-6 space-y-1">
            {item.subItems!.map((subItem) => (
              <li key={subItem.id}>
                <a
                  href={`#${subItem.id}`}
                  className={`block px-3 py-2 text-sm transition-colors ${
                    activeSubSection === subItem.id
                      ? 'text-blue-400 bg-gray-800'
                      : 'text-gray-400 hover:text-white hover:bg-gray-600'
                  }`}
                >
                  {subItem.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

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
