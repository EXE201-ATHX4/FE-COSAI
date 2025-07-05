import React, { useState, useEffect } from "react";
import "./Cart.css";
import { Header } from "../../components/header"; // Assuming Header component exists
import { Footer } from "../../components/footer"; // Assuming Footer component exists
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const navigate = useNavigate();

  // Initialize cartItems from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [selectAll, setSelectAll] = useState(true);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    province: "", // Stores the 'code' from API
    district: "", // Stores the 'code' from API
    ward: "", // Stores the 'code' from API
    saveDefault: false,
  });
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  // States to hold the fetched location data
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // Check if user is logged in on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Derived state for selected items and subtotal
  const selectedItems = cartItems.filter((item) => item.selected);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Calculate shipping fee conditionally
  const [shippingFee, setShippingFee] = useState(0);

  // State for checkout button disabled status
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true);

  // Effect to sync 'selectAll' checkbox with individual item selections
  useEffect(() => {
    setSelectAll(cartItems.every((item) => item.selected));
  }, [cartItems]);

  // --- API Integration for Provinces, Districts, Wards ---
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error loading provinces:", error);
        setProvinces([
          { code: 79, name: "TP. Hồ Chí Minh" },
          { code: 1, name: "Hà Nội" },
          { code: 48, name: "Đà Nẵng" },
        ]);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (shippingInfo.province) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/p/${shippingInfo.province}?depth=2`
          );
          const data = await response.json();
          setDistricts(data.districts || []);
          setWards([]);
          setShippingInfo((prev) => ({ ...prev, district: "", ward: "" }));
        } catch (error) {
          console.error("Error loading districts:", error);
          setDistricts([]);
          setWards([]);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setWards([]);
      setShippingInfo((prev) => ({ ...prev, district: "", ward: "" }));
    }
  }, [shippingInfo.province]);

  useEffect(() => {
    if (shippingInfo.district) {
      const fetchWards = async () => {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/d/${shippingInfo.district}?depth=2`
          );
          const data = await response.json();
          setWards(data.wards || []);
          setShippingInfo((prev) => ({ ...prev, ward: "" }));
        } catch (error) {
          console.error("Error loading wards:", error);
          setWards([]);
        }
      };
      fetchWards();
    } else {
      setWards([]);
      setShippingInfo((prev) => ({ ...prev, ward: "" }));
    }
  }, [shippingInfo.district]);

  // Effect to calculate shipping fee
  useEffect(() => {
    const isShippingInfoComplete =
      shippingInfo.fullName &&
      shippingInfo.phone &&
      shippingInfo.email &&
      shippingInfo.address &&
      shippingInfo.province &&
      shippingInfo.district &&
      shippingInfo.ward;

    if (isShippingInfoComplete && selectedItems.length > 0) {
      setShippingFee(35000);
    } else {
      setShippingFee(0);
    }
  }, [shippingInfo, selectedItems.length]);

  // Effect to manage checkout button disabled state
  useEffect(() => {
    const areAllFieldsFilled =
      shippingInfo.fullName.trim() !== "" &&
      shippingInfo.phone.trim() !== "" &&
      shippingInfo.email.trim() !== "" &&
      shippingInfo.address.trim() !== "" &&
      shippingInfo.province !== "" &&
      shippingInfo.district !== "" &&
      shippingInfo.ward !== "";

    setIsCheckoutDisabled(!(selectedItems.length > 0 && areAllFieldsFilled));
  }, [shippingInfo, selectedItems.length]);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const toggleItemSelection = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: newSelectAll }))
    );
  };

  const removeItem = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const removeSelectedItems = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?")) {
      setCartItems((prevItems) => prevItems.filter((item) => !item.selected));
    }
  };

  const handleShippingInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === "FREESHIP") {
      setDiscountAmount(subtotal * 0.1);
    } else {
      setDiscountAmount(0);
      alert("Mã giảm giá không hợp lệ!");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " ₫";
  };

  const finalTotal = subtotal - discountAmount + shippingFee;

  const handleCheckout = () => {
    const orderData = {
      id: `order_${Date.now()}`,
      items: selectedItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
      })),
      shippingInfo: shippingInfo,

      summary: {
        subtotal: subtotal,
        discountAmount: discountAmount,
        shippingFee: shippingFee,
        finalTotal: finalTotal,
      },
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("orderInfo", JSON.stringify(orderData));
      console.log("Order data saved to localStorage:", orderData);
      navigate("/cart/payment");
    } catch (error) {
      console.error("Failed to save order data to localStorage:", error);
      alert("Có lỗi xảy ra khi lưu thông tin đơn hàng. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ background: "#f2eee5" }}
      >
        <div className="cart-page-container">
          {/* Left Column: Displays cart items and actions */}
          <div className="cart-left-column">
            <div className="cart-header">
              <h2 className="cart-title">GIỎ HÀNG ({cartItems.length})</h2>
            </div>

            <div className="cart-table">
              <div className="table-header">
                <div className="col-product">Sản phẩm</div>
                <div className="col-unit">Đơn vị tính</div>
                <div className="col-price">Đơn giá</div>
                <div className="col-quantity">Số lượng</div>
                <div className="col-total">Số tiền</div>
              </div>

              <div className="cart-items-wrapper">
                {cartItems.length === 0 ? (
                  <div className="empty-cart-message">
                    Giỏ hàng của bạn đang trống.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="col-product">
                        <div className="product-info">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleItemSelection(item.id)}
                            className="item-checkbox"
                          />
                          <div className="product-image">
                            <img src={item.image} alt={item.name} />
                            {item.isNew && (
                              <span className="new-badge">MỚI RA</span>
                            )}
                          </div>
                          <div className="product-details">
                            <div className="brand-logo">
                              {/* <img src={item.brand} alt="Brand" /> */}
                            </div>
                            <h4 className="product-name">{item.name}</h4>
                          </div>
                        </div>
                      </div>

                      <div className="col-unit">
                        <span className="unit-text">{item.volume}</span>
                      </div>

                      <div className="col-price">
                        <span className="price-text">
                          {formatPrice(item.price)}
                        </span>
                      </div>

                      <div className="col-quantity">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn minus"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="quantity-btn plus"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-total">
                        <span className="total-price">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                          title="Xóa sản phẩm"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="cart-footer">
              <div className="footer-left">
                <label className="select-all">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                  <span>Chọn tất cả ({cartItems.length})</span>
                </label>
                <button
                  className="delete-selected"
                  onClick={removeSelectedItems}
                >
                  Xóa sản phẩm
                </button>
              </div>

              <div className="footer-right">
                <span className="total-summary">
                  Tổng thanh toán ({totalItems} sản phẩm):
                  <strong className="total-amount">
                    {formatPrice(subtotal)}
                  </strong>
                </span>
              </div>
            </div>

            <div className="cart-actions">
              <button
                className="back-btn"
                onClick={() => navigate("/products")}
              >
                ← Tiếp tục mua sắm
              </button>
            </div>
          </div>

          {/* Right Column: Contact Information and Order Summary */}
          <div className="cart-right-column">
            <div className="contact-info-section">
              <h3>Thông tin liên hệ</h3>
              <div className="form-group-save-default">
                <input
                  type="checkbox"
                  id="saveDefault"
                  name="saveDefault"
                  checked={shippingInfo.saveDefault}
                  onChange={handleShippingInfoChange}
                />
                <label htmlFor="saveDefault">Lưu thành địa chỉ mặc định</label>
              </div>
              <div className="form-group-inline">
                <div className="input-group">
                  <label htmlFor="fullName">Họ và tên</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Họ và tên"
                    value={shippingInfo.fullName}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Số điện thoại"
                    value={shippingInfo.phone}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group-inline">
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email nhận hóa đơn"
                    value={shippingInfo.email}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="province">Tỉnh/Thành Phố</label>
                  <select
                    id="province"
                    name="province"
                    value={shippingInfo.province}
                    onChange={handleShippingInfoChange}
                    required
                  >
                    <option value="">Chọn Tỉnh/Thành Phố</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group-inline">
                <div className="input-group">
                  <label htmlFor="district">Quận/Huyện</label>
                  <select
                    id="district"
                    name="district"
                    value={shippingInfo.district}
                    onChange={handleShippingInfoChange}
                    disabled={!shippingInfo.province || districts.length === 0}
                    required
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label htmlFor="ward">Phường/Xã</label>
                  <select
                    id="ward"
                    name="ward"
                    value={shippingInfo.ward}
                    onChange={handleShippingInfoChange}
                    disabled={!shippingInfo.district || wards.length === 0}
                    required
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group-full-width">
                <label htmlFor="address">Địa chỉ chi tiết</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Số nhà, tên đường, tên tòa nhà..."
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
            </div>

            <div className="order-details-section">
              <h3>Chi tiết đơn hàng</h3>
              <div className="discount-input">
                <input
                  type="text"
                  placeholder="MÃ GIẢM GIÁ / THẺ QUÀ TẶNG"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button onClick={applyDiscount}>ÁP DỤNG</button>
              </div>
              <div className="note-input">
                <input type="text" placeholder="Lời nhắn cho cửa hàng..." />
              </div>
              <div className="order-summary-row">
                <span>Tạm tính:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="order-summary-row">
                <span>Giảm giá:</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
              <div className="order-summary-row">
                <span>Phí vận chuyển:</span>
                <span>0</span>
              </div>
              <div className="order-summary-row total-row">
                <span>Tổng tiền:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="checkout-btn-right"
                disabled={isCheckoutDisabled}
              >
                ĐẶT HÀNG
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default function CartPage() {
  return <Cart />;
}
