import React, { useState } from 'react';
import OrderModal from './OrderModal';

interface SalesRow {
  id: number;
  numberLabel: string;
  conductedAt: string;
  statusEnabled: boolean;
  autoRepeatEnabled: boolean;
  fullyPaid: boolean;
  sum: number;
  discount: number;
  itemsCount: number;
  paid: number;
  paidBonuses: number;
  paidRubles: number;
}

interface SalesTableProps {
  rows?: SalesRow[];
  token?: string;
}

const SalesTable: React.FC<SalesTableProps> = ({ rows, token }) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const demoRows: SalesRow[] = [
    {
      id: 1,
      numberLabel: '911',
      conductedAt: '11.8.2025\n21:52:58',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: false,
      sum: 0,
      discount: 0,
      itemsCount: 0,
      paid: 0,
      paidBonuses: 0,
      paidRubles: 0,
    },
    {
      id: 2,
      numberLabel: '910',
      conductedAt: '11.8.2025\n21:17:22',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: false,
      sum: 5,
      discount: 0,
      itemsCount: 1,
      paid: 0,
      paidBonuses: 0,
      paidRubles: 0,
    },
    {
      id: 3,
      numberLabel: '909',
      conductedAt: '7.8.2025\n1:24:11',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: false,
      sum: 2000,
      discount: 0,
      itemsCount: 4,
      paid: 23.8,
      paidBonuses: 23.8,
      paidRubles: 0,
    },
    {
      id: 4,
      numberLabel: '908',
      conductedAt: '6.8.2025\n15:30:45',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: true,
      sum: 1500,
      discount: 100,
      itemsCount: 3,
      paid: 1400,
      paidBonuses: 0,
      paidRubles: 1400,
    },
    {
      id: 5,
      numberLabel: '907',
      conductedAt: '5.8.2025\n12:15:30',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: false,
      sum: 800,
      discount: 0,
      itemsCount: 2,
      paid: 400,
      paidBonuses: 400,
      paidRubles: 0,
    },
    {
      id: 6,
      numberLabel: '906',
      conductedAt: '4.8.2025\n18:45:12',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: true,
      sum: 2500,
      discount: 200,
      itemsCount: 5,
      paid: 2300,
      paidBonuses: 0,
      paidRubles: 2300,
    },
    {
      id: 7,
      numberLabel: '905',
      conductedAt: '3.8.2025\n09:20:33',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: false,
      sum: 1200,
      discount: 0,
      itemsCount: 2,
      paid: 600,
      paidBonuses: 600,
      paidRubles: 0,
    },
    {
      id: 8,
      numberLabel: '904',
      conductedAt: '2.8.2025\n14:10:25',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: true,
      sum: 3000,
      discount: 300,
      itemsCount: 6,
      paid: 2700,
      paidBonuses: 0,
      paidRubles: 2700,
    },
    {
      id: 9,
      numberLabel: '903',
      conductedAt: '1.8.2025\n20:35:18',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: false,
      sum: 900,
      discount: 0,
      itemsCount: 1,
      paid: 450,
      paidBonuses: 450,
      paidRubles: 0,
    },
    {
      id: 10,
      numberLabel: '902',
      conductedAt: '31.7.2025\n11:05:42',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: true,
      sum: 1800,
      discount: 150,
      itemsCount: 4,
      paid: 1650,
      paidBonuses: 0,
      paidRubles: 1650,
    },
  ];

  const tableRows = rows && rows.length > 0 ? rows : demoRows;

  const renderStatusToggle = (enabled: boolean) => (
    <button
      type="button"
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-300'
      } opacity-60 cursor-not-allowed`}
      aria-pressed={enabled}
      disabled
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          enabled ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const renderAutoRepeat = () => (
    <div className="flex justify-center">
      <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
        <span className="text-white text-xs font-bold">×</span>
      </div>
    </div>
  );

  const renderPaidStatus = (isPaid: boolean) => (
    <div className="flex flex-col items-center">
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center mb-1 ${
          isPaid ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {isPaid ? (
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 111.414-1.414l3.121 3.121 6.364-6.364a1 1 0 011.415 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <span className="text-white text-xs font-bold">×</span>
        )}
      </div>
      <span className={`text-xs ${isPaid ? 'text-green-600' : 'text-red-600'}`}>
        {isPaid ? 'Оплачено' : 'Не оплачено'}
      </span>
    </div>
  );

  const getNumberColor = (id: number) => {
    const colors = [
      'bg-gray-100 text-gray-800',
      'bg-blue-100 text-blue-800 underline',
      'bg-green-100 text-green-800',
    ];
    return colors[id % 3];
  };

  const ActionButton: React.FC<{
    title: string;
    children: React.ReactNode;
  }> = ({ title, children }) => (
    <button
      type="button"
      title={title}
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50"
    >
      {children}
    </button>
  );

  const TrashIcon = () => (
    <svg
      className="h-4 w-4 text-gray-600"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M6 2a1 1 0 00-1 1v1H3.5a.5.5 0 000 1H4v11a2 2 0 002 2h8a2 2 0 002-2V5h.5a.5.5 0 000-1H15V3a1 1 0 00-1-1H6zm2 2V3h6v1H8zM6 6h10v11a1 1 0 01-1 1H6a1 1 0 01-1-1V6z" />
    </svg>
  );

  const PencilIcon = () => (
    <svg
      className="h-4 w-4 text-gray-600"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-8.95 8.95a2 2 0 01-.878.51l-3.4.97a.5.5 0 01-.614-.614l.97-3.4a2 2 0 01.51-.878l8.95-8.95zM12 5l3 3" />
    </svg>
  );

  const PrinterIcon = () => (
    <svg
      className="h-4 w-4 text-gray-600"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M6 2a1 1 0 00-1 1v2h10V3a1 1 0 00-1-1H6zM5 7a3 3 0 00-3 3v3a1 1 0 001 1h2v3a1 1 0 001 1h8a1 1 0 001-1v-3h2a1 1 0 001-1v-3a3 3 0 00-3-3H5zm3 9v-3h4v3H8z" />
    </svg>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setIsOrderModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
          >
            <span className="text-xl leading-none">+</span>
            Новая продажа
          </button>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>→</span>
            <span>Фильтры поиска продаж...</span>
          </div>
        </div>
      </div>

      {/* Table Container with Scroll */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    Номер
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>Дата</span>
                      <span>проведения</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    Статус
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>Авто-</span>
                      <span>повторение</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>Оплачен</span>
                      <span>полностью</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    Сумма
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>Скидка</span>
                      <span>(на чек)</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>Товаров</span>
                      <span>(в чеке)</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    Оплачено
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>Оплачено</span>
                      <span>бонусами</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>Оплачено</span>
                      <span>рублями</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 whitespace-nowrap">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tableRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block rounded-md px-3 py-1 text-sm font-medium ${getNumberColor(
                          row.id,
                        )}`}
                      >
                        {row.numberLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex flex-col">
                        {row.conductedAt.split('\n').map((line, index) => (
                          <span key={index}>{line}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {renderStatusToggle(row.statusEnabled)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {renderAutoRepeat()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {renderPaidStatus(row.fullyPaid)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {row.sum}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {row.discount}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {row.itemsCount}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {row.paid}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {row.paidBonuses}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {row.paidRubles}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-1">
                        <div className="flex flex-col gap-1">
                          <ActionButton title="Удалить">
                            <TrashIcon />
                          </ActionButton>
                          <ActionButton title="Печать">
                            <PrinterIcon />
                          </ActionButton>
                        </div>
                        <div className="flex flex-col">
                          <ActionButton title="Редактировать">
                            <PencilIcon />
                          </ActionButton>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Chat bubble */}
      <div className="fixed bottom-6 right-6">
        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Order Modal */}
      {token && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          token={token}
        />
      )}
    </div>
  );
};

export default SalesTable;
