import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { useNavigate } from "react-router-dom";
import "./ConfirmationDialog.css";
import ConfirmationDialog from "./ConfirmationDialog";

const Register = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();

  // Form validation logic
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

  // Handle form submission with API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const payload = activeTab === "email" 
          ? { email, password }
          : { phone, password };

        const response = await axios.post(
          'https://be-cosai.onrender.com/api/auth/register',
          payload,
          {
            headers: {
              'accept': '*/*',
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.status === 200) {
          setShowSuccessDialog(true);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const errors = error.response.data;
          if (typeof errors === 'string') {
            // Handle case where response is a simple string (e.g., "Email is already registered")
            setErrorMessage(errors);
          } else if (Array.isArray(errors)) {
            // Handle array of error objects (e.g., password requirements)
            const errorMessages = errors.map(err => err.description).join(' ');
            setErrorMessage(errorMessages);
          }
        } else {
          setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
      }
    }
  };

  const handleRegisterSuccessConfirm = () => {
    setShowSuccessDialog(false);
    navigate("/login");
  };

  return (
    <>
      <div className="register-page-wrapper">
        <div className="form-container">
          <h2 className="form-title">ĐĂNG KÝ</h2>
          <form onSubmit={handleSubmit}>
            {/* <div className="tab-container">
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
            </div> */}

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

      <ConfirmationDialog
        open={showSuccessDialog}
        icon="success"
        title="Đăng ký thành công!"
        message="Vui lòng kiểm tra email của bạn để xác nhận tài khoản."
        primaryButtonText="Đăng nhập ngay"
        onPrimaryButtonClick={handleRegisterSuccessConfirm}
        onClose={handleRegisterSuccessConfirm}
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