import React, { useState } from 'react';

interface OrderSummaryProps {
  formData: any;
  onCreateOrder: (status: boolean) => void;
  onBack: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ formData, onCreateOrder, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateOrder = async (status: boolean) => {
    setIsLoading(true);
    try {
      await onCreateOrder(status);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return formData.products.reduce((total: number, product: any) => {
      const price = product.price;
      const discount = product.discount || 0;
      const discountedPrice = price * (1 - discount / 100);
      return total + (discountedPrice * product.quantity);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Сводка заказа</h2>
        <p className="text-gray-600">Проверьте данные перед созданием заказа</p>
      </div>

      {/* Информация о клиенте */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Клиент</h3>
        <div className="space-y-1 text-sm text-gray-700">
          <div><strong>Имя:</strong> {formData.customer?.name}</div>
          <div><strong>Телефон:</strong> {formData.customer?.phone}</div>
          {formData.customer?.email && (
            <div><strong>Email:</strong> {formData.customer.email}</div>
          )}
          {formData.customer?.loyality_card_id && (
            <div className="text-green-600"><strong>Карта лояльности:</strong> Есть</div>
          )}
        </div>
      </div>

      {/* Информация о заказе */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Параметры заказа</h3>
        <div className="space-y-1 text-sm text-gray-700">
          <div><strong>Организация:</strong> {formData.organization?.name}</div>
          <div><strong>Склад:</strong> {formData.warehouse?.name}</div>
          <div><strong>Тип цены:</strong> {formData.priceType?.name}</div>
        </div>
      </div>

      {/* Товары */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Товары ({formData.products.length})</h3>
        <div className="space-y-3">
          {formData.products.map((product: any, index: number) => (
            <div key={index} className="flex justify-between items-start border-b border-gray-200 pb-2 last:border-b-0">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-600">
                  {product.quantity} шт. × {product.price} ₽
                  {product.discount > 0 && (
                    <span className="text-red-600 ml-2">-{product.discount}%</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">
                  {((product.price * (1 - (product.discount || 0) / 100)) * product.quantity).toFixed(2)} ₽
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Итого */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-900 text-lg">Итого к оплате:</span>
          <span className="font-bold text-blue-900 text-xl">{calculateTotal().toFixed(2)} ₽</span>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="space-y-3">
        <button
          onClick={() => handleCreateOrder(false)}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Создание...
            </div>
          ) : (
            'Создать заказ'
          )}
        </button>

        <button
          onClick={() => handleCreateOrder(true)}
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Создание и проведение...
            </div>
          ) : (
            'Создать и провести'
          )}
        </button>

        <button
          onClick={onBack}
          disabled={isLoading}
          className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Назад к товарам
        </button>
      </div>

      {/* Информация о статусах */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-900 mb-2">Разница между статусами:</h3>
        <div className="space-y-1 text-sm text-yellow-700">
          <div><strong>Создать заказ:</strong> Заказ создается в статусе "Черновик"</div>
          <div><strong>Создать и провести:</strong> Заказ создается и сразу проводится</div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
