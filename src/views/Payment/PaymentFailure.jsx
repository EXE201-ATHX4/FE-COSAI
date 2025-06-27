import React, { useState, useEffect } from 'react';
import { XCircle, Package, CreditCard, ShoppingBag, Mail, Phone, ArrowLeft } from 'lucide-react';
import './PaymentFailure.css';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shakeVisible, setShakeVisible] = useState(false);
  const [orderData, setOrderData] = useState(null); // State to hold order data from localStorage
  const [errorInfo, setErrorInfo] = useState(null); // State to hold error data
  const navigate = useNavigate();

  // Helper function to format price to Vietnamese currency
  const formatPrice = (price) => {
    if (typeof price === 'number' && !isNaN(price)) {
      return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
    }
    return '0 ₫'; // Return a default value for invalid numbers
  };

  useEffect(() => {
    // 1. Load data from localStorage
    const storedOrderInfo = localStorage.getItem('orderInfo');
    const storedErrorInfo = localStorage.getItem('paymentError'); // Assuming you store error info here

    if (storedOrderInfo) {
      try {
        const parsedOrder = JSON.parse(storedOrderInfo);
        setOrderData(parsedOrder);
        console.log("Order data loaded from localStorage:", parsedOrder);
      } catch (error) {
        console.error("Failed to parse order data from localStorage:", error);
      }
    }

    if (storedErrorInfo) {
      try {
        const parsedError = JSON.parse(storedErrorInfo);
        setErrorInfo(parsedError);
        console.log("Error data loaded from localStorage:", parsedError);
      } catch (error) {
        console.error("Failed to parse error data from localStorage:", error);
      }
    }

    // 2. Animate the card and shake effect
    setIsVisible(true);
    setShakeVisible(true);
    setTimeout(() => setShakeVisible(false), 1000);

    // 3. (Optional) Clear localStorage for error info after display
    localStorage.removeItem('paymentError');

  }, []);

  const ShakeEffect = () => (
    <div className={`shake-container ${shakeVisible ? 'visible' : 'hidden'}`}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="shake-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );

  // If order data is not available, show a fallback message
  if (!orderData) {
    return (
      <div className="payment-failure-container">
        <div className="payment-failure-card">
          <div className="content-section">
            <h2 className="section-title-error" style={{ textAlign: 'center' }}>
              Không tìm thấy thông tin đơn hàng!
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '20px' }}>
              Không có giao dịch gần đây nào được ghi nhận.
              <br />
              Vui lòng quay lại giỏ hàng để tiếp tục mua sắm.
            </p>
            <div className="action-buttons">
              <button className="back-button" onClick={() => navigate("/cart")}>
                <ArrowLeft className="button-icon" />
                Quay về giỏ hàng
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
  const paymentMethod = 'Chuyển khoản'; // We only had this option in the Payment page
  const errorCode = errorInfo?.errorCode || 'UNKNOWN_ERROR';
  const errorMessage = errorInfo?.errorMessage || 'Giao dịch không thể hoàn tất. Vui lòng kiểm tra lại thông tin thanh toán hoặc thử lại sau.';

  return (
    <div className="payment-failure-container">
      <ShakeEffect />
      
      <div className={`payment-failure-card ${isVisible ? 'visible' : 'hidden'}`}>
        {/* Main Failure Card */}
        <div className="failure-card">
          {/* Header Section */}
          <div className="header-section-failure">
            <div className="header-overlay-failure"></div>
            <div className="header-content">
              <div className="failure-icon">
                <XCircle className="x-icon" />
              </div>
              <h1 className="failure-title">Thanh toán thất bại!</h1>
              <p className="failure-message">
                Rất tiếc, giao dịch của bạn không thể hoàn tất 😔
              </p>
            </div>
            
            {/* Decorative Elements */}
            <div className="decoration decoration-1"></div>
            <div className="decoration decoration-2"></div>
          </div>

          {/* Content Section */}
          <div className="content-section">
            {/* Error Information */}
            <div className="error-summary">
              <h2 className="section-title-error">
                <XCircle className="section-icon-error" />
                Thông tin lỗi
              </h2>
              
              <div className="error-details">
                <div className="error-card">
                  <div className="error-code">
                    <span className="error-label">Mã lỗi:</span>
                    <span className="error-value">{errorCode}</span>
                  </div>
                  <div className="error-message">
                    <span className="error-description">{errorMessage}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary-failure">
              <h2 className="section-title-neutral">
                <Package className="section-icon-neutral" />
                Thông tin đơn hàng chưa hoàn tất
              </h2>
              
              <div className="order-details-failure">
                <div className="detail-row">
                  <span className="detail-label">Mã đơn hàng</span>
                  <span className="order-id-badge-failure">
                    #{orderId}
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">
                    <CreditCard className="detail-icon" />
                    Phương thức thanh toán
                  </span>
                  <span className="detail-value">{paymentMethod}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Tổng tiền</span>
                  <span className="total-amount-failure">{totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="products-section">
              <h3 className="section-title-neutral">
                <ShoppingBag className="section-icon-neutral" />
                Sản phẩm trong giỏ hàng
              </h3>
              
              <div className="products-list">
                {items.map((item, index) => (
                  <div key={index} className="product-item-failure">
                    <div className="product-info">
                      <div className="quantity-badge-failure">
                        <span className="quantity-number">{item.quantity}</span>
                      </div>
                      <span className="product-name">{item.name}</span>
                    </div>
                    <span className="product-price-failure">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="back-button" onClick={() => navigate("/cart")}>
                <ArrowLeft className="button-icon" />
                Quay về giỏ hàng
              </button>
            </div>

            {/* Support Information */}
            <div className="support-section">
              <div className="support-content">
                <div className="support-icon-wrapper">
                  <Mail className="support-icon" />
                </div>
                <h4 className="support-title">Cần hỗ trợ?</h4>
                <p className="support-message">
                  Nếu bạn gặp khó khăn với thanh toán, đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ.
                  <br />
                  <span className="highlight-error">Thời gian hỗ trợ: 8:00 - 22:00 hàng ngày</span>
                </p>
                
                <div className="support-links">
                  <a href="mailto:support@veganbeauty.vn" className="support-link">
                    <Mail className="link-icon" />
                    support@veganbeauty.vn
                  </a>
                  <a href="tel:1900-XXX-XXX" className="support-link">
                    <Phone className="link-icon" />
                    1900-XXX-XXX
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="footer-message-failure">
          <p>
            Đừng lo lắng, sản phẩm vẫn được giữ trong giỏ hàng của bạn 🛍️
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;