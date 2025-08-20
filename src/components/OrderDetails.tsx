import React, { useState, useEffect } from 'react';

interface OrderDetailsProps {
  token: string;
  onSubmit: (details: { organization: any; warehouse: any; priceType: any }) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ token, onSubmit }) => {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [priceTypes, setPriceTypes] = useState<any[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<any>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);
  const [selectedPriceType, setSelectedPriceType] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Загружаем организации, склады и типы цен
      // Пока используем моковые данные
      const mockOrganizations = [
        { id: 38, name: 'ООО "Рога и Копыта"' },
        { id: 39, name: 'ИП Иванов' },
        { id: 40, name: 'ООО "ТехноСтрой"' }
      ];

      const mockWarehouses = [
        { id: 39, name: 'Основной склад', organization_id: 38 },
        { id: 50, name: 'Склад №2', organization_id: 38 },
        { id: 69, name: 'Склад ИП Иванов', organization_id: 39 }
      ];

      const mockPriceTypes = [
        { id: 1, name: 'Розничная цена' },
        { id: 2, name: 'Оптовая цена' },
        { id: 3, name: 'Цена со скидкой' }
      ];

      setOrganizations(mockOrganizations);
      setWarehouses(mockWarehouses);
      setPriceTypes(mockPriceTypes);

      // Устанавливаем значения по умолчанию
      if (mockOrganizations.length > 0) {
        setSelectedOrganization(mockOrganizations[0]);
      }
      if (mockWarehouses.length > 0) {
        setSelectedWarehouse(mockWarehouses[0]);
      }
      if (mockPriceTypes.length > 0) {
        setSelectedPriceType(mockPriceTypes[0]);
      }

    } catch (error) {
      setError('Ошибка загрузки данных');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!selectedOrganization || !selectedWarehouse || !selectedPriceType) {
      setError('Выберите все обязательные поля');
      return;
    }

    onSubmit({
      organization: selectedOrganization,
      warehouse: selectedWarehouse,
      priceType: selectedPriceType
    });
  };

  const filteredWarehouses = warehouses.filter(
    warehouse => !selectedOrganization || warehouse.organization_id === selectedOrganization.id
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Загрузка...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Детали заказа</h2>
        <p className="text-gray-600">Выберите организацию, склад и тип цены</p>
      </div>

      <div className="space-y-4">
        {/* Организация */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Организация *
          </label>
          <select
            value={selectedOrganization?.id || ''}
            onChange={(e) => {
              const org = organizations.find(o => o.id === parseInt(e.target.value));
              setSelectedOrganization(org);
              // Сбрасываем склад при смене организации
              setSelectedWarehouse(null);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Выберите организацию</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>

        {/* Склад */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Склад *
          </label>
          <select
            value={selectedWarehouse?.id || ''}
            onChange={(e) => {
              const warehouse = warehouses.find(w => w.id === parseInt(e.target.value));
              setSelectedWarehouse(warehouse);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={!selectedOrganization}
          >
            <option value="">Выберите склад</option>
            {filteredWarehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
          {!selectedOrganization && (
            <p className="text-sm text-gray-500 mt-1">Сначала выберите организацию</p>
          )}
        </div>

        {/* Тип цены */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Тип цены *
          </label>
          <select
            value={selectedPriceType?.id || ''}
            onChange={(e) => {
              const priceType = priceTypes.find(pt => pt.id === parseInt(e.target.value));
              setSelectedPriceType(priceType);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Выберите тип цены</option>
            {priceTypes.map((priceType) => (
              <option key={priceType.id} value={priceType.id}>
                {priceType.name}
              </option>
            ))}
          </select>
        </div>

        {/* Информация о выбранных значениях */}
        {(selectedOrganization || selectedWarehouse || selectedPriceType) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Выбранные параметры:</h3>
            <div className="space-y-1 text-sm text-blue-700">
              {selectedOrganization && (
                <div>Организация: {selectedOrganization.name}</div>
              )}
              {selectedWarehouse && (
                <div>Склад: {selectedWarehouse.name}</div>
              )}
              {selectedPriceType && (
                <div>Тип цены: {selectedPriceType.name}</div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedOrganization || !selectedWarehouse || !selectedPriceType}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
