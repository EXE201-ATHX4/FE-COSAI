import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, CreditCard, ShoppingBag, Mail, Phone } from 'lucide-react';
import './PaymentSuccess.css';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [orderData, setOrderData] = useState(null); // State to hold order data from localStorage
  const navigate = useNavigate();

  // Helper function to format price to Vietnamese currency
  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '0 ₫';
    }
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
  };

  useEffect(() => {
    // 1. Load data from localStorage when the component mounts
    const storedOrderInfo = localStorage.getItem('orderInfo');
    if (storedOrderInfo) {
      try {
        const parsedOrder = JSON.parse(storedOrderInfo);
        setOrderData(parsedOrder);
        console.log("Order data loaded from localStorage:", parsedOrder);
      } catch (error) {
        console.error("Failed to parse order data from localStorage:", error);
        setOrderData(null); // Set to null if data is corrupted
      }
    }

    // 2. Animate the card and confetti
    setIsVisible(true);
    setConfettiVisible(true);
    // Hide confetti after a few seconds
    setTimeout(() => setConfettiVisible(false), 3000);

    // 3. (Optional) Clear localStorage after a successful display to prevent re-displaying on refresh
    // localStorage.removeItem('orderInfo');

  }, []);

  const Confetti = () => (
    <div className={`confetti-container ${confettiVisible ? 'visible' : 'hidden'}`}>
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  // If order data is not available, show a fallback message
  if (!orderData) {
    return (
      <div className="payment-success-container">
        <div className="payment-success-card">
          <div className="content-section">
            <h2 className="section-title" style={{ textAlign: 'center', color: '#e74c3c' }}>
              Không tìm thấy thông tin đơn hàng!
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '20px' }}>
              Có vẻ như không có đơn hàng nào được thanh toán gần đây.
              <br />
              Vui lòng quay lại trang giỏ hàng để đặt đơn mới.
            </p>
            <div className="action-buttons">
              <button className="primary-button" onClick={() => navigate("/products")}>
                <ShoppingBag className="button-icon" />
                Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Destructure data for easier access
  const { items, summary, id } = orderData;
  const totalAmount = formatPrice(summary.finalTotal);
  const orderId = id; // Assuming 'id' from localStorage is the order ID

  return (
    <div className="payment-success-container">
      <Confetti />
      
      <div className={`payment-success-card ${isVisible ? 'visible' : 'hidden'}`}>
        {/* Main Success Card */}
        <div className="success-card">
          {/* Header Section */}
          <div className="header-section">
            <div className="header-overlay"></div>
            <div className="header-content">
              <div className="success-icon">
                <CheckCircle className="check-icon" />
              </div>
              <h1 className="success-title">Thanh toán thành công!</h1>
            </div>
            
            {/* Decorative Elements */}
            <div className="decoration decoration-1"></div>
            <div className="decoration decoration-2"></div>
          </div>

          {/* Content Section */}
          <div className="content-section">
            {/* Order Summary */}
            <div className="order-summary">
              <h2 className="section-title">
                <Package className="section-icon" />
                Thông tin đơn hàng
              </h2>
              
              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">Mã đơn hàng</span>
                  <span className="order-id-badge">
                    #{orderId}
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">
                    <CreditCard className="detail-icon" />
                    Phương thức thanh toán
                  </span>
                  <span className="detail-value">Chuyển khoản</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Tổng tiền</span>
                  <span className="total-amount">{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="products-section">
              <h3 className="section-title">
                <ShoppingBag className="section-icon" />
                Sản phẩm đã mua
              </h3>
              
              <div className="products-list">
                {items.map((item, index) => (
                  <div key={index} className="product-item">
                    <div className="product-info">
                      <div className="quantity-badge">
                        <span className="quantity-number">{item.quantity}</span>
                      </div>
                      <span className="product-name">{item.name}</span>
                    </div>
                    <span className="product-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="primary-button" onClick={() => navigate("/products")}>
                <ShoppingBag className="button-icon" />
                Tiếp tục mua sắm
              </button>
              
              <button className="secondary-button" onClick={() => navigate("/account")}>
                <Package className="button-icon" />
                Theo dõi đơn hàng
              </button>
            </div>

            {/* Contact Information */}
            <div className="contact-section">
              <div className="contact-content">
                <div className="contact-icon-wrapper">
                  <Mail className="contact-icon" />
                </div>
                <h4 className="contact-title">Thông tin quan trọng</h4>
                <p className="contact-message">
                  Đơn hàng sẽ được giao trong <span className="highlight">2-3 ngày làm việc</span>.
                </p>
                
                <div className="contact-links">
                  <a href="mailto:cosai.exe.contact@gmail.com" className="contact-link">
                    <Mail className="link-icon" />
                    cosai.exe.contact@gmail.com
                  </a>
                  <a href="tel:0338554925" className="contact-link">
                    <Phone className="link-icon" />
                    0338554925
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="footer-message">
          <p>
            Cảm ơn bạn đã lựa chọn sản phẩm thân thiện với môi trường 🌿
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;