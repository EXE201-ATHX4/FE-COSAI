import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { CheckCircle, CreditCard, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccessDialog = ({ onClose, onGoHome, onGoCart }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <CheckCircle size={60} className="dialog-icon" />
        <h3 className="dialog-title">THANH TOÁN THÀNH CÔNG!</h3>
        <p className="dialog-message">
          Đơn hàng của bạn đã được tiếp nhận và sẽ sớm được xử lý.
        </p>
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
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentSuccessDialog, setShowPaymentSuccessDialog] = useState(false);

  useEffect(() => {
    const storedOrderInfo = localStorage.getItem("orderInfo");
    if (storedOrderInfo) {
      try {
        const parsedOrder = JSON.parse(storedOrderInfo);
        console.log("Order data loaded from localStorage:", parsedOrder);
        setOrderData(parsedOrder);
        setOrderSummary(parsedOrder.summary);
        setDeliveryInfo(parsedOrder.shippingInfo);
      } catch (error) {
        console.error("Failed to parse order data from localStorage:", error);
        setPaymentStatus(
          "Không thể tải thông tin đơn hàng. Vui lòng quay lại giỏ hàng và thử lại."
        );
      }
    } else {
      console.log("No order data found in localStorage.");
      setPaymentStatus(
        "Không có thông tin đơn hàng để thanh toán. Vui lòng quay lại giỏ hàng."
      );
    }
  }, []);

  const formatPrice = (price) => {
    if (typeof price !== "number" || isNaN(price)) {
      return "0 ₫";
    }
    return new Intl.NumberFormat("vi-VN").format(price) + " ₫";
  };

  const createOrderBody = () => {
    if (!orderData) return null;
    const { items, shippingInfo, summary } = orderData;
    const apiItems = items.map((item) => ({
      id: 0, // Use 0 as per the provided body
      productName: item.name || "string",
      price: item.price || 10000,
      quantity: item.quantity || 1,
      unitsInStock: item.unitsInStock || 0,
      category: item.category || "string",
    }));

    // Use window.location.origin to get the base URL dynamically
    const baseUrl = window.location.origin;

    return {
      order: {
        orderCode: 0, // Use 0 as per the provided body
        cartId: orderData.id || "string",
        shipment: {
          fullName: shippingInfo.fullName || "string",
          phoneNumber: shippingInfo.phone || "string",
          email: shippingInfo.email || "string",
          address: shippingInfo.address || "string",
          provinceCity: shippingInfo.province || "string",
          ward: shippingInfo.ward || "string",
          district: shippingInfo.district || "string",
          shippingMethod: "Giao hàng tiêu chuẩn",
        },
        items: apiItems,
      },
      description: `Thanh toán chuyển khoản` || "string",
      price: summary.finalTotal || 0,
      returnUrl: `${baseUrl}/order/${orderData.id}/paymentSuccess`,
      cancelUrl: `${baseUrl}/order/${orderData.id}/paymentFailure`,
    };
  };

  const handlePayment = async () => {
    if (!orderData) {
      setPaymentStatus("Không có dữ liệu đơn hàng để xử lý.");
      return;
    }

    setIsLoading(true);
    setPaymentStatus("Đang xử lý đơn hàng và tạo yêu cầu thanh toán...");

    const endpoint = "https://be-cosai.onrender.com/api/order/create";
    const requestBody = createOrderBody();

    console.log("Sending API request with body:", requestBody);

    try {
      const response = await axios.post(endpoint, requestBody, {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      });

      console.log("Full API response:", response.data);

      if (response.data.error === 0 && response.data.message === "success") {
        setPaymentStatus("Đặt hàng thành công! Đang chuyển hướng đến trang thanh toán...");
        window.location.href = response.data.data.checkoutUrl;
      } else {
        throw new Error(`API error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setPaymentStatus(
        `Đã xảy ra lỗi khi tạo đơn hàng: ${error.response?.data?.message || error.message}`
      );
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
    setShowPaymentSuccessDialog(false);
  };

  const handleGoCart = () => {
    navigate("/cart");
    setShowPaymentSuccessDialog(false);
  };

  if (!orderData || !orderSummary || !deliveryInfo) {
    return (
      <>
        <Header />
        <div className="payment-page-container">
          <div className="back-button-container">
            <button onClick={handleGoBack} className="back-button">
              <ArrowLeft size={20} /> QUAY LẠI
            </button>
          </div>
          <div className="loading-message-container">
            <p>{paymentStatus || "Đang tải thông tin đơn hàng..."}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="payment-page-container">
        <div className="back-button-container">
          <button onClick={handleGoBack} className="back-button">
            <ArrowLeft size={20} /> QUAY LẠI
          </button>
        </div>

        <h2 className="page-title">THANH TOÁN</h2>
        <div className="payment-content">
          <div className="order-details-summary">
            <h3>CHI TIẾT ĐƠN HÀNG</h3>
            <div className="order-summary-list">
              {orderData.items.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
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
              <span>{formatPrice(orderSummary.finalTotal)}</span>
            </div>
          </div>

          <div className="payment-method-section">
            <h3>THÔNG TIN GIAO HÀNG</h3>
            <div className="info-row">
              <strong>Người nhận:</strong> <span>{deliveryInfo.fullName}</span>
            </div>
            <div className="info-row">
              <strong>Số điện thoại:</strong> <span>{deliveryInfo.phone}</span>
            </div>
            <div className="info-row full-address">
              <strong>Địa chỉ:</strong>
              <span>{`${deliveryInfo.address}, ${deliveryInfo.ward}, ${deliveryInfo.district}, ${deliveryInfo.province}`}</span>
            </div>
            <h3>PHƯƠNG THỨC THANH TOÁN</h3>
            <div className="payment-options">
              <label
                className={`payment-option-card ${
                  paymentMethod === "bank_transfer" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <CreditCard size={35} className="payment-icon" />
                <span>Thanh toán bằng Chuyển khoản Ngân hàng</span>
              </label>
            </div>

            <button
              className="confirm-payment-btn"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN THANH TOÁN"}
            </button>
            {paymentStatus && (
              <p className="payment-status-message">{paymentStatus}</p>
            )}
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