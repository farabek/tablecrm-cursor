import React, { useState } from 'react';

interface Sale {
  id: number;
  date: string;
  time: string;
  status: boolean;
  autoRepeat: boolean;
  fullyPaid: boolean;
  amount: number;
  discount: number;
  items: number;
  paid: number;
  paidWithBonuses: number;
  paidInRubles: number;
}

const mockData: Sale[] = [
  {
    id: 579,
    date: '10.8.2025',
    time: '22:32:52',
    status: false,
    autoRepeat: false,
    fullyPaid: true,
    amount: 0,
    discount: 0,
    items: 1,
    paid: 0,
    paidWithBonuses: 0,
    paidInRubles: 0,
  },
  {
    id: 345348,
    date: '10.8.2025',
    time: '21:23:35',
    status: false,
    autoRepeat: false,
    fullyPaid: true,
    amount: 0,
    discount: 0,
    items: 0,
    paid: 0,
    paidWithBonuses: 0,
    paidInRubles: 0,
  },
  {
    id: 911,
    date: '11.8.2025',
    time: '21:52:58',
    status: false,
    autoRepeat: false,
    fullyPaid: false,
    amount: 0,
    discount: 0,
    items: 0,
    paid: 0,
    paidWithBonuses: 0,
    paidInRubles: 0,
  },
  {
    id: 910,
    date: '11.8.2025',
    time: '21:17:22',
    status: false,
    autoRepeat: false,
    fullyPaid: false,
    amount: 5,
    discount: 0,
    items: 1,
    paid: 0,
    paidWithBonuses: 0,
    paidInRubles: 0,
  },
  {
    id: 909,
    date: '7.8.2025',
    time: '1:24:11',
    status: false,
    autoRepeat: false,
    fullyPaid: false,
    amount: 2000,
    discount: 0,
    items: 4,
    paid: 23.8,
    paidWithBonuses: 23.8,
    paidInRubles: 0,
  },
];

const SalesTable: React.FC = () => {
  const [sales] = useState<Sale[]>(mockData);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Заголовок таблицы */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Продажи</h2>
      </div>

      {/* Десктопная таблица */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Номер
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата проведения
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Авто-повторение
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Оплачен полностью
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Сумма
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Скидка (на чек)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Товаров (в чеке)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Оплачено
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Оплачено бонусами
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Оп. руб
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действие
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {sale.id}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{sale.date}</div>
                  <div className="text-gray-500">{sale.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        sale.status ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    sale.autoRepeat ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-sm ${sale.autoRepeat ? 'text-green-600' : 'text-red-600'}`}>
                      {sale.autoRepeat ? '✓' : '✗'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      sale.fullyPaid ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-sm ${sale.fullyPaid ? 'text-green-600' : 'text-red-600'}`}>
                        {sale.fullyPaid ? '✓' : '✗'}
                      </span>
                    </div>
                    <span className={`text-xs mt-1 ${sale.fullyPaid ? 'text-green-600' : 'text-red-600'}`}>
                      {sale.fullyPaid ? 'Оплачено' : 'Не оплачено'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.discount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.items}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.paid}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.paidWithBonuses}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {sale.paidInRubles}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-red-600 hover:text-red-900">🗑️</button>
                    <button className="text-blue-600 hover:text-blue-900">✏️</button>
                    <button className="text-gray-600 hover:text-gray-900">🖨️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Мобильная таблица */}
      <div className="lg:hidden">
        <div className="divide-y divide-gray-200">
          {sales.map((sale) => (
            <div key={sale.id} className="p-4 space-y-3">
              {/* Заголовок карточки */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  №{sale.id}
                </span>
                <div className="flex space-x-2">
                  <button className="text-red-600 hover:text-red-900 p-1">🗑️</button>
                  <button className="text-blue-600 hover:text-blue-900 p-1">✏️</button>
                  <button className="text-gray-600 hover:text-gray-900 p-1">🖨️</button>
                </div>
              </div>

              {/* Основная информация */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-500 text-xs">Дата проведения</div>
                  <div className="font-medium">{sale.date}</div>
                  <div className="text-gray-500">{sale.time}</div>
                </div>
                
                <div>
                  <div className="text-gray-500 text-xs">Сумма</div>
                  <div className="font-medium">{sale.amount}</div>
                </div>

                <div>
                  <div className="text-gray-500 text-xs">Товаров</div>
                  <div className="font-medium">{sale.items}</div>
                </div>

                <div>
                  <div className="text-gray-500 text-xs">Оплачено</div>
                  <div className="font-medium">{sale.paid}</div>
                </div>
              </div>

              {/* Статусы */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-xs">Статус</span>
                    <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-200 transition-colors">
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          sale.status ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-xs">Авто-повтор</span>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      sale.autoRepeat ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-xs ${sale.autoRepeat ? 'text-green-600' : 'text-red-600'}`}>
                        {sale.autoRepeat ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-xs">Оплачен</span>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    sale.fullyPaid ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <span className={`text-xs ${sale.fullyPaid ? 'text-green-600' : 'text-red-600'}`}>
                      {sale.fullyPaid ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Дополнительная информация */}
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                <div>
                  <div>Скидка: {sale.discount}</div>
                  <div>Бонусами: {sale.paidWithBonuses}</div>
                </div>
                <div>
                  <div>Рублями: {sale.paidInRubles}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs px-2 py-1 rounded ${
                    sale.fullyPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {sale.fullyPaid ? 'Оплачено' : 'Не оплачено'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesTable;