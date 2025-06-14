import React, { useState, useEffect } from "react";
import "./Cart.css";
import { Header } from "../../components/header"; // Assuming Header component exists
import { Footer } from "../../components/footer"; // Assuming Footer component exists
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nước tẩy trang hoa hồng Cocoon",
      volume: "200ml",
      price: 150000,
      quantity: 1,
      image:
        "https://image.cocoonvietnam.com/uploads/z4372805343245_27ea562aa5cabe55737d80cef8acfcb5_e4d50792fc.jpg",
      brand:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrh0Itxav60DHt1xqIvq3574tO-28-GKMdXg&s",
      selected: true,
    },
    {
      id: 2,
      name: "Tẩy da chết cà phê Đắk Lắk Cocoon",
      volume: "150ml",
      price: 165000,
      quantity: 1,
      image:
        "https://image.cocoonvietnam.com/uploads/z4147355364575_e4b88c65711b8261d9c996e6797b60a1_83f203bec3.jpg",
      brand:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrh0Itxav60DHt1xqIvq3574tO-28-GKMdXg&s",
      selected: true,
    },
    {
      id: 3,
      name: "Sữa rửa mặt nghệ Hưng Yên Cocoon",
      volume: "140ml",
      price: 210000,
      quantity: 1,
      image:
        "https://image.cocoonvietnam.com/uploads/z3526709694076_945daa53da7e8d0d674d19b2d92dd792_e41da5dad9.jpg",
      brand:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrh0Itxav60DHt1xqIvq3574tO-28-GKMdXg&s",
      selected: true,
    },
    {
      id: 4,
      name: "Dầu gội bưởi và bồ kết Cocoon",
      volume: "300ml",
      price: 180000,
      quantity: 1,
      image:
        "https://image.cocoonvietnam.com/uploads/W_Zmg_Kym_A_c3f647b8a2.jpeg",
      brand:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrh0Itxav60DHt1xqIvq3574tO-28-GKMdXg&s",
      selected: true,
      isVegan: true,
    },
    {
      id: 5,
      name: "Son dưỡng dầu dừa Bến Tre Cocoon",
      volume: "5g",
      price: 95000,
      quantity: 1,
      image:
        "https://image.cocoonvietnam.com/uploads/Son_duong_dau_dua_26498c9936.jpg",
      brand:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrh0Itxav60DHt1xqIvq3574tO-28-GKMdXg&s",
      selected: true,
      isVegan: true,
    },
  ]);

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

  // --- New state for button disabled status ---
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true);

  // Effect to sync 'selectAll' checkbox with individual item selections
  useEffect(() => {
    setSelectAll(cartItems.every((item) => item.selected));
  }, [cartItems]);

  // --- API Integration for Provinces, Districts, Wards ---

  // Fetches all provinces when the component mounts
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("https://provinces.open-api.vn/api/p/");
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Error loading provinces:", error);
        // Fallback data in case the API call fails
        setProvinces([
          { code: 79, name: "TP. Hồ Chí Minh" },
          { code: 1, name: "Hà Nội" },
          { code: 48, name: "Đà Nẵng" },
        ]);
      }
    };
    fetchProvinces();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Fetches districts when the selected province changes
  useEffect(() => {
    if (shippingInfo.province) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/p/${shippingInfo.province}?depth=2`
          );
          const data = await response.json();
          setDistricts(data.districts || []);
          setWards([]); // Clear wards when province changes
          setShippingInfo((prev) => ({ ...prev, district: "", ward: "" })); // Reset district and ward in shipping info
        } catch (error) {
          console.error("Error loading districts:", error);
          setDistricts([]);
          setWards([]);
        }
      };
      fetchDistricts();
    } else {
      // If no province is selected, clear districts and wards
      setDistricts([]);
      setWards([]);
      setShippingInfo((prev) => ({ ...prev, district: "", ward: "" }));
    }
  }, [shippingInfo.province]); // Dependency: re-run when shippingInfo.province changes

  // Fetches wards when the selected district changes
  useEffect(() => {
    if (shippingInfo.district) {
      const fetchWards = async () => {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/d/${shippingInfo.district}?depth=2`
          );
          const data = await response.json();
          setWards(data.wards || []);
          setShippingInfo((prev) => ({ ...prev, ward: "" })); // Reset ward in shipping info
        } catch (error) {
          console.error("Error loading wards:", error);
          setWards([]);
        }
      };
      fetchWards();
    } else {
      // If no district is selected, clear wards
      setWards([]);
      setShippingInfo((prev) => ({ ...prev, ward: "" }));
    }
  }, [shippingInfo.district]); // Dependency: re-run when shippingInfo.district changes

  // --- End API Integration ---

  // Effect to calculate shipping fee based on shipping info and selected items
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
      setShippingFee(35000); // Apply shipping fee
    } else {
      setShippingFee(0); // No shipping fee
    }
  }, [shippingInfo, selectedItems.length]); // Dependencies: shippingInfo and number of selected items

  // --- New useEffect to manage checkout button disabled state ---
  useEffect(() => {
    const areAllFieldsFilled =
      shippingInfo.fullName.trim() !== "" &&
      shippingInfo.phone.trim() !== "" &&
      shippingInfo.email.trim() !== "" &&
      shippingInfo.address.trim() !== "" &&
      shippingInfo.province !== "" &&
      shippingInfo.district !== "" &&
      shippingInfo.ward !== "";

    // The button is enabled only if there are selected items AND all required fields are filled
    setIsCheckoutDisabled(!(selectedItems.length > 0 && areAllFieldsFilled));
  }, [shippingInfo, selectedItems.length]); // Re-run when shippingInfo or selected items change

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change); // Quantity cannot go below 1
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
    // Custom modal instead of window.confirm for better UX in a real app
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const removeSelectedItems = () => {
    // Custom modal instead of window.confirm for better UX in a real app
    if (window.confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn?")) {
      setCartItems((prevItems) => prevItems.filter((item) => !item.selected));
    }
  };

  // Handler for changes in shipping information input fields
  const handleShippingInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox vs text input
    }));
  };

  // Handler for applying discount code
  const applyDiscount = () => {
    // This is a simplified example. In a real app, validate with backend.
    if (discountCode.toUpperCase() === "FREESHIP") {
      setDiscountAmount(subtotal * 0.1); // Apply 10% discount
    } else {
      setDiscountAmount(0); // No discount
      alert("Mã giảm giá không hợp lệ!"); // Custom modal for alert instead of window.alert
    }
  };

  // Helper function to format price to Vietnamese currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " ₫";
  };

  // Final total calculation
  const finalTotal = subtotal - discountAmount + shippingFee;

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

              {/* Wrapper for cart items to enable internal scrolling if content overflows */}
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
                              {/* Placeholder for brand logo. Replace with actual logo if available. */}
                              <img src={item.brand} alt={item.brand} />
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
                    required // Added required attribute
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
                    required // Added required attribute
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
                    required // Added required attribute
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="province">Tỉnh/Thành Phố</label>
                  <select
                    id="province"
                    name="province"
                    value={shippingInfo.province}
                    onChange={handleShippingInfoChange}
                    required // Added required attribute
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
                    required // Added required attribute
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
                    required // Added required attribute
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
                  required // Added required attribute
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
                <span>{formatPrice(shippingFee)}</span>{" "}
                {/* Display the dynamically calculated shipping fee */}
              </div>
              <div className="order-summary-row total-row">
                <span>Tổng tiền:</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
              <button
                onClick={() => navigate("/cart/payment")}
                className="checkout-btn-right"
                disabled={isCheckoutDisabled} // Apply the disabled state here
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