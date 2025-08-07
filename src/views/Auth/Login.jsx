import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import ConfirmationDialog from "./ConfirmationDialog";
import "./ConfirmationDialog.css";

const Login = () => {
  const [phoneEmail, setPhoneEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginSuccessDialog, setShowLoginSuccessDialog] = useState(false);
  const navigate = useNavigate();

  // Logic to check form validity
  useEffect(() => {
    let isValid = false;
    setErrorMessage("");

    if (!phoneEmail) {
      setErrorMessage("Vui lòng nhập số điện thoại hoặc Email.");
    } else if (!password) {
      setErrorMessage("Vui lòng nhập mật khẩu.");
    } else {
      isValid = true;
    }
    setIsFormValid(isValid);
  }, [phoneEmail, password]);

  // Handle form submission with API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const payload = {
          emailAddress: phoneEmail,
          password: password
        };

        const response = await axios.post(
          'https://be-cosai.onrender.com/api/auth/login',
          payload,
          {
            headers: {
              'accept': '*/*',
              'Content-Type': 'application/json',
            }
          }
        );

        const { accessToken, refreshToken, role } = response.data; // Giả định role có trong response
        if (accessToken && refreshToken) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", phoneEmail);
          localStorage.setItem("userName", "Gia Hưng");
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("role", role || "Customer"); 
          setShowLoginSuccessDialog(true);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setErrorMessage("Thông tin đăng nhập không chính xác. Vui lòng thử lại.");
        } else {
          setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
      }
    }
  };

  const handleLoginSuccessConfirm = () => {
    setShowLoginSuccessDialog(false);
    const userRole = localStorage.getItem("role");
    if (userRole === "Admin") {
      navigate("/admin/products"); // Chuyển hướng đến trang admin nếu là Admin
    } else {
      navigate("/"); // Chuyển hướng về trang chính nếu không phải Admin
    }
  };

  return (
    <>
      <div className="login-page-wrapper">
        <div className="form-container">
          <h2 className="form-title">ĐĂNG NHẬP</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-input-group">
              <input
                type="text"
                id="loginPhoneEmail"
                className="form-input"
                placeholder="Số điện thoại hoặc Email"
                aria-label="Số điện thoại hoặc Email"
                value={phoneEmail}
                onChange={(e) => setPhoneEmail(e.target.value)}
              />
            </div>

            <div className="form-input-group" style={{ marginBottom: "1.5rem" }}>
              <input
                type="password"
                id="loginPassword"
                className="form-input"
                placeholder="Mật khẩu"
                aria-label="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

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
              ĐĂNG NHẬP
            </button>

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
              Bạn chưa có tài khoản?{" "}
              <div onClick={() => navigate("/register")}>Đăng ký</div>
            </p>
          </form>
        </div>
      </div>

      <ConfirmationDialog
        open={showLoginSuccessDialog}
        icon="success"
        title="Đăng nhập thành công!"
        message="Chào mừng bạn quay trở lại! Đang chuyển hướng..."
        primaryButtonText="Tiếp tục"
        onPrimaryButtonClick={handleLoginSuccessConfirm}
        onClose={handleLoginSuccessConfirm}
      />
    </>
  );
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
}