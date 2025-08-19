import React, { useState } from 'react';

interface TokenAuthProps {
  onSubmit: (token: string) => void;
}

const TokenAuth: React.FC<TokenAuthProps> = ({ onSubmit }) => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('Введите токен авторизации');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Проверяем валидность токена, делая тестовый запрос
      const response = await fetch(`https://app.tablecrm.com/api/v1/docs_sales/?token=${token}`);
      
      if (response.ok) {
        onSubmit(token);
      } else {
        setError('Неверный токен авторизации');
      }
    } catch (error) {
      setError('Ошибка подключения к серверу');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TableCRM</h1>
          <p className="text-gray-600">Введите токен для доступа к системе</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-2">
              Токен авторизации
            </label>
            <input
              type="password"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Введите токен..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Проверка...
              </div>
            ) : (
              'Войти в систему'
            )}
          </button>
        </form>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Как получить токен?</h3>
          <p className="text-sm text-blue-700">
            Токен можно получить в настройках вашей кассы в TableCRM. 
            Обратитесь к администратору системы для получения токена доступа.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenAuth;
