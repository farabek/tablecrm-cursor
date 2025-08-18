import React from 'react';

interface HeaderProps {
  balance?: number;
  username?: string;
}

const Header: React.FC<HeaderProps> = ({
  balance = 1000,
  username = 'Рушан_113',
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Продажи</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Баланс аккаунта:</span>
            <span className="font-medium text-gray-900">{balance}</span>
            <span>/</span>
            <span className="font-medium text-gray-900">{username}</span>
          </div>

          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
