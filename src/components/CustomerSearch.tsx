import React, { useState } from 'react';

interface CustomerSearchProps {
  token: string;
  onSelect: (customer: any) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({ token, onSelect }) => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const searchCustomers = async () => {
    if (!phone.trim()) {
      setError('Введите номер телефона');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Здесь нужно будет использовать правильный API endpoint для поиска клиентов
      // Пока используем моковые данные
      const mockCustomers = [
        {
          id: 1,
          name: 'Иван Иванов',
          phone: phone,
          email: 'ivan@example.com',
          loyality_card_id: 22476
        },
        {
          id: 2,
          name: 'Петр Петров',
          phone: phone,
          email: 'petr@example.com',
          loyality_card_id: null
        }
      ];

      setCustomers(mockCustomers);
    } catch (error) {
      setError('Ошибка поиска клиентов');
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomer = async () => {
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) {
      setError('Заполните обязательные поля');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Здесь нужно будет использовать правильный API endpoint для создания клиента
      const createdCustomer = {
        id: Date.now(), // Временный ID
        name: newCustomer.name,
        phone: newCustomer.phone,
        email: newCustomer.email,
        loyality_card_id: null
      };

      onSelect(createdCustomer);
    } catch (error) {
      setError('Ошибка создания клиента');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (value: string) => {
    // Форматирование номера телефона
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;
    
    if (cleaned.length >= 1) {
      formatted = '+' + cleaned;
    }
    if (cleaned.length >= 4) {
      formatted = '+' + cleaned.slice(0, 1) + ' (' + cleaned.slice(1, 4) + ') ';
    }
    if (cleaned.length >= 7) {
      formatted = '+' + cleaned.slice(0, 1) + ' (' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-';
    }
    if (cleaned.length >= 9) {
      formatted = '+' + cleaned.slice(0, 1) + ' (' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-' + cleaned.slice(7, 9);
    }
    if (cleaned.length >= 11) {
      formatted = '+' + cleaned.slice(0, 1) + ' (' + cleaned.slice(1, 4) + ') ' + cleaned.slice(4, 7) + '-' + cleaned.slice(7, 9) + '-' + cleaned.slice(9, 11);
    }

    setPhone(formatted);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Поиск клиента</h2>
        <p className="text-gray-600">Введите номер телефона для поиска клиента</p>
      </div>

      {!showCreateForm ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Номер телефона
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="+7 (999) 123-45-67"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <button
            onClick={searchCustomers}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Поиск...' : 'Найти клиента'}
          </button>

          <button
            onClick={() => setShowCreateForm(true)}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Создать нового клиента
          </button>

          {customers.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Найденные клиенты:</h3>
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => onSelect(customer)}
                  className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900">{customer.name}</div>
                  <div className="text-sm text-gray-600">{customer.phone}</div>
                  {customer.email && (
                    <div className="text-sm text-gray-600">{customer.email}</div>
                  )}
                  {customer.loyality_card_id && (
                    <div className="text-sm text-green-600">Есть карта лояльности</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Имя клиента *
            </label>
            <input
              type="text"
              id="name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Введите имя"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="newPhone" className="block text-sm font-medium text-gray-700 mb-2">
              Номер телефона *
            </label>
            <input
              type="tel"
              id="newPhone"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+7 (999) 123-45-67"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
              placeholder="email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowCreateForm(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Назад
            </button>
            <button
              onClick={createCustomer}
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Создание...' : 'Создать'}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;
