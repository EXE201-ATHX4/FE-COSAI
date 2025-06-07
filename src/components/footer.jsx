import React from "react";

export const Footer = () => {
  return (
    <div
      className="text-white py-8 p-6 m-6"
      style={{ backgroundColor: "#023A15" }}
    >
      <div className="max-w mx-auto px-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Cột 1: Logo và thông tin công ty */}
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg w-32 h-16 flex items-center justify-center mb-4">
              <img
                src="/src/assets/logo_no_bg.svg"
                alt="Logo"
                style={{
                  marginRight: 8,
                  width: 60,
                  height: 60,
                }}
              />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Về chúng tôi</h3>
              <p className="text-sm mb-3">Cosmetic Selling</p>
              <div className="text-sm space-y-1">
                <p>Tra cứu hóa đơn đi</p>
                <p>Hệ thống Không Gian</p>
                <p>Hợp tác Nhượng Quyền</p>
                <p>Đóng góp Ý kiến</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-lg mb-2">
                Bản quyền của Công ty TNHH COSMETIC
              </h3>
              <p className="text-sm leading-relaxed">
                Bản quyền thuộc về Công ty TNHH COSMETIC.
                <br />
                Mọi sản phẩm và dịch vụ đều được bảo hộ theo
                <br />
                luật pháp hiện hành.
              </p>
            </div>
          </div>

          {/* Cột 2: Thông tin liên hệ */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4">Thông tin liên hệ</h3>

            <div>
              <div className="flex items-center mb-3">
                <span className="mr-2">🏠</span>
                <span className="font-semibold">Hệ thống chi nhánh</span>
              </div>
              <div className="flex gap-2 mb-3">
                <button className="border border-white/50 px-3 py-1 rounded text-xs hover:bg-white/10 transition-colors">
                  Trụ sở chính
                </button>
                <button className="border border-white/50 px-3 py-1 rounded text-xs hover:bg-white/10 transition-colors">
                  Địa chỉ kinh doanh
                </button>
              </div>
              <p className="text-sm">
                123 Đường Lê Lợi, Phường Bến Thành,
                <br />
                Quận 1, TP. Hồ Chí Minh
              </p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <span className="mr-2">📞</span>
                <span className="font-semibold">Điện thoại</span>
              </div>
              <p className="text-sm">1900 123 456</p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <span className="mr-2">✉️</span>
                <span className="font-semibold">Email</span>
              </div>
              <p className="text-sm">cosmeticselling@cosmeticselling</p>
            </div>
          </div>

          {/* Cột 3: Chính sách công ty */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4">Chính sách Công ty</h3>
            <div className="space-y-2 text-sm">
              <p className="hover:text-green-200 cursor-pointer transition-colors">
                Chính sách bảo mật
              </p>
              <p className="hover:text-green-200 cursor-pointer transition-colors">
                Chính sách đổi trả hàng hoá
              </p>
              <p className="hover:text-green-200 cursor-pointer transition-colors">
                Chính sách vận chuyển
              </p>
              <p className="hover:text-green-200 cursor-pointer transition-colors">
                Chính sách bảo hành
              </p>
              <p className="hover:text-green-200 cursor-pointer transition-colors">
                Hình thức thanh toán
              </p>
            </div>

            {/* Logo đã đăng ký */}
            <div className="mt-8">
              <div className="bg-red-600 rounded px-4 py-3 w-fit">
                <div className="text-white font-bold text-xs text-center">
                  <div className="flex items-center justify-center mb-1">
                    <span className="mr-2">✓</span>
                    <span>ĐÃ ĐĂNG KÝ</span>
                  </div>
                  <div className="text-xs">BỘ CÔNG THƯƠNG</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cột 4: Fanpage Facebook */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4">Fanpage Facebook</h3>

            {/* Facebook page preview */}
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                  <img
                    src="/src/assets/logo_no_bg.svg"
                    alt="Logo"
                    style={{
                      marginRight: 8,
                      width: 30,
                      height: 30,
                     
                    }}
                  />{" "}
                </div>
                <div>
                  <div className="font-bold text-sm text-white">
                    COSMETIC SELLING
                  </div>
                  <div className="text-xs text-gray-300">
                    Tài khoản doanh nghiệp
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold text-sm mb-4 flex items-center justify-center transition-colors">
                <span className="mr-2">👍</span>
                FACEBOOK
              </button>
            </div>

            <div className="text-center space-y-3">
              <p className="font-semibold text-sm">
                ĐẶT ĐƠN HÀNG ĐẦU TIÊN NHẬN NGAY
              </p>
              <p className="font-bold text-yellow-400 text-lg">
                MÃ GIẢM GIÁ LÊN ĐẾN 30%
              </p>

              <button className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded font-semibold text-sm transition-colors">
                ĐĂNG KÝ TẠI ĐÂY
              </button>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="border-t border-white/20 mt-8 pt-4 text-center">
          <p className="text-xs text-white/80">
            Việc sử dụng trang web này cho thấy bạn tuân thủ chính sách riêng
            tư, điều khoản và điều kiện của chúng tôi
          </p>
        </div>
      </div>
    </div>
  );
};
