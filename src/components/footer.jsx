import React from "react";
import "./footer.css"; // Import the new CSS file
import logo from "../assets/logo_no_bg.svg";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Column 1: Logo and Company Info */}
          <div className="footer-section">
            <div className="footer-logo-wrapper">
              <img
                src={logo}
                alt="Logo"
                className="footer-logo-img"
              />
            </div>

            <div>
              <h3 className="section-title">Về chúng tôi</h3>
              <p className="section-description">Cosmetic Selling</p>
              <div className="list-group">
                <p className="list-item">Tra cứu hóa đơn đi</p>
                <p className="list-item">Hệ thống Không Gian</p>
                <p className="list-item">Hợp tác Nhượng Quyền</p>
                <p className="list-item">Đóng góp Ý kiến</p>
              </div>
            </div>

            <div className="copyright-section">
              <h3 className="section-title">
                Bản quyền của Công ty TNHH COSMETIC
              </h3>
              <p className="section-description-relaxed">
                Bản quyền thuộc về Công ty TNHH COSMETIC.
                <br />
                Mọi sản phẩm và dịch vụ đều được bảo hộ theo
                <br />
                luật pháp hiện hành.
              </p>
            </div>
          </div>

          {/* Column 2: Contact Information */}
          <div className="footer-section">
            <h3 className="section-title">Thông tin liên hệ</h3>

            <div className="contact-info-item">
              <span className="contact-icon">🏠</span>
              <span className="contact-label">Hệ thống chi nhánh</span>
            </div>
            <div className="branch-buttons">
              <button className="branch-button">Trụ sở chính</button>
              <button className="branch-button">Địa chỉ kinh doanh</button>
            </div>
            <p className="section-description">
              7 Đ. D1, Long Thạnh Mỹ
              <br />
              Thủ Đức, Hồ Chí Minh{" "}
            </p>

            <div className="contact-info-item">
              <span className="contact-icon">📞</span>
              <span className="contact-label">Điện thoại</span>
            </div>
            <p className="section-description">1900 123 456</p>

            <div className="contact-info-item">
              <span className="contact-icon">✉️</span>
              <span className="contact-label">Email</span>
            </div>
            <p className="section-description">
              cosmeticselling@cosmeticselling
            </p>
          </div>

          {/* Column 3: Company Policies */}
          <div className="footer-section">
            <h3 className="section-title">Chính sách Công ty</h3>
            <div className="list-group">
              <p className="list-item clickable">Chính sách bảo mật</p>
              <p className="list-item clickable">Chính sách đổi trả hàng hoá</p>
              <p className="list-item clickable">Chính sách vận chuyển</p>
              <p className="list-item clickable">Chính sách bảo hành</p>
              <p className="list-item clickable">Hình thức thanh toán</p>
            </div>
          </div>

          {/* Column 4: Facebook Fanpage & Promotion */}
          <div className="footer-section">
            <h3 className="section-title">Fanpage Facebook</h3>

            <div className="social-card">
              <div className="social-header">
                <div className="social-logo-wrapper">
                  <img
                    src={logo}
                    alt="Logo"
                    className="social-logo-img"
                  />
                </div>
                <div>
                  <div className="social-title">COSMETIC SELLING</div>
                  <div className="social-subtitle">Tài khoản doanh nghiệp</div>
                </div>
              </div>

              <button className="facebook-button">
                <span className="facebook-icon">👍</span>
                FACEBOOK
              </button>
            </div>

            <div className="promo-section">
              <p className="promo-title">ĐẶT ĐƠN HÀNG ĐẦU TIÊN NHẬN NGAY</p>
              <p className="promo-discount">MÃ GIẢM GIÁ LÊN ĐẾN 30%</p>

              <button className="register-promo-button">ĐĂNG KÝ TẠI ĐÂY</button>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="footer-bottom-text">
          <p>
            Việc sử dụng trang web này cho thấy bạn tuân thủ chính sách riêng
            tư, điều khoản và điều kiện của chúng tôi
          </p>
        </div>
      </div>
    </footer>
  );
};
