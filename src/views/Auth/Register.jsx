import React, { useState, useEffect } from "react";
import "./Register.css";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { useNavigate } from "react-router-dom";
import "./ConfirmationDialog.css"; // Import its CSS
import ConfirmationDialog from "./ConfirmationDialog";

const Register = () => {
  const [activeTab, setActiveTab] = useState("phone");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();

  // Logic kiểm tra form hợp lệ
  useEffect(() => {
    let isValid = false;
    setErrorMessage("");

    if (!fullName) {
      setErrorMessage("Vui lòng nhập họ và tên.");
    } else if (!password) {
      setErrorMessage("Vui lòng nhập mật khẩu.");
    } else if (password.length < 6) {
        setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự.");
    } else if (!confirmPassword) {
      setErrorMessage("Vui lòng xác nhận mật khẩu.");
    } else if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp!");
    } else if (activeTab === "phone") {
      const phoneRegex = /^[0-9]{10,}$/;
      if (!phone) {
        setErrorMessage("Vui lòng nhập số điện thoại.");
      } else if (!phoneRegex.test(phone)) {
        setErrorMessage("Số điện thoại không hợp lệ (ít nhất 10 số).");
      } else {
        isValid = true;
      }
    } else if (activeTab === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        setErrorMessage("Vui lòng nhập Email.");
      } else if (!emailRegex.test(email)) {
        setErrorMessage("Email không hợp lệ.");
      } else {
        isValid = true;
      }
    }

    setIsFormValid(isValid);
  }, [fullName, phone, email, password, confirmPassword, activeTab]);

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log({ fullName, phone, email, password });
      // Simulate API call success
      setShowSuccessDialog(true);
    }
  };

  const handleRegisterSuccessConfirm = () => {
    setShowSuccessDialog(false);
    navigate("/login"); // Navigate to login page
  };

  return (
    <>
      <div className="register-page-wrapper">
        <div className="form-container">
          <h2 className="form-title">ĐĂNG KÝ</h2>
          <form onSubmit={handleSubmit}>
            <div className="tab-container">
              <button
                type="button"
                className={`tab-button ${activeTab === "phone" ? "active" : ""}`}
                onClick={() => setActiveTab("phone")}
              >
                Số điện thoại
              </button>
              <button
                type="button"
                className={`tab-button ${activeTab === "email" ? "active" : ""}`}
                onClick={() => setActiveTab("email")}
              >
                Email
              </button>
            </div>

            <div className="form-input-group">
              <input
                type="text"
                id="fullName"
                className="form-input"
                placeholder="Họ và tên"
                aria-label="Họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {activeTab === "phone" ? (
              <div className="form-input-group">
                <input
                  type="tel"
                  id="registerPhone"
                  className="form-input"
                  placeholder="Số điện thoại"
                  aria-label="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            ) : (
              <div className="form-input-group">
                <input
                  type="email"
                  id="registerEmail"
                  className="form-input"
                  placeholder="Email"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            <div className="form-input-group">
              <input
                type="password"
                id="registerPassword"
                className="form-input"
                placeholder="Mật khẩu"
                aria-label="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-input-group" style={{ marginBottom: '1.5rem' }}>
              <input
                type="password"
                id="confirmPassword"
                className="form-input"
                placeholder="Xác nhận mật khẩu"
                aria-label="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '-1rem', marginBottom: '1rem' }}>
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="primary-button"
              disabled={!isFormValid}
            >
              ĐĂNG KÝ
            </button>

            <div className="options-container">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="checkbox-input"
                />
                <label htmlFor="rememberMe" className="checkbox-label">
                  Ghi nhớ mật khẩu
                </label>
              </div>
              <a href="#" className="forgot-password-link">
                Quên mật khẩu?
              </a>
            </div>

            <div className="divider-container">
              <div className="divider-line"></div>
              <span className="divider-text">HOẶC</span>
              <div className="divider-line"></div>
            </div>

            <div className="social-buttons-container">
              <button type="button" className="social-button">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button type="button" className="social-button">
                <i className="fab fa-google"></i>
              </button>
            </div>

            <p className="login-link-text">
              Bạn đã có tài khoản?{" "}
              <div onClick={() => navigate("/login")}>Đăng nhập</div>
            </p>
          </form>
        </div>
      </div>

      {/* Confirmation Dialog for Register Success */}
      <ConfirmationDialog
        open={showSuccessDialog}
        icon="success"
        title="Đăng ký thành công!"
        message="Tài khoản của bạn đã được tạo. Vui lòng đăng nhập để tiếp tục."
        primaryButtonText="Đăng nhập ngay"
        onPrimaryButtonClick={handleRegisterSuccessConfirm}
        onClose={handleRegisterSuccessConfirm} // Allow closing dialog to also navigate
      />
    </>
  );
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <Register />
      <Footer />
    </>
  );
}