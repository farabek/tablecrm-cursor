import React from 'react';

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
}

const SalesTable: React.FC<SalesTableProps> = ({ rows }) => {
  const demoRows: SalesRow[] = [
    {
      id: 1,
      numberLabel: '579',
      conductedAt: '10.8.2025 22:32:52',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: true,
      sum: 0,
      discount: 0,
      itemsCount: 1,
      paid: 0,
      paidBonuses: 0,
      paidRubles: 0
    },
    {
      id: 2,
      numberLabel: '345348',
      conductedAt: '10.8.2025 21:23:35',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: true,
      sum: 0,
      discount: 0,
      itemsCount: 0,
      paid: 0,
      paidBonuses: 0,
      paidRubles: 0
    },
    {
      id: 3,
      numberLabel: '911',
      conductedAt: '11.8.2025 21:52:58',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: false,
      sum: 0,
      discount: 0,
      itemsCount: 0,
      paid: 0,
      paidBonuses: 0,
      paidRubles: 0
    },
    {
      id: 4,
      numberLabel: '910',
      conductedAt: '11.8.2025 21:17:22',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: false,
      sum: 5,
      discount: 0,
      itemsCount: 1,
      paid: 0,
      paidBonuses: 0,
      paidRubles: 0
    },
    {
      id: 5,
      numberLabel: '909',
      conductedAt: '7.8.2025 1:24:11',
      statusEnabled: false,
      autoRepeatEnabled: false,
      fullyPaid: false,
      sum: 2000,
      discount: 0,
      itemsCount: 4,
      paid: 23.8,
      paidBonuses: 23.8,
      paidRubles: 0
    }
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

  const CheckIcon = ({ className = 'h-4 w-4 text-green-600' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 111.414-1.414l3.121 3.121 6.364-6.364a1 1 0 011.415 0z" clipRule="evenodd" />
    </svg>
  );

  const CrossIcon = ({ className = 'h-4 w-4 text-red-600' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  const TrashIcon = () => (
    <svg className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6 2a1 1 0 00-1 1v1H3.5a.5.5 0 000 1H4v11a2 2 0 002 2h8a2 2 0 002-2V5h.5a.5.5 0 000-1H15V3a1 1 0 00-1-1H6zm2 2V3h6v1H8zM6 6h10v11a1 1 0 01-1 1H6a1 1 0 01-1-1V6z" />
    </svg>
  );

  const PencilIcon = () => (
    <svg className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-8.95 8.95a2 2 0 01-.878.51l-3.4.97a.5.5 0 01-.614-.614l.97-3.4a2 2 0 01.51-.878l8.95-8.95zM12 5l3 3" />
    </svg>
  );

  const PrinterIcon = () => (
    <svg className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M6 2a1 1 0 00-1 1v2h10V3a1 1 0 00-1-1H6zM5 7a3 3 0 00-3 3v3a1 1 0 001 1h2v3a1 1 0 001 1h8a1 1 0 001-1v-3h2a1 1 0 001-1v-3a3 3 0 00-3-3H5zm3 9v-3h4v3H8z" />
    </svg>
  );

  const renderPaidStatus = (isPaid: boolean) => (
    <div className="flex items-center gap-2">
      {isPaid ? <CheckIcon /> : <CrossIcon />}
      <span className={`text-sm ${isPaid ? 'text-green-600' : 'text-red-600'}`}>
        {isPaid ? 'Оплачено' : 'Не оплачено'}
      </span>
    </div>
  );

  const ActionButton: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <button
      type="button"
      title={title}
      className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50"
      disabled
    >
      {children}
    </button>
  );

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
          disabled
        >
          <span className="text-xl leading-none">+</span>
          Новая продажа
        </button>
        <span className="text-sm text-gray-600">Фильтры поиска продаж…</span>
      </div>

      <table className="min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Номер</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Дата проведения</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Статус</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Авто-повторение</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Оплачен полностью</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Сумма</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Скидка (на чек)</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Товаров (в чеке)</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Оплачено</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Оплачено бонусами</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Оплачено рублями</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Действие</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tableRows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <span
                  className={`inline-block rounded-md px-3 py-1 text-sm font-medium ${
                    row.id % 3 === 0
                      ? 'bg-green-100 text-green-800'
                      : row.id % 3 === 1
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {row.numberLabel}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.conductedAt}</td>
              <td className="px-4 py-3 whitespace-nowrap">{renderStatusToggle(row.statusEnabled)}</td>
              <td className="px-4 py-3 whitespace-nowrap">{renderStatusToggle(row.autoRepeatEnabled)}</td>
              <td className="px-4 py-3 whitespace-nowrap">{renderPaidStatus(row.fullyPaid)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.sum}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.discount}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.itemsCount}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.paid}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.paidBonuses}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{row.paidRubles}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <ActionButton title="Удалить">
                    <TrashIcon />
                  </ActionButton>
                  <ActionButton title="Редактировать">
                    <PencilIcon />
                  </ActionButton>
                  <ActionButton title="Печать">
                    <PrinterIcon />
                  </ActionButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;