import React, { useState } from 'react';
import CustomerSearch from './CustomerSearch';
import OrderDetails from './OrderDetails';
import ProductSelection from './ProductSelection';
import OrderSummary from './OrderSummary';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
}

interface OrderFormData {
  customer: any;
  organization: any;
  warehouse: any;
  priceType: any;
  products: any[];
  totalAmount: number;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, token }) => {
  const [formData, setFormData] = useState<OrderFormData>({
    customer: null,
    organization: null,
    warehouse: null,
    priceType: null,
    products: [],
    totalAmount: 0
  });

  const [currentStep, setCurrentStep] = useState<'customer' | 'details' | 'products' | 'summary'>('customer');

  const handleCustomerSelect = (customer: any) => {
    setFormData(prev => ({ ...prev, customer }));
    setCurrentStep('details');
  };

  const handleDetailsSubmit = (details: { organization: any; warehouse: any; priceType: any }) => {
    setFormData(prev => ({ ...prev, ...details }));
    setCurrentStep('products');
  };

  const handleProductsSubmit = (products: any[]) => {
    const totalAmount = products.reduce((sum, product) => {
      const price = product.price;
      const discount = product.discount || 0;
      const discountedPrice = price * (1 - discount / 100);
      return sum + (discountedPrice * product.quantity);
    }, 0);
    setFormData(prev => ({ ...prev, products, totalAmount }));
    setCurrentStep('summary');
  };

  const handleCreateOrder = async (status: boolean = false) => {
    try {
      const orderData = {
        dated: Math.floor(Date.now() / 1000),
        operation: "Заказ",
        tax_included: true,
        tax_active: true,
        goods: formData.products.map(product => ({
          price: product.price,
          quantity: product.quantity,
          unit: product.unit || 116,
          discount: product.discount || 0,
          sum_discounted: product.sum_discounted || 0,
          nomenclature: product.nomenclature
        })),
        settings: {
          date_next_created: null
        },
        loyality_card_id: formData.customer?.loyality_card_id || null,
        warehouse: formData.warehouse?.id,
        contragent: formData.customer?.id,
        paybox: 759, // Default value
        organization: formData.organization?.id,
        status: status,
        paid_rubles: 0,
        paid_lt: 0
      };

      const response = await fetch(`https://app.tablecrm.com/api/v1/docs_sales/?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([orderData])
      });

      if (response.ok) {
        const result = await response.json();
        alert('Заказ успешно создан!');
        onClose();
        // Reset form
        setFormData({
          customer: null,
          organization: null,
          warehouse: null,
          priceType: null,
          products: [],
          totalAmount: 0
        });
        setCurrentStep('customer');
      } else {
        throw new Error('Ошибка создания заказа');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Ошибка создания заказа');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'customer':
        return <CustomerSearch token={token} onSelect={handleCustomerSelect} />;
      case 'details':
        return <OrderDetails token={token} onSubmit={handleDetailsSubmit} />;
      case 'products':
        return <ProductSelection token={token} onSubmit={handleProductsSubmit} />;
      case 'summary':
        return (
          <OrderSummary 
            formData={formData} 
            onCreateOrder={handleCreateOrder}
            onBack={() => setCurrentStep('products')}
          />
        );
      default:
        return <CustomerSearch token={token} onSelect={handleCustomerSelect} />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Создание заказа</h2>
            <div className="flex space-x-2 mt-2">
              {['customer', 'details', 'products', 'summary'].map((step, index) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    currentStep === step ? 'bg-white' : 'bg-blue-400'
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
