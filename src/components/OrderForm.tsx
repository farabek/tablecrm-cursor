import React, { useState } from 'react';
import TokenAuth from './TokenAuth';
import CustomerSearch from './CustomerSearch';
import OrderDetails from './OrderDetails';
import ProductSelection from './ProductSelection';
import OrderSummary from './OrderSummary';

interface OrderFormData {
  token: string;
  customerPhone: string;
  customer: any;
  organization: any;
  warehouse: any;
  priceType: any;
  products: any[];
  totalAmount: number;
}

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    token: '',
    customerPhone: '',
    customer: null,
    organization: null,
    warehouse: null,
    priceType: null,
    products: [],
    totalAmount: 0
  });

  const [currentStep, setCurrentStep] = useState<'auth' | 'customer' | 'details' | 'products' | 'summary'>('auth');

  const handleTokenSubmit = (token: string) => {
    setFormData(prev => ({ ...prev, token }));
    setCurrentStep('customer');
  };

  const handleCustomerSelect = (customer: any) => {
    setFormData(prev => ({ ...prev, customer, customerPhone: customer.phone }));
    setCurrentStep('details');
  };

  const handleDetailsSubmit = (details: { organization: any; warehouse: any; priceType: any }) => {
    setFormData(prev => ({ ...prev, ...details }));
    setCurrentStep('products');
  };

  const handleProductsSubmit = (products: any[]) => {
    const totalAmount = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
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

      const response = await fetch(`https://app.tablecrm.com/api/v1/docs_sales/?token=${formData.token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([orderData])
      });

      if (response.ok) {
        const result = await response.json();
        alert('Заказ успешно создан!');
        // Reset form or navigate to success page
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
      case 'auth':
        return <TokenAuth onSubmit={handleTokenSubmit} />;
      case 'customer':
        return <CustomerSearch token={formData.token} onSelect={handleCustomerSelect} />;
      case 'details':
        return <OrderDetails token={formData.token} onSubmit={handleDetailsSubmit} />;
      case 'products':
        return <ProductSelection token={formData.token} onSubmit={handleProductsSubmit} />;
      case 'summary':
        return (
          <OrderSummary 
            formData={formData} 
            onCreateOrder={handleCreateOrder}
            onBack={() => setCurrentStep('products')}
          />
        );
      default:
        return <TokenAuth onSubmit={handleTokenSubmit} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-semibold text-center">Создание заказа</h1>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-2">
              {['auth', 'customer', 'details', 'products', 'summary'].map((step, index) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    currentStep === step ? 'bg-white' : 'bg-blue-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
