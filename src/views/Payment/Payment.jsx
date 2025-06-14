import React, { useState } from 'react';
import './PaymentPage.css'; // Import the new CSS file
import { Header } from '../../components/header'; // Assuming Header component exists
import { Footer } from '../../components/footer'; // Assuming Footer component exists
import { CheckCircle, Truck, CreditCard, ArrowLeft } from 'lucide-react'; // Import icons from lucide-react
import { nav } from 'framer-motion/client';
import { useNavigate } from 'react-router-dom';

// Custom Dialog component to simulate MUI Dialog behavior
const PaymentSuccessDialog = ({ onClose, onGoHome, onGoCart }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <CheckCircle size={60} className="dialog-icon" />
        <h3 className="dialog-title">THANH TOÁN THÀNH CÔNG!</h3>
        <p className="dialog-message">Đơn hàng của bạn đã được tiếp nhận và sẽ sớm được xử lý.</p>
        <div className="dialog-actions">
          <button className="dialog-button home-button" onClick={onGoHome}>
            TRỞ VỀ TRANG CHỦ
          </button>
          <button className="dialog-button cart-button" onClick={onGoCart}>
            QUAY LẠI GIỎ HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};


const Payment = () => {
  // Mock data for order details (in a real app, this would come from global state/props)
  const [orderSummary] = useState({
    items: [
      { id: 1, name: 'Sữa chống nắng Bi đao SPF 50+', quantity: 1, price: 430000 },
      { id: 2, name: 'Tẩy da chết Cà phê Đắk Lắk', quantity: 1, price: 165000 },
      { id: 3, name: 'Gel tắm Khuynh Diệp', quantity: 1, price: 245000 },
      { id: 4, name: 'Muối tắm Cà phê Culi đen', quantity: 1, price: 190000 },
      { id: 5, name: 'Dầu gội bưởi và bồ kết', quantity: 1, price: 180000 },
    ],
    subtotal: 1215000, // Sum of mock items' prices
    discountAmount: 0,
    shippingFee: 35000, // Example shipping fee
  });

  // Mock data for pre-filled delivery information
  const [deliveryInfo] = useState({
    name: 'Nguyễn Văn A',
    phone: '0912 345 678',
    address: 'Số 123, Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh',
    notes: 'Giao hàng sau 17h, gọi điện trước khi đến.',
  });

  const [paymentMethod, setPaymentMethod] = useState('vnpay'); // Default to VNPay
  const [paymentStatus, setPaymentStatus] = useState(''); // To display payment messages
  const [isLoading, setIsLoading] = useState(false); // Loading state for payment button
  const [showPaymentSuccessDialog, setShowPaymentSuccessDialog] = useState(false); // State for controlling success dialog

  // Calculate final total based on order summary
  const finalTotal = orderSummary.subtotal - orderSummary.discountAmount + orderSummary.shippingFee;

  // Helper function to format price to Vietnamese currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
  };

  // Function to simulate VNPay payment processing
  const handleVnPayPayment = async () => {
    setIsLoading(true);
    setPaymentStatus('Đang xử lý thanh toán qua VNPay...');
    try {
      const mockApiResponse = await new Promise(resolve => setTimeout(() => {
        resolve({
          success: true,
          paymentUrl: 'https://sandbox.vnpayment.vn/paymentv2/Payment/CreateOrder?param=mock_vnpay_url', // Mock URL
          message: 'Tạo yêu cầu thanh toán VNPay thành công. Đang chuyển hướng...',
        });
      }, 2000)); // Simulate 2-second API call

      if (mockApiResponse.success) {
        setPaymentStatus('Thanh toán thành công!');
        console.log('Redirecting to VNPay:', mockApiResponse.paymentUrl);
        // Simulate successful payment and show dialog instead of actual redirect
        setTimeout(() => {
          setShowPaymentSuccessDialog(true);
        }, 500); // Show dialog after a short delay
      } else {
        setPaymentStatus('Lỗi khi tạo yêu cầu thanh toán VNPay. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi thanh toán VNPay:', error);
      setPaymentStatus('Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCashOnDelivery = () => {
    setIsLoading(true);
    setPaymentStatus('Bạn đã chọn thanh toán khi nhận hàng (COD). Đơn hàng sẽ được xác nhận.');
    // Simulate API call to finalize COD order
    setTimeout(() => {
      setIsLoading(false);
      setPaymentStatus('Đặt hàng COD thành công!');
      setShowPaymentSuccessDialog(true); // Show dialog on COD success
    }, 1500);
  };

  const handlePayment = () => {
    if (paymentMethod === 'vnpay') {
      handleVnPayPayment();
    } else if (paymentMethod === 'cod') {
      handleCashOnDelivery();
    }
  };

  const handleGoBack = () => {
   nav.navigate(-1); // Navigate back to the previous page
    // In a real application, you would use React Router: navigate(-1)
    console.log("Navigating back to previous page");
  };

  const navigate = useNavigate()
  const handleGoHome = () => {
    console.log("Navigating to Home Page");
    navigate('/'); // Navigate to home page
    // In a real application, you would use React Router: navigate('/')
    setShowPaymentSuccessDialog(false); // Close dialog
    // window.location.href = '/'; // Example for direct URL navigation
  };

  const handleGoCart = () => {
    console.log("Navigating back to Cart Page");
    navigate('/cart'); // Navigate back to cart page
    // In a real application, you would use React Router: navigate('/cart')
    setShowPaymentSuccessDialog(false); // Close dialog
    // window.location.href = '/cart'; // Example for direct URL navigation
  };

  return (
    <>
      <div className="payment-page-container">
        {/* Back Button */}
        <div className="back-button-container">
          <button onClick={handleGoBack} className="back-button">
            <ArrowLeft size={20} /> QUAY LẠI
          </button>
        </div>

        <h2 className="page-title">THANH TOÁN</h2>
        <div className="payment-content">

          {/* Order Details Summary */}
          <div className="order-details-summary">
            <h3>CHI TIẾT ĐƠN HÀNG</h3>
            <div className="order-summary-list">
              {orderSummary.items.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.name} x {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="summary-row">
              <span>Tạm tính:</span>
              <span>{formatPrice(orderSummary.subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Giảm giá:</span>
              <span>-{formatPrice(orderSummary.discountAmount)}</span>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển:</span>
              <span>{formatPrice(orderSummary.shippingFee)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Tổng tiền:</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="payment-method-section">
            <h3>THÔNG TIN GIAO HÀNG</h3>
            <div className="info-row">
              <strong>Người nhận:</strong> <span>{deliveryInfo.name}</span>
            </div>
            <div className="info-row">
              <strong>Số điện thoại:</strong> <span>{deliveryInfo.phone}</span>
            </div>
            <div className="info-row full-address">
              <strong>Địa chỉ:</strong> <span>{deliveryInfo.address}</span>
            </div>
            {deliveryInfo.notes && (
              <div className="info-row">
                <strong>Ghi chú:</strong> <span>{deliveryInfo.notes}</span>
              </div>
            )}
            <h3>PHƯƠNG THỨC THANH TOÁN</h3>
            <div className="payment-options">
              <label className={`payment-option-card ${paymentMethod === 'vnpay' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="vnpay"
                  checked={paymentMethod === 'vnpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <CreditCard size={35} className="payment-icon" /> {/* Icon for VNPay/Online */}
                <span>Thanh toán qua VNPay</span>
              </label>

              <label className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Truck size={35} className="payment-icon" /> {/* Icon for COD */}
                <span>Thanh toán khi nhận hàng (COD)</span>
              </label>
            </div>

            <button
              className="confirm-payment-btn"
              onClick={handlePayment}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN THANH TOÁN'}
            </button>
            {paymentStatus && <p className="payment-status-message">{paymentStatus}</p>}
          </div>
        </div>
      </div>
      {showPaymentSuccessDialog && (
        <PaymentSuccessDialog
          onClose={() => setShowPaymentSuccessDialog(false)}
          onGoHome={handleGoHome}
          onGoCart={handleGoCart}
        />
      )}
    </>
  );
};


export default function PaymentPage() {
  return (
    <>
      <Header />
      <Payment />
      <Footer />
    </>
  );
}
