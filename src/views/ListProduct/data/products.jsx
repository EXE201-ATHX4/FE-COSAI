import BotKhuMui from "../../../assets/Sản phẩm/Bot_khu_mui.png";
import GelTam from "../../../assets/Sản phẩm/gel_tam_khuynh_diep.png";
import LotionToc from "../../../assets/Sản phẩm/Lotion_duong_toc_buoi.png";
import KemNghe from "../../../assets/Sản phẩm/kem_nghe_sang_da.png";
import CapAm from "../../../assets/Sản phẩm/Mat_na_cap_am.png";
import RauMa from "../../../assets/Sản phẩm/Mat_na_rau_ma.png";
import MuoiTam from "../../../assets/Sản phẩm/Muoi_tam_ca_phe_cot_dua.png";
import MuoiTayTBC from "../../../assets/Sản phẩm/muoi_tay_te_bao_chet.png";
import SerumCapAm from "../../../assets/Sản phẩm/Serum_cap_am.png";
import RungToc from "../../../assets/Sản phẩm/Serum_ngan_rung_toc.png";
import ChongNang from "../../../assets/Sản phẩm/sua_chong_nang.png";
import TayTBC from "../../../assets/Sản phẩm/tay_te_bao_chet_ca_phe.png";

//Brand
import Cocoon from "../../../assets/Brand/Cocoon.png";
import CoMem from "../../../assets/Brand/CoMem.png";
import Sukin from "../../../assets/Brand/Sukin.png";
import ThoRaKao from "../../../assets/Brand/ThoRaKao.png";
import AROMATICA from "../../../assets/Brand/AROMATICA.png";

export const products = [
  {
    id: "1",
    name: "Sữa Dưỡng Thể Khuynh Diệp & Bạc Hà",
    brand: "Cocoon",
    category: "Dưỡng thể",
    price: 95000, // Giá bán hiện tại (đã là số)
    originalPrice: 125000, // Giá gốc (đã là số)
    salePercent: 10,
    rating: 5,
    reviewCount: 1,
    volume: "140ml",
    description:
      "Với Cấu Trúc Mềm Mịn, Thẩm Thấu Nhanh Và Không Nhờn Rít, Sữa Dưỡng Thể Giúp Nuôi Dưỡng, Cấp Ẩm, Đồng Thời Giúp Thư Giãn Và Mang Lại Làn Da Tươi Mới.",
    freeFrom: [
      "Không chứa cồn",
      "Không dầu khoáng",
      "Không sulfate",
      "Không paraben",
    ],
    ingredients: [
      {
        name: "Tinh dầu khuynh diệp",
        description:
          "Có tác dụng kháng khuẩn, chống viêm, bảo vệ khỏi nhiễm trùng, hương thơm nồng ấm, mang lại sự thư giãn cho tinh thần.",
      },
      {
        name: "Tinh dầu bạc hà",
        description:
          "Có tác dụng làm mát, kháng khuẩn, chống virus, chống oxy hóa và mang đến cảm giác mát lạnh, sảng khoái.",
      },
      {
        name: "Bơ hạt mỡ",
        description:
          "Có tác dụng dưỡng ẩm, chống oxy hóa và giảm tình trạng khô da.",
      },
      {
        name: "Vitamin E (tocopherol)",
        description:
          "Có tác dụng dưỡng ẩm, chống viêm và làm dịu da bị kích ứng và da nhạy cảm.",
      },
    ],
    usage:
      "Thoa sản phẩm lên cơ thể và mát-xa nhẹ nhàng cho đến khi dưỡng chất thẩm thấu.",
    usageDetails: {
      amount: "Vừa đủ mỏng toàn cơ thể",
      scent: "Mùi tinh khuynh diệp & Bạc Hà thanh mát, thư giãn",
      note: "Tránh dùng vùng mắt, chỉ dùng ngoài da",
    },
    images: [
      "https://image.cocoonvietnam.com/uploads/Artboard_21_9d91f1cce4.jpg",
      "https://image.cocoonvietnam.com/uploads/slide_2_b39f5b604c.jpg",
      "https://image.cocoonvietnam.com/uploads/29892137_slide_2_7bad17f974.jpg",
    ],
    brandImage: Cocoon,
    image: "https://image.cocoonvietnam.com/uploads/Artboard_21_9d91f1cce4.jpg",
    promotions: ["Free Shipping"],
  },
  {
    id: "2",
    name: "Tẩy Tế Bào Chết Cà Phê Đắk Lắk",
    brand: "Cocoon",
    category: "Tẩy tế bào chết",
    price: 145000, // Giá bán hiện tại (đã là số)
    originalPrice: 165000, // Giá gốc (đã là số)
    salePercent: 10,
    rating: 4.5,
    reviewCount: 3,
    volume: "200g",
    description:
      "Tẩy tế bào chết toàn thân với hạt cà phê nguyên chất từ Đắk Lắk, giúp làm sạch sâu, tẩy da chết và kích thích tuần hoàn máu.",
    freeFrom: ["Không paraben", "Không dầu khoáng", "Không hạt vi nhựa"],
    ingredients: [
      {
        name: "Hạt cà phê Đắk Lắk",
        description:
          "Giúp loại bỏ tế bào chết, kích thích tuần hoàn máu và làm mịn da.",
      },
      {
        name: "Dầu dừa",
        description: "Dưỡng ẩm và làm mềm da, giàu vitamin E.",
      },
    ],
    usage:
      "Lấy một lượng vừa đủ, massage nhẹ nhàng lên da ẩm, tập trung vào vùng da sần sùi, rửa sạch với nước.",
    usageDetails: {
      amount: "Lấy một lượng vừa đủ cho từng vùng da",
      scent: "Mùi cà phê đắng nhẹ, thơm nồng",
      note: "Sử dụng 2-3 lần/tuần, không dùng cho da đang bị tổn thương",
    },
    images: [
      "https://image.cocoonvietnam.com/uploads/26fb6ffcb3c3709d29d2_436613e656.jpg",
      "https://image.cocoonvietnam.com/uploads/slide_2_f7524fc1ef.jpg",
      "https://image.cocoonvietnam.com/uploads/29892144_slide_2_a241a3841e.jpg",
    ],
    brandImage: CoMem,
    image: TayTBC,
  },
  {
    id: "3",
    name: "Gel Tắm Khuynh Diệp",
    brand: "Cocoon",
    category: "Dưỡng da",
    price: 220000, // Giá bán hiện tại (đã là số)
    originalPrice: 245000, // Giá gốc (đã là số)
    salePercent: 10,
    rating: 4.7,
    reviewCount: 2,
    volume: "310ml",
    description:
      "Gel tẩm khuynh diệp giúp làm dịu da, giảm mụn và kháng khuẩn tự nhiên. Sản phẩm phù hợp cho da dầu và da mụn.",
    freeFrom: ["Không cồn", "Không paraben", "Không silicone"],
    ingredients: [
      {
        name: "Tinh dầu khuynh diệp",
        description: "Kháng khuẩn, giảm viêm và làm dịu da bị kích ứng.",
      },
      {
        name: "Nha đam",
        description: "Làm dịu, cấp ẩm và phục hồi da.",
      },
    ],
    usage: "Thoa một lớp mỏng lên vùng da cần điều trị, để khô tự nhiên.",
    usageDetails: {
      amount: "Một lớp mỏng cho vùng da cần điều trị",
      scent: "Mùi khuynh diệp tươi mát, thơm nhẹ",
      note: "Có thể sử dụng hàng ngày, tránh tiếp xúc với mắt",
    },
    images: [
      "https://image.cocoonvietnam.com/uploads/z4487535386831_5d2ae0d784dfe2e5188ff800f823607b_6e19452e83.jpg",
      "https://image.cocoonvietnam.com/uploads/slide_2_ea2a3993e0.jpg",
      "https://image.cocoonvietnam.com/uploads/web_62d54dfa49.jpg",
    ],
    brandImage: Cocoon,
    image: GelTam,
    promotions: ["Free Shipping"],
  },
  {
    id: "4",
    name: "Bột Khử Mùi Thiên Nhiên",
    brand: "Cỏ Mềm",
    category: "Mặt nạ",
    price: 115000, // Giá hiện tại (đã là số). Nếu không có sale, price = originalPrice
    originalPrice: 115000, // Giá gốc (đã là số)
    salePrice: null, // Giữ lại salePrice nếu cần biết giá đã giảm, nhưng không dùng để lọc
    salePercent: null,
    rating: 4.6,
    reviewCount: 2,
    volume: "50g",
    description:
      "Bột hoa mùi điền thanh giúp làm sạch sâu, se khít lỗ chân lông và làm dịu da. Phù hợp cho da dầu và da mụn.",
    freeFrom: [
      "Không hương liệu nhân tạo",
      "Không chất bảo quản",
      "100% từ thiên nhiên",
    ],
    ingredients: [
      {
        name: "Hoa mùi điền thanh",
        description: "Làm dịu da, giảm viêm và kháng khuẩn tự nhiên.",
      },
      {
        name: "Đất sét trắng",
        description: "Hút dầu, làm sạch sâu và se khít lỗ chân lông.",
      },
    ],
    usage:
      "Trộn với nước hoặc nước hoa hồng tạo thành hỗn hợp sệt, thoa đều lên mặt, để khô 15 phút và rửa sạch.",
    usageDetails: {
      amount: "1-2 thìa cà phê trộn với nước tạo hỗn hợp sệt",
      scent: "Mùi thảo mộc nhẹ nhàng, tự nhiên",
      note: "Sử dụng 1-2 lần/tuần, tránh vùng mắt và môi",
    },
    images: [
      "https://media.comem.vn/uploads/2024/07/srm_tram_tra_(10)_sp2x.webp",
      "https://media.comem.vn/uploads/January2023/the-chat-bot-khu-mui-wingsup_sp2x.webp",
      "https://media.comem.vn/uploads/May2022/thanh-phan-thuoc-khu-mui-co-mem_55_sp2x.webp",
    ],
    brandImage: CoMem,
    image: BotKhuMui,
  },
  {
    id: "5",
    name: "Mặt Nạ Cấp Ẩm Căng Mịn Da Hydrating Facial Masque",
    brand: "Sukin",
    category: "Mặt nạ",
    price: 85000, // Giá bán hiện tại (đã là số)
    originalPrice: 95000, // Giá gốc (đã là số)
    salePercent: 10,
    rating: 4.9,
    reviewCount: 1,
    volume: "100ml",
    description:
      "Mặt nạ cấp ẩm chuyên sâu với chiết xuất từ lô hội và hyaluronic acid, giúp phục hồi độ ẩm và làm mềm da.",
    freeFrom: ["Không paraben", "Không cồn", "Không dầu khoáng"],
    ingredients: [
      {
        name: "Hyaluronic Acid",
        description: "Giữ nước và cấp ẩm chuyên sâu cho da.",
      },
      {
        name: "Chiết xuất lô hội",
        description: "Làm dịu, cấp ẩm và phục hồi da.",
      },
    ],
    usage:
      "Thoa một lớp dày lên da sạch, để trong 15-20 phút, rửa sạch hoặc vỗ nhẹ để thẩm thấu.",
    usageDetails: {
      amount: "Một lớp dày đều khắp mặt",
      scent: "Không mùi, phù hợp cho da nhạy cảm",
      note: "Sử dụng 2-3 lần/tuần, có thể để qua đêm như mặt nạ ngủ",
    },
    images: [
      "https://i.makeup.com.ua/bc/l/lx/lxn89rmjnewb.jpg",
      "https://bizweb.dktcdn.net/thumb/grande/100/374/252/products/matnaduongamsangmindasukinhydr-ce44ac15-11cd-4e3d-84c8-78209b69af56.jpg?v=1708955489543",
      "https://salt.tikicdn.com/media/catalog/producttmp/53/19/b3/7390f831e8c887d4c546996eff884c15.jpg",
    ],
    brandImage: Sukin,
    image: CapAm,
    promotions: ["Free Shipping"],
  },
  {
    id: "6",
    name: "Kem Nghệ Sáng Da, Ngừa Mụn",
    brand: "Thorakao",
    category: "Kem dưỡng",
    price: 165000, // Giá bán hiện tại (đã là số)
    originalPrice: 185000, // Giá gốc (đã là số)
    salePercent: 10,
    rating: 4.5,
    reviewCount: 3,
    volume: "30ml",
    description:
      "Kem nghệ với công thức đặc biệt giúp làm sáng da, ngừa mụn và mờ thâm. Sản phẩm phù hợp cho da dầu và da mụn.",
    freeFrom: ["Không paraben", "Không cồn", "Không dầu khoáng"],
    ingredients: [
      {
        name: "Tinh chất nghệ",
        description: "Chống viêm, kháng khuẩn và làm sáng da.",
      },
      {
        name: "Vitamin C",
        description: "Làm sáng da, mờ thâm và chống oxy hóa.",
      },
    ],
    usage: "Thoa một lượng nhỏ lên vùng da cần điều trị, sử dụng buổi tối.",
    usageDetails: {
      amount: "Một lượng nhỏ bằng hạt đậu",
      scent: "Mùi nghệ nhẹ, thơm tự nhiên",
      note: "Sử dụng buổi tối, tránh tiếp xúc với ánh nắng trực tiếp sau khi sử dụng",
    },
    images: [
      "https://thorakao.com/wp-content/uploads/2024/11/164.png",
      "https://thorakao.com/wp-content/uploads/2024/10/166.png",
      "https://thorakao.com/wp-content/uploads/2024/10/167.png",
    ],
    brandImage: ThoRaKao,
    image: KemNghe,
    promotions: ["Free Shipping"],
  },
  {
    id: "7",
    name: "Muối Tắm Cà Phê Cốt Dừa",
    brand: "Cỏ Mềm",
    category: "Serum",
    price: 245000, // Giá hiện tại (đã là số)
    originalPrice: 245000, // Giá gốc (đã là số)
    salePrice: null,
    salePercent: null,
    rating: 4.8,
    reviewCount: 1,
    volume: "250g",
    description:
      "Serum cấp ẩm chuyên sâu với thành phần hyaluronic acid và vitamin B5, giúp phục hồi da thâm và tăng cường hàng rào bảo vệ da.",
    freeFrom: ["Không paraben", "Không cồn", "Không hương liệu nhân tạo"],
    ingredients: [
      {
        name: "Hyaluronic Acid",
        description: "Cấp ẩm chuyên sâu và giữ nước cho da.",
      },
      {
        name: "Vitamin B5",
        description: "Phục hồi da và tăng cường hàng rào bảo vệ da.",
      },
    ],
    usage:
      "Thoa 2-3 giọt lên da sạch, vỗ nhẹ để thẩm thấu, sử dụng sáng và tối.",
    usageDetails: {
      amount: "2-3 giọt cho toàn mặt",
      scent: "Không mùi hoặc mùi rất nhẹ",
      note: "Sử dụng sau bước toner, trước kem dưỡng",
    },
    images: [
      "https://media.comem.vn/uploads/June2022/tay-da-chet-ca-phe-cot-dua-co-mem.webp",
      "https://down-vn.img.susercontent.com/file/30fed78fe05dd3d46164af7cac9212b8",
      "https://cf.shopee.vn/file/02deaf7c292de23dbb2f8a295429eb4f",
    ],
    brandImage: CoMem,
    image: MuoiTam,
    promotions: ["Free Shipping"],
  },
  {
    id: "8",
    name: "Mặt Nạ Ngừa Mụn Rau Má",
    brand: "Cỏ Mềm",
    category: "Mặt nạ",
    price: 189000, // Giá bán hiện tại (đã là số)
    originalPrice: 210000, // Giá gốc (đã là số)
    salePercent: 10,
    rating: 4.7,
    reviewCount: 1,
    volume: "100ml",
    description:
      "Mặt nạ dưỡng ẩm chuyên sâu với chiết xuất từ lô hội, vitamin E và dầu hạt jojoba, giúp phục hồi độ ẩm và làm mềm da khô.",
    freeFrom: [
      "Không paraben",
      "Không sulfate",
      "Không hương liệu nhân tạo",
      "Không chất bảo quản",
    ],
    ingredients: [
      {
        name: "Chiết xuất lô hội",
        description: "Làm dịu, cấp ẩm và phục hồi da.",
      },
      {
        name: "Dầu hạt jojoba",
        description: "Dưỡng ẩm sâu và cân bằng dầu tự nhiên của da.",
      },
      {
        name: "Vitamin E",
        description: "Chống oxy hóa và bảo vệ da khỏi tác hại của môi trường.",
      },
    ],
    usage:
      "Thoa một lớp dày lên da sạch, để trong 15-20 phút, rửa sạch với nước ấm.",
    usageDetails: {
      amount: "Một lớp dày vừa phải, đủ để che phủ da",
      scent: "Mùi thảo mộc nhẹ nhàng, thư giãn",
      note: "Sử dụng 1-2 lần/tuần, có thể kết hợp với máy xông hơi để tăng hiệu quả",
    },
    images: [
      "https://vn-test-11.slatic.net/p/a0fabb760de8c9891c37677467c23890.jpg",
      "https://media.comem.vn/uploads/2024/08/z5707047693517_8570a10a5e3fe521e642c520b58c4b47_74_sp2x.webp",
      "https://vn-test-11.slatic.net/p/006b1cf942a649ae24a08580a7b35558.jpg",
    ],
    brandImage: CoMem,
    image: RauMa,
    promotions: ["Free Shipping"],
  },
  {
    id: "9",
    name: "Serum Cấp Ẩm Phục Hồi Tơ Tằm",
    brand: "Cỏ mềm",
    category: "Serum",
    price: 245000, // Giá hiện tại (đã là số)
    originalPrice: 245000, // Giá gốc (đã là số)
    salePrice: null,
    salePercent: null, // Thay vì "30%" là chuỗi, hãy tính toán salePercent dựa trên giá số
    rating: 5,
    reviewCount: 2,
    volume: "30ml",
    description:
      "Serum cấp ẩm chuyên sâu với thành phần tơ tằm và vitamin B5, giúp phục hồi da thâm và tăng cường hàng rào bảo vệ da.",
    freeFrom: ["Không paraben", "Không cồn", "Không hương liệu nhân tạo"],
    ingredients: [
      {
        name: "Tơ tằm",
        description: "Cấp ẩm chuyên sâu và giữ nước cho da.",
      },
      {
        name: "Vitamin B5",
        description: "Phục hồi da và tăng cường hàng rào bảo vệ da.",
      },
    ],
    usage:
      "Thoa 2-3 giọt lên da sạch, vỗ nhẹ để thẩm thấu, sử dụng sáng và tối.",
    usageDetails: {
      amount: "2-3 giọt cho toàn mặt",
      scent: "Mùi tơ tằm nhẹ nhàng, tinh tế",
      note: "Sử dụng trước kem dưỡng, có thể kết hợp với các sản phẩm cùng dòng để tăng hiệu quả",
    },
    images: [
      "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mato3zq2pi182c",
      "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mato3v7hbfrg6f",
      "https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m5ux592x8njq39",
    ],
    brandImage: CoMem,
    image: SerumCapAm,
    promotions: ["Free Shipping"],
  },
  {
    id: "10",
    name: "Serum Ngăn rụng tóc Bưởi",
    brand: "Thorakao",
    category: "Chăm sóc tóc",
    price: 272000, // Giá hiện tại (đã là số)
    originalPrice: 272000, // Giá gốc (đã là số)
    salePrice: null,
    salePercent: null,
    rating: 4,
    reviewCount: 1,
    volume: "75ml",
    description:
      "Serum ngăn rụng tóc với chiết xuất từ vỏ bưởi, giúp kích thích mọc tóc, ngăn rụng và làm tóc chắc khỏe.",
    freeFrom: ["Không paraben", "Không sulfate", "Không silicone"],
    ingredients: [
      {
        name: "Chiết xuất vỏ bưởi",
        description: "Kích thích mọc tóc, ngăn rụng và làm tóc chắc khỏe.",
      },
      {
        name: "Biotin",
        description: "Nuôi dưỡng tóc từ gốc, giúp tóc mọc khỏe mạnh.",
      },
    ],
    usage: "Thoa lên da đầu sạch, massage nhẹ nhàng, để khô tự nhiên.",
    usageDetails: {
      amount: "5-10 giọt cho toàn da đầu",
      scent: "Mùi bưởi tươi mát, thơm nhẹ",
      note: "Sử dụng hàng ngày, tốt nhất là sau khi gội đầu khi tóc còn ẩm",
    },
    images: [
      "https://cf.shopee.vn/file/020c7ef7b5ea7739d74252430e5eeb01_tnhttps://down-vn.img.susercontent.com/file/a94de6d81dbd3d28d62b36dcb9aa9a7f",
      "https://thorakao.com/wp-content/uploads/2024/02/an23.png",
      "https://dangcapphaidep.vn/resize/780-780/upload/2025/03/19/files/Serum-duong-toc-Thorakao-kich-thich-moc-toc-75ml2.png",
    ],
    brandImage: ThoRaKao,
    image: RungToc,
    promotions: ["Free Shipping"],
  },
  {
    id: "11",
    name: "Lotion Dưỡng Tóc Tinh Dầu Bưởi",
    brand: "Thorakao",
    category: "Chăm sóc tóc",
    price: 227000, // Giá hiện tại (đã là số)
    originalPrice: 227000, // Giá gốc (đã là số)
    salePrice: null,
    salePercent: null,
    rating: 5,
    reviewCount: 2,
    volume: "120ml",
    description:
      "Lotion dưỡng tóc với tinh dầu bưởi, giúp nuôi dưỡng tóc, ngăn rụng và làm tóc mềm mượt.",
    freeFrom: ["Không paraben", "Không sulfate", "Không silicone"],
    ingredients: [
      {
        name: "Tinh dầu bưởi",
        description: "Kích thích mọc tóc, ngăn rụng và làm tóc chắc khỏe.",
      },
      {
        name: "Keratin",
        description: "Phục hồi tóc hư tổn, làm tóc mềm mượt.",
      },
    ],
    usage: "Thoa lên tóc ẩm hoặc khô, không cần xả lại.",
    usageDetails: {
      amount: "Một lượng vừa đủ cho độ dài tóc",
      scent: "Mùi bưởi thơm mát, kéo dài",
      note: "Có thể sử dụng hàng ngày, không cần xả lại",
    },
    images: [
      "https://trungtamytengabay.vn/wp-content/uploads/2024/01/review-tinh-dau-buoi-thorakao-kich-thich-moc-toc-co-tot-khong-1047.jpg",
      "https://thorakao.com/wp-content/uploads/2024/02/buoi-3.png",
      "https://thorakao.com/wp-content/uploads/2024/02/reszie-ac.jpg",
    ],
    brandImage: ThoRaKao,
    image: LotionToc,
    promotions: ["Free Shipping"],
  },
  {
    id: "12",
    name: "Muối Tẩy Tế Bào Chết Da Đầu",
    brand: "AROMATICA",
    category: "Chăm sóc tóc",
    price: 258000, // Giá bán hiện tại (đã là số)
    originalPrice: 468000, // Giá gốc (đã là số)
    salePercent: 45,
    rating: 5,
    reviewCount: 1,
    volume: "105g",
    description:
      "Muối tẩy tế bào chết da đầu giúp loại bỏ bã nhờn, tế bào chết và cặn dầu gội, giúp da đầu sạch sẽ và khỏe mạnh.",
    freeFrom: ["Không paraben", "Không sulfate", "Không silicone"],
    ingredients: [
      {
        name: "Muối biển",
        description: "Loại bỏ tế bào chết và làm sạch da đầu.",
      },
      {
        name: "Tinh dầu bạc hà",
        description: "Làm mát, kháng khuẩn và mang lại cảm giác sảng khoái.",
      },
    ],
    usage:
      "Thoa lên da đầu ẩm, massage nhẹ nhàng, để trong 5-10 phút và gội sạch.",
    usageDetails: {
      amount: "1-2 thìa cà phê cho toàn da đầu",
      scent: "Mùi bạc hà mát lạnh, sảng khoái",
      note: "Sử dụng 1-2 lần/tuần, trước khi gội đầu",
    },
    images: [
      "https://cf.shopee.vn/file/b383583927dc23a190961f79e6e2ced0",
      "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljmig6v8hwcid3",
      "https://image.hsv-tech.io/bbx/common/c33b29ae-bf22-454d-906d-d1e80c596d2a.webp",
    ],
    brandImage: AROMATICA,
    image: MuoiTayTBC,
    promotions: ["Free Shipping"],
  },
  {
    id: "13",
    name: "Gel Rửa Mặt Bí Đao",
    brand: "Cocoon",
    category: "Chăm sóc da",
    price: 115000,
    originalPrice: 145000,
    salePercent: 21,
    rating: 4.7,
    reviewCount: 2,
    volume: "140ml",
    description: "Làm sạch da, hỗ trợ giảm dầu và mụn với chiết xuất bí đao.",
    freeFrom: ["Không paraben", "Không cồn", "Không sulfate"],
    ingredients: [
      { name: "Chiết xuất bí đao", description: "Làm dịu và thanh lọc da." },
      { name: "Tràm trà", description: "Kháng khuẩn, giảm viêm." },
    ],
    usage: "Làm ướt mặt, lấy một lượng vừa đủ, massage nhẹ và rửa sạch.",
    usageDetails: {
      amount: "1-2 lần mỗi ngày",
      scent: "Hương thảo mộc dịu nhẹ",
      note: "Phù hợp với da dầu, mụn",
    },
    images: [
      "https://file.hstatic.net/1000006063/file/1_63a33e890b0a4d87b8b9485849114812_master.jpg",
      "https://product.hstatic.net/200000551679/product/31989099_slide_2_9583e65dc4__1__ad0ef03a26d2481a9b14016a98363199_1024x1024.jpg",
      "https://lusibeauty.com/wp-content/uploads/2023/06/gel-rua-mat-bi-dao-cocoon-lam-giam-dau-mun-6.jpg",
    ],
    brandImage: Cocoon,
    image:
      "https://image.cocoonvietnam.com/uploads/z3526520930085_8478409d6ac4058a7b77514ce71bdada_d14a16f231.jpg",
    promotions: ["Free Shipping"],
  },
  {
    id: "14",
    name: "Dầu Gội Vỏ Bưởi",
    brand: "Cỏ Mềm",
    category: "Chăm sóc tóc",
    price: 169000,
    originalPrice: 199000,
    salePercent: 15,
    rating: 4.5,
    reviewCount: 1,
    volume: "250ml",
    description:
      "Giúp tóc chắc khỏe, giảm gãy rụng với tinh dầu vỏ bưởi tự nhiên.",
    freeFrom: ["Không sulfate", "Không silicon"],
    ingredients: [
      { name: "Vỏ bưởi", description: "Giúp mọc tóc, giảm rụng." },
      { name: "Bồ kết", description: "Làm sạch nhẹ nhàng da đầu." },
    ],
    usage: "Làm ướt tóc, thoa dầu gội, massage nhẹ nhàng rồi xả sạch với nước.",
    usageDetails: {
      amount: "5-10ml cho mỗi lần gội",
      scent: "Thơm mát tự nhiên từ bưởi",
      note: "Dùng 2-3 lần/tuần",
    },
    images: [
      "https://media.comem.vn/uploads/August2023/dau-goi-thao-duoc-toc-may-4_sp2x.webp",
      "https://static.comem.vn/uploads/2025/04/Artboard_182x-100.jpg",
      "https://static.comem.vn/uploads/August2023/dau-goi-thao-duoc-toc-may-1.jpg",
    ],
    brandImage: CoMem,
    image: "https://media.comem.vn/uploads/2024/07/srm_tram_tra_(8).webp",
    promotions: ["Free Shipping"],
  },
  {
    id: "15",
    name: "Kem Dưỡng Trắng Da Ngọc Trai",
    brand: "Thorakao",
    category: "Chăm sóc da",
    price: 62000,
    originalPrice: 75000,
    salePercent: 17,
    rating: 4.2,
    reviewCount: 3,
    volume: "30g",
    description: "Dưỡng trắng da mặt, làm mờ thâm nám từ ngọc trai tự nhiên.",
    freeFrom: ["Không paraben"],
    ingredients: [
      { name: "Bột ngọc trai", description: "Làm sáng da tự nhiên." },
      { name: "Vitamin E", description: "Giữ ẩm và chống oxy hóa." },
    ],
    usage: "Thoa đều lên da sau bước làm sạch và toner.",
    usageDetails: {
      amount: "Một lượng bằng hạt đậu",
      scent: "Nhẹ nhàng, truyền thống",
      note: "Sử dụng sáng và tối",
    },
    images: [
      "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m2ixpt331l82a3",
      "https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m129yw2wl7kv36",
      "https://thorakao.com/wp-content/uploads/2024/02/sd1.png",
    ],
    brandImage: ThoRaKao,
    image:
      "https://bizweb.dktcdn.net/thumb/grande/100/426/039/products/kemduongdawhitesuadevangoctrai.png?v=1640340734790",
    promotions: ["Free Shipping"],
  },
  {
    id: "16",
    name: "Sữa Rửa Mặt Tinh Chất Tràm Trà",
    brand: "Sukin",
    category: "Chăm sóc da",
    price: 245000,
    originalPrice: 289000,
    salePercent: 15,
    rating: 4.8,
    reviewCount: 2,
    volume: "125ml",
    description: "Làm sạch sâu, kháng khuẩn và hỗ trợ ngừa mụn.",
    freeFrom: ["Không sulfate", "Không paraben", "Không dầu khoáng"],
    ingredients: [
      { name: "Tinh dầu tràm trà", description: "Kháng viêm và làm sạch." },
      { name: "Lô hội", description: "Làm dịu da." },
    ],
    usage: "Rửa mặt 2 lần/ngày với lượng vừa đủ.",
    usageDetails: {
      amount: "1-2 giọt",
      scent: "Tràm trà mát lạnh",
      note: "Dành cho da dầu, da mụn",
    },
    images: [
      "https://classic.vn/wp-content/uploads/2022/07/sukin_for_men_facial_cleanser_225ml-1.webp",
      "https://down-vn.img.susercontent.com/file/vn-11134201-7qukw-lijmtmm4t6tuaf",
      "https://nubeauty.com.vn/wp-content/uploads/2020/04/kem-Sukin-For-Men-nubeauty-3.jpg",
    ],
    brandImage: Sukin,
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjzACaBpcZR-G5342SlUHkOqLx8v53Beln9rBVPRN5ZYLq6xORBuVDDY12R5nrYr9leRIKOUy02czUo6miBgWkrCqvnUzLLHCAJCf2VStm8o8DerfbgFdL7SAI2uLF0IlyFKxpIf1S_QXE/s640/capture_8b3ffa77eb394d3896a91768cfe827cb_grande.png",
    promotions: ["Free Shipping"],
  },
  {
    id: "17",
    name: "Tinh Dầu Dưỡng Tóc Hương Thảo",
    brand: "AROMATICA",
    category: "Chăm sóc tóc",
    price: 310000,
    originalPrice: 389000,
    salePercent: 20,
    rating: 4.9,
    reviewCount: 3,
    volume: "100ml",
    description: "Nuôi dưỡng tóc từ chân đến ngọn, giúp tóc bóng khỏe.",
    freeFrom: ["Không silicone", "Không sulfate"],
    ingredients: [
      { name: "Tinh dầu hương thảo", description: "Kích thích mọc tóc." },
      { name: "Dầu jojoba", description: "Dưỡng ẩm, bảo vệ tóc." },
    ],
    usage: "Thoa lên tóc khô hoặc ẩm, tập trung phần ngọn.",
    usageDetails: {
      amount: "2-3 giọt/lần",
      scent: "Thảo mộc thư giãn",
      note: "Dùng sau khi gội hoặc trước khi sấy tóc",
    },
    images: [
      "https://media.hcdn.vn/catalog/product/g/o/google-shopping-xit-duong-chan-toc-aromatica-chiet-xuat-huong-thao-100ml-1692420869.jpg",
      "https://file.hstatic.net/200000551679/file/thiet_ke_chua_co_ten__64__bcc7ba_8b4d43305b4142cea2d09d00139ea595_1024x1024.png",
      "https://product.hstatic.net/1000006063/product/aromatica_copy_94d28b0364744136be9f10c10bb31475_grande.jpg",
    ],
    brandImage: AROMATICA,
    image:
      "https://product.hstatic.net/200000868185/product/06ec6.png_720x720q80-removebg-preview_33b7539766a44e4a94396e089339bbf9_8b43249b903944a29c97831e7a2f4140.png",
    promotions: ["Free Shipping"],
  },
  {
    id: "18",
    name: "Mặt Nạ Bí Đao",
    brand: "Cocoon",
    category: "Chăm sóc da",
    price: 145000,
    originalPrice: 175000,
    salePercent: 17,
    rating: 4.8,
    reviewCount: 4,
    volume: "100ml",
    description: "Mặt nạ bí đao làm dịu da, kiểm soát dầu và giảm mụn.",
    freeFrom: ["Không paraben", "Không cồn", "Không hương liệu"],
    ingredients: [
      { name: "Bí đao", description: "Giảm viêm và làm dịu da." },
      { name: "Rau má", description: "Tái tạo và phục hồi da." },
    ],
    usage: "Đắp lên da 10–15 phút rồi rửa sạch với nước.",
    usageDetails: {
      amount: "1-2 lần/tuần",
      scent: "Thảo mộc nhẹ nhàng",
      note: "Không dùng cho vùng mắt",
    },
    images: [
      "https://image.cocoonvietnam.com/uploads/29892179_slide_2_f8cd24ff3d.jpg",
      "https://file.hstatic.net/1000006063/file/review_mat_na_bi_dao_cocoon_2f28d46a334c4b3ea8d8f79d962ff852_grande.jpg",
      "https://bizweb.dktcdn.net/thumb/1024x1024/100/345/186/products/5160-h-nh-21.jpg?v=1617007675440",
    ],
    brandImage: Cocoon,
    image:
      "https://product.hstatic.net/200000868185/product/cocoon_1_305e8f750ca249d2924882cb00fef2e5_51814255e4e14534b45d5641d3283f45_master.png",
    promotions: ["Free Shipping"],
  },
  {
    id: "19",
    name: "Dầu Gội Thảo Mộc Bồ Kết",
    brand: "Cỏ Mềm",
    category: "Chăm sóc tóc",
    price: 185000,
    originalPrice: 210000,
    salePercent: 12,
    rating: 4.6,
    reviewCount: 1,
    volume: "300ml",
    description: "Gội sạch nhẹ nhàng, giúp tóc chắc khỏe từ thiên nhiên.",
    freeFrom: ["Không sulfate", "Không hương liệu"],
    ingredients: [
      { name: "Bồ kết", description: "Làm sạch tóc tự nhiên." },
      { name: "Vỏ bưởi", description: "Giúp mọc tóc." },
    ],
    usage: "Gội đầu như bình thường, massage nhẹ rồi xả sạch.",
    usageDetails: {
      amount: "5-10ml mỗi lần",
      scent: "Hương thảo mộc truyền thống",
      note: "Phù hợp với tóc yếu, dễ rụng",
    },
    images: [
      "https://vn-test-11.slatic.net/p/669daa9357e9268855533c7af31e5def.jpg",
      "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mbdj0w8of7bs2b",
      "https://static.comem.vn/uploads/August2023/dau-goi-thao-duoc-toc-may-1.jpg",
    ],
    brandImage: CoMem,
    image: "https://images.soco.id/2d9053df-e4a3-445f-ab51-a290fc72d263-.jpg",
    promotions: ["Free Shipping"],
  },
  {
    id: "20",
    name: "Sữa Rửa Mặt Nghệ",
    brand: "Thorakao",
    category: "Chăm sóc da",
    price: 54000,
    originalPrice: 69000,
    salePercent: 22,
    rating: 4.3,
    reviewCount: 1,
    volume: "100ml",
    description: "Làm sạch da và hỗ trợ làm sáng từ tinh chất nghệ.",
    freeFrom: [],
    ingredients: [
      { name: "Tinh chất nghệ", description: "Làm sáng và mờ thâm." },
      { name: "Vitamin B3", description: "Làm đều màu da." },
    ],
    usage: "Lấy lượng vừa đủ, tạo bọt và rửa mặt nhẹ nhàng.",
    usageDetails: {
      amount: "2 lần/ngày",
      scent: "Hương nhẹ từ nghệ",
      note: "Phù hợp với mọi loại da",
    },
    images: [
      "https://vn-live-01.slatic.net/p/ddbe42e1aecdfb848bf586ed01aa7ec5.jpg",
      "https://thorakao.com/wp-content/uploads/2024/10/2-23.png",
      "https://product.hstatic.net/1000134629/product/z6070672359848_3bc95717d64708723a24df2d7da99011_f464b551de29493b96b22a810ba59717.jpg",
    ],
    brandImage: ThoRaKao,
    image:
      "https://thorakaocaugiay.com/wp-content/uploads/2020/11/Sua-rua-mat-hat-nghe-ngua-mun-Thorakao-100g_tcg.jpg",
    promotions: ["Free Shipping"],
  },
  {
    id: "21",
    name: "Kem Dưỡng Da Ban Đêm",
    brand: "Sukin",
    category: "Chăm sóc da",
    price: 320000,
    originalPrice: 390000,
    salePercent: 18,
    rating: 4.7,
    reviewCount: 3,
    volume: "120ml",
    description: "Kem dưỡng ẩm sâu phục hồi da trong khi ngủ.",
    freeFrom: ["Không paraben", "Không dầu khoáng"],
    ingredients: [
      { name: "Bơ hạt mỡ", description: "Dưỡng ẩm và phục hồi." },
      { name: "Lô hội", description: "Làm dịu da." },
    ],
    usage: "Thoa kem vào buổi tối sau bước serum.",
    usageDetails: {
      amount: "1 lượng mỏng phủ đều mặt",
      scent: "Thơm nhẹ tự nhiên",
      note: "Dành cho mọi loại da",
    },
    images: [
      "https://www.organicbrands.gr/files/images/news/night-3.jpg",
      "https://healthybuzz.ie/cdn/shop/files/6000204223368_1500x1500.jpg?v=1683719109",
      "https://www.organicbrands.gr/files/images/news/SUKIN.jpg",
    ],
    brandImage: Sukin,
    image:
      "https://product.hstatic.net/1000182851/product/co_ban_dem_trang_b018fd1567464a1babfa025bc0f31d11.png",
    promotions: ["Free Shipping"],
  },
  {
    id: "22",
    name: "Toner Hoa Hồng Làm Dịu Da",
    brand: "AROMATICA",
    category: "Chăm sóc da",
    price: 275000,
    originalPrice: 345000,
    salePercent: 20,
    rating: 4.9,
    reviewCount: 4,
    volume: "200ml",
    description: "Làm dịu và cân bằng độ pH cho làn da nhạy cảm.",
    freeFrom: ["Không cồn", "Không hương liệu tổng hợp"],
    ingredients: [
      { name: "Nước hoa hồng hữu cơ", description: "Làm dịu da." },
      { name: "Chiết xuất nha đam", description: "Giữ ẩm tự nhiên." },
    ],
    usage: "Dùng sau bước rửa mặt bằng tay hoặc bông tẩy trang.",
    usageDetails: {
      amount: "3-5 giọt mỗi lần",
      scent: "Hoa hồng dịu nhẹ",
      note: "Dùng sáng và tối",
    },
    images: [
      "https://cdn.beautybooth.qa/uploads/all/XKhB2o7wuJS0xprHCw5ZhCJBVAw36NvXf8fp7U8B.jpg",
      "https://my-kare.com/cdn/shop/products/AROMATICA-Reviving-Rose-Infusion-Treatment-Toner-200ml2_1200x.jpg?v=1618522095",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjIxxy5U3gX_0QDYLYTqLHuRuTZ45fl4cdLStjQVz61jmWplPxssHKCci1xeZhltJRZiR11JCPHXxE6F7ddpHKEDlnuaAa0mA65I-ZILRXNPIuDYMwMTsQQE77cMVxoxMnbkmIjCfO_xc7r/s2048/IMG_2746.jpeg",
    ],
    brandImage: AROMATICA,
    image:
      "https://cdn.cosmetics.vn/cham-soc-da/aromatica-reviving-rose-infusion-treatment-toner.jpg",
    promotions: ["Free Shipping"],
  },
  {
    id: "23",
    name: "Nước Dưỡng Da Đầu Bồ Kết",
    brand: "Cocoon",
    category: "Chăm sóc da",
    price: 165000,
    originalPrice: 189000,
    salePercent: 13,
    rating: 4.6,
    reviewCount: 1,
    volume: "200ml",
    description:
      "Loại bỏ tế bào chết, dưỡng da mềm mịn với bồ kết nguyên chất.",
    freeFrom: ["Không hạt vi nhựa", "Không thử nghiệm trên động vật"],
    ingredients: [
      { name: "Bồ kết", description: "Dưỡng ẩm, phục hồi tóc hư tổn." },
      { name: "Dầu dừa", description: "Dưỡng ẩm và chống oxy hóa." },
    ],
    usage: "Massage nhẹ lên da ướt, sau đó rửa sạch.",
    usageDetails: {
      amount: "1-2 lần/tuần",
      scent: "Cà phê thơm ngọt",
      note: "Không chà xát mạnh",
    },
    images: [
      "https://image.cocoonvietnam.com/uploads/Hinh_con_2_5f3a73b8b3.jpg",
      "https://product.hstatic.net/1000006063/product/cocoon_e_copy_2633c1c6a66a42cfbd1d33676a01b82a_1024x1024.jpg",
      "https://product.hstatic.net/200000617989/product/anh-01_15b75ef68798488181d1023f53744e7c.png",
    ],
    brandImage: Cocoon,
    image:
      "https://image.cocoonvietnam.com/uploads/Hair_BK_Nuoc_duong_da_dau_bo_ket_140ml_front_05520b4595.jpg",
    promotions: ["Free Shipping"],
  },
  {
    id: "24",
    name: "Son Dưỡng Môi Gạo",
    brand: "Cỏ Mềm",
    category: "Trang điểm",
    price: 69000,
    originalPrice: 89000,
    salePercent: 22,
    rating: 4.4,
    reviewCount: 2,
    volume: "5g",
    description: "Dưỡng môi mềm mịn, hồng tự nhiên với dầu gạo nguyên chất.",
    freeFrom: ["Không chì", "Không hóa chất độc hại"],
    ingredients: [
      { name: "Dầu gạo", description: "Chống nứt nẻ, thâm môi." },
      { name: "Sáp ong", description: "Tạo màng dưỡng ẩm tự nhiên." },
    ],
    usage: "Thoa lên môi ngày và đêm.",
    usageDetails: {
      amount: "2-3 lần/ngày",
      scent: "Tự nhiên, nhẹ nhàng",
      note: "Có thể dùng làm son lót",
    },
    images: [
      "https://down-vn.img.susercontent.com/file/sg-11134201-7rd5a-lwgqyx1vfvlq8e",
      "https://cdn.chanhtuoi.com/uploads/2020/12/review-son-duong-gao-co-mem-6.jpg",
      "https://www.thtbstore.com/cdn/shop/files/z6007633877849_20c3166a52875def3b07ca7ff9510912_800x.jpg?v=1730948165",
    ],
    brandImage: CoMem,
    image:
      "https://cdn.upharma.vn/unsafe/3840x0/filters:quality(90)/san-pham/22873.png",
    promotions: ["Free Shipping"],
  },
  {
    id: "25",
    name: "Kem Dưỡng Trắng Da Ban Ngày",
    brand: "Thorakao",
    category: "Chăm sóc da",
    price: 72000,
    originalPrice: 89000,
    salePercent: 19,
    rating: 4.1,
    reviewCount: 4,
    volume: "30g",
    description: "Giúp da sáng dần tự nhiên với ngọc trai và vitamin C.",
    freeFrom: [],
    ingredients: [
      { name: "Ngọc trai", description: "Dưỡng trắng." },
      { name: "Vitamin C", description: "Làm sáng da." },
    ],
    usage: "Dùng buổi sáng sau bước serum.",
    usageDetails: {
      amount: "Một lượng nhỏ",
      scent: "Nhẹ dịu",
      note: "Không tiếp xúc ánh nắng trực tiếp",
    },
    images: [
      "https://down-vn.img.susercontent.com/file/31606d878728e42afd7239066603a03a",
      "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m2ixpt331l82a3",
      "https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m129yw2wl7kv36",
    ],
    brandImage: ThoRaKao,
    image:
      "https://down-vn.img.susercontent.com/file/147eb538af1c951317ac346f6e732e7d",
    promotions: ["Free Shipping"],
  },
  {
    id: "26",
    name: "Sửa rửa mặt hoa hồng",
    brand: "Cocoon",
    category: "Chăm sóc da",
    price: 175000,
    originalPrice: 210000,
    salePercent: 17,
    rating: 4.8,
    reviewCount: 3,
    volume: "140ml",
    description: "Làm sạch da, dịu nhẹ cho làn da mụn và nhạy cảm.",
    freeFrom: ["Không sulfate", "Không cồn", "Không thử nghiệm trên động vật"],
    ingredients: [
      { name: "Chiết xuất hoa hồng ", description: "Giảm viêm, làm dịu da." },
      { name: "Panthenol", description: "Giữ ẩm và phục hồi." },
    ],
    usage: "Lấy một lượng nhỏ, tạo bọt, rửa mặt nhẹ nhàng và rửa lại với nước.",
    usageDetails: {
      amount: "2 lần/ngày",
      scent: "Thảo mộc tươi mát",
      note: "Dùng được cho da nhạy cảm",
    },
    images: [
      "https://product.hstatic.net/200000551679/product/gel-rua-mat-hoa-hong-cocoon-1_000c73be01b34b7588d28a354c21a48e_1024x1024.jpg",
      "https://file.hstatic.net/200000551679/file/gel-rua-mat-hoa-hong-cocoon-2_88f38121add2402291a15c542bc7f3e4_grande.jpg",
      "https://product.hstatic.net/200000617989/product/2-jpeg-8c6875c3-5169-43ca-8ee0-b25464ce0873_1c907a3fa6fb4dae973d024e9365a55a_1024x1024.png",
    ],
    brandImage: Cocoon,
    image:
      "https://madeinvietnam.us/cdn/shop/products/1615776371_gelruamathoahong2__1_1200x1200.png?v=1678071738",
    promotions: ["Free Shipping"],
  },
  {
    id: "27",
    name: "Dầu Dưỡng Tóc Bưởi",
    brand: "Cỏ Mềm",
    category: "Chăm sóc tóc",
    price: 99000,
    originalPrice: 129000,
    salePercent: 23,
    rating: 4.5,
    reviewCount: 5,
    volume: "100ml",
    description: "Ngăn ngừa rụng tóc, kích thích mọc tóc từ vỏ bưởi tự nhiên.",
    freeFrom: ["Không silicone", "Không hóa chất tổng hợp"],
    ingredients: [
      { name: "Vỏ bưởi", description: "Kích thích mọc tóc." },
      { name: "Dầu dừa", description: "Nuôi dưỡng chân tóc." },
    ],
    usage: "Xịt lên chân tóc, massage nhẹ 2-3 phút, không cần gội lại.",
    usageDetails: {
      amount: "1-2 lần/ngày",
      scent: "Tinh dầu bưởi dễ chịu",
      note: "Dùng cho mọi loại tóc",
    },
    images: [
      "https://salt.tikicdn.com/media/catalog/producttmp/57/c5/ed/992bf875b92558f42144039e0334f8f1.jpg",
      "https://cf.shopee.vn/file/sg-11134201-22100-5floc8p5nliv27",
      "https://sg-live-01.slatic.net/p/2d6a1546f26eda8b31f09f741fb35e22.jpg_525x525q80.jpg",
    ],
    brandImage: CoMem,
    image:
      "https://salt.tikicdn.com/cache/w300/ts/product/b6/cf/af/aed3bfc33a7d35843dccc1342713e129.jpg",
    promotions: ["Free Shipping"],
  },
  {
    id: "28",
    name: "Dầu Gội Sả Chanh",
    brand: "Thorakao",
    category: "Chăm sóc tóc",
    price: 63000,
    originalPrice: 79000,
    salePercent: 20,
    rating: 4.2,
    reviewCount: 2,
    volume: "200ml",
    description: "Làm sạch tóc, kiểm soát dầu và khử mùi hiệu quả.",
    freeFrom: [],
    ingredients: [
      { name: "Tinh dầu sả chanh", description: "Giảm gàu, sạch tóc." },
      { name: "Tinh chất dâu tằm", description: "Nuôi dưỡng chân tóc." },
    ],
    usage: "Làm ướt tóc, thoa dầu gội và massage nhẹ nhàng, xả sạch.",
    usageDetails: {
      amount: "Sử dụng như dầu gội thông thường",
      scent: "Hương sả chanh thư giãn",
      note: "Không dùng cho da đầu đang bị tổn thương",
    },
    images: [
      "https://thorakao.com/wp-content/uploads/2024/02/dfg.png",
      "https://down-vn.img.susercontent.com/file/vn-11134208-7ras8-m13lvioilokf4b",
      "https://thorakao.com/wp-content/uploads/2024/02/THORAKAO-WEBSITE-7.png",
    ],
    brandImage: ThoRaKao,
    image:
      "https://nhathuocthanthien.com.vn/wp-content/uploads/2023/11/dgm_nttt_dau-goi-chanh-sa-bac-ha.jpg",
    promotions: ["Free Shipping"],
  },
  {
    id: "29",
    name: "Sữa Dưỡng Ẩm Da Nhạy Cảm",
    brand: "Sukin",
    category: "Chăm sóc da",
    price: 295000,
    originalPrice: 350000,
    salePercent: 16,
    rating: 4.7,
    reviewCount: 4,
    volume: "125ml",
    description: "Dưỡng ẩm sâu, dịu nhẹ với công thức thuần chay.",
    freeFrom: ["Không hương liệu", "Không paraben", "Không dầu khoáng"],
    ingredients: [
      { name: "Chiết xuất hoa cúc", description: "Làm dịu da." },
      { name: "Vitamin E", description: "Chống oxy hóa." },
    ],
    usage: "Dùng sáng và tối sau toner.",
    usageDetails: {
      amount: "2-3 bơm",
      scent: "Không mùi nhân tạo",
      note: "Phù hợp cả làn da đang treatment",
    },
    images: [
      "https://image.hsv-tech.io/1920x0/bbx/products/35ceb211-2ff0-43ec-b993-37da746ec680.webp",
      "https://sg-live-01.slatic.net/p/66b62911ace0364efa4a78626e86b7dc.jpg_525x525q80.jpg",
      "https://down-id.img.susercontent.com/file/e0d244d0b53dbdd4f92eebbf4e10972b",
    ],
    brandImage: Sukin,
    image:
      "https://media.hcdn.vn/catalog/product/g/o/google-shopping-kem-duong-sukin-sensitive-cap-am-cho-da-nhay-cam-125ml.jpg",
    promotions: ["Free Shipping"],
  },
  {
    id: "30",
    name: "Tinh Chất Dưỡng Da Vitamin C",
    brand: "AROMATICA",
    category: "Chăm sóc da",
    price: 460000,
    originalPrice: 580000,
    salePercent: 21,
    rating: 4.9,
    reviewCount: 2,
    volume: "30ml",
    description: "Làm sáng da, mờ thâm và đều màu da.",
    freeFrom: ["Không silicone", "Không hương liệu tổng hợp"],
    ingredients: [
      { name: "Vitamin C tự nhiên", description: "Làm sáng và chống oxy hóa." },
      { name: "Chiết xuất cam", description: "Cung cấp dưỡng chất." },
    ],
    usage: "Thoa sau toner và trước kem dưỡng.",
    usageDetails: {
      amount: "2-3 giọt mỗi lần",
      scent: "Cam tươi mát",
      note: "Sử dụng ban đêm, kết hợp kem chống nắng ban ngày",
    },
    images: [
      "https://img.joomcdn.net/415dcab8f40e6e3c1bd1a1e436ce4bea0f67e4b8_original.jpeg",
      "https://m.media-amazon.com/images/I/613xIoinSEL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81P5R4jUt0L.jpg",
    ],
    brandImage: AROMATICA,
    image:
      "https://www.biteki.com/wp-content/uploads/2024/06/202408gcc-130.jpg",
    promotions: ["Free Shipping"],
  },
];

// Lấy danh sách các thương hiệu duy nhất
export const brands = [...new Set(products.map((product) => product.brand))];

// Lấy danh sách các danh mục duy nhất
export const categories = [
  ...new Set(products.map((product) => product.category)),
];

// Tạo các khoảng giá
// Lưu ý: Giá trị max của khoảng cuối cùng nên là Number.POSITIVE_INFINITY để bao gồm tất cả các sản phẩm giá cao.
export const priceRanges = [
  { id: 1, label: "Dưới 100.000đ", min: 0, max: 99999 }, // Điều chỉnh max cho rõ ràng
  { id: 2, label: "100.000đ - 200.000đ", min: 100000, max: 199999 },
  { id: 3, label: "200.000đ - 300.000đ", min: 200000, max: 299999 },
  { id: 4, label: "Trên 300.000đ", min: 300000, max: Number.POSITIVE_INFINITY },
];

export const promotions = [
  { id: 1, name: "New Arrivals" },
  { id: 2, name: "Best Sellers" },
  { id: 3, name: "Free Shipping" },
  { id: 4, name: "Special Discount" },
  { id: 5, name: "Limited Offer" },
  { id: 6, name: "Clearance Sale" },
];

export const skinTypes = [
  "Normal",
  "Oily",
  "Dry",
  "Combination",
  "Sensitive",
  "Acne-prone",
  "All",
];
