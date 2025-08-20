import React, { useState, useEffect } from 'react';

interface ProductSelectionProps {
  token: string;
  onSubmit: (products: any[]) => void;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({ token, onSubmit }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Моковые данные товаров
      const mockProducts = [
        {
          id: 45690,
          name: 'Товар 1',
          price: 500,
          unit: 116,
          stock: 10,
          category: 'Электроника'
        },
        {
          id: 45691,
          name: 'Товар 2',
          price: 750,
          unit: 116,
          stock: 5,
          category: 'Одежда'
        },
        {
          id: 45692,
          name: 'Товар 3',
          price: 1200,
          unit: 116,
          stock: 15,
          category: 'Спорт'
        },
        {
          id: 45693,
          name: 'Товар 4',
          price: 300,
          unit: 116,
          stock: 20,
          category: 'Книги'
        },
        {
          id: 45694,
          name: 'Товар 5',
          price: 900,
          unit: 116,
          stock: 8,
          category: 'Электроника'
        }
      ];

      setProducts(mockProducts);
    } catch (error) {
      setError('Ошибка загрузки товаров');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: any) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    
    if (existingProduct) {
      setSelectedProducts(prev =>
        prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      setSelectedProducts(prev => [...prev, { ...product, quantity: 1, discount: 0 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setSelectedProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, quantity }
          : p
      )
    );
  };

  const updateDiscount = (productId: number, discount: number) => {
    setSelectedProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, discount: Math.max(0, Math.min(100, discount)) }
          : p
      )
    );
  };

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      const price = product.price;
      const discount = product.discount || 0;
      const discountedPrice = price * (1 - discount / 100);
      return total + (discountedPrice * product.quantity);
    }, 0);
  };

  const handleSubmit = () => {
    if (selectedProducts.length === 0) {
      setError('Добавьте хотя бы один товар');
      return;
    }

    const productsWithCalculations = selectedProducts.map(product => ({
      ...product,
      sum_discounted: product.price * (product.discount || 0) / 100 * product.quantity
    }));

    onSubmit(productsWithCalculations);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Загрузка товаров...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Выбор товаров</h2>
        <p className="text-gray-600">Найдите и добавьте товары в заказ</p>
      </div>

      {/* Поиск товаров */}
      <div>
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Список товаров */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Доступные товары</h3>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.category}</div>
                  <div className="text-sm text-gray-500">Остаток: {product.stock} шт.</div>
                </div>
                <div className="text-right ml-4">
                  <div className="font-medium text-gray-900">{product.price} ₽</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Корзина */}
        {selectedProducts.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Корзина</h3>
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.category}</div>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Количество</label>
                    <input
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Цена</label>
                    <div className="text-sm font-medium">{product.price} ₽</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Скидка %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={product.discount || 0}
                      onChange={(e) => updateDiscount(product.id, parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                <div className="mt-3 text-right">
                  <div className="text-sm text-gray-600">
                    Сумма: {((product.price * (1 - (product.discount || 0) / 100)) * product.quantity).toFixed(2)} ₽
                  </div>
                </div>
              </div>
            ))}

            {/* Итого */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-900">Итого:</span>
                <span className="font-bold text-blue-900 text-lg">{calculateTotal().toFixed(2)} ₽</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={selectedProducts.length === 0}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Продолжить ({selectedProducts.length} товаров)
      </button>
    </div>
  );
};

export default ProductSelection;
