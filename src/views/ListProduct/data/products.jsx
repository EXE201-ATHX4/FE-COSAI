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
    name: "Sữa Dưỡng Thể Khuynh Diếp & Bạc Hà",
    brand: "Cocoon",
    category: "Dưỡng thể",
    price: 125000,
    salePrice: 95000,
    salePercent: 10,
    rating: 5,
    reviewCount: 111,
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
    images: [ChongNang, ChongNang, ChongNang],
    sale: "10%",
    originalPrice: "125.000 đ",
    price: "95.000 đ",
    brandImage: Cocoon,
    image: ChongNang,
  },
  {
    id: "2",
    name: "Tẩy Tế Bào Chết Cà Phê Đắk Lắk",
    brand: "Cocoon",
    category: "Tẩy tế bào chết",
    price: 165000,
    salePrice: 145000,
    salePercent: 10,
    rating: 4.5,
    reviewCount: 47,
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
    images: [TayTBC, ChongNang, TayTBC],
    sale: "10%",
    originalPrice: "165.000 đ",
    price: "145.000 đ",
    brandImage: CoMem,
    image: TayTBC,
  },
  {
    id: "3",
    name: "Gel Tẩm Khuynh Diệp",
    brand: "Cocoon",
    category: "Dưỡng da",
    price: 245000,
    salePrice: 220000,
    salePercent: 10,
    rating: 4.7,
    reviewCount: 103,
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
    images: [GelTam, ChongNang, GelTam],
    sale: "10%",
    originalPrice: "245.000 đ",
    price: "220.000 đ",
    brandImage: Sukin,
    image: GelTam,
  },
  {
    id: "4",
    name: "Bột Khử Mùi Điền Thanh",
    brand: "Cocoon",
    category: "Mặt nạ",
    price: 115000,
    salePrice: null,
    salePercent: null,
    rating: 4.6,
    reviewCount: 73,
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
    images: [BotKhuMui, ChongNang, BotKhuMui],
    sale: "",
    originalPrice: "000.000 đ",
    price: "115.000 đ",
    brandImage: ThoRaKao,
    image: BotKhuMui,
  },
  {
    id: "5",
    name: "Mặt Nạ Cấp Ẩm Cho Da",
    brand: "Cocoon",
    category: "Mặt nạ",
    price: 95000,
    salePrice: 85000,
    salePercent: 10,
    rating: 4.9,
    reviewCount: 213,
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
    images: [CapAm, ChongNang, CapAm],
    sale: "10%",
    originalPrice: "95.000 đ",
    price: "85.000 đ",
    brandImage: Sukin,
    image: CapAm,
  },
  {
    id: "6",
    name: "Kem Nghệ Sáng Da, Ngừa Mụn",
    brand: "Cocoon",
    category: "Kem dưỡng",
    price: 185000,
    salePrice: 165000,
    salePercent: 10,
    rating: 4.5,
    reviewCount: 95,
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
    images: [KemNghe, ChongNang, KemNghe],
    sale: "10%",
    originalPrice: "185.000 đ",
    price: "165.000 đ",
    brandImage: Cocoon,
    image: KemNghe,
  },
  {
    id: "7",
    name: "Serum Cấp Ẩm Phục Hồi Da Thâm",
    brand: "Cocoon",
    category: "Serum",
    price: 245000,
    salePrice: null,
    salePercent: null,
    rating: 4.8,
    reviewCount: 124,
    volume: "30ml",
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
    images: [SerumCapAm, ChongNang, SerumCapAm],
    sale: "",
    originalPrice: "000.000 đ",
    price: "245.000 đ",
    brandImage: CoMem,
    image: SerumCapAm,
  },
  {
    id: "8",
    name: "Mặt Nạ Chăm Sóc Đặc Biệt Dưỡng Ẩm",
    brand: "Sukin",
    category: "Mặt nạ",
    price: 210000,
    salePrice: 189000,
    salePercent: 10,
    rating: 4.7,
    reviewCount: 85,
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
    images: [RauMa, ChongNang, RauMa],
    sale: "10%",
    originalPrice: "210.000 đ",
    price: "189.000 đ",
    brandImage: AROMATICA,
    image: RauMa,
  },
  {
    id: "9",
    name: "Serum Cấp Ẩm Phục Hồi Tơ Tằm",
    brand: "Cỏ mềm",
    category: "Serum",
    price: 245000,
    salePrice: null,
    salePercent: null,
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
    images: [SerumCapAm, ChongNang, SerumCapAm],
    sale: "30%",
    originalPrice: "000.000 đ",
    price: "245.000 đ",
    brandImage: Cocoon,
    image: SerumCapAm,
  },
  {
    id: "10",
    name: "Serum Ngăn rụng tóc Bưởi",
    brand: "R&B",
    category: "Chăm sóc tóc",
    price: 272000,
    salePrice: null,
    salePercent: null,
    rating: 4,
    reviewCount: 55,
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
    images: [RungToc, ChongNang, RungToc],
    sale: "",
    originalPrice: "000.000 đ",
    price: "272.000 đ",
    brandImage: Sukin,
    image: RungToc,
  },
  {
    id: "11",
    name: "Lotion Dưỡng Tóc Tinh Dầu Bưởi",
    brand: "R&B",
    category: "Chăm sóc tóc",
    price: 227000,
    salePrice: null,
    salePercent: null,
    rating: 5,
    reviewCount: 23,
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
    images: [LotionToc, ChongNang, LotionToc],
    sale: "",
    originalPrice: "000.000 đ",
    price: "227.000 đ",
    brandImage: ThoRaKao,
    image: LotionToc,
  },
  {
    id: "12",
    name: "Muối Tẩy Tế Bào Chết Da Đầu",
    brand: "AROMATICA",
    category: "Chăm sóc tóc",
    price: 468000,
    salePrice: 258000,
    salePercent: 45,
    rating: 5,
    reviewCount: 11,
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
    images: [MuoiTayTBC, ChongNang, MuoiTayTBC],
    sale: "45%",
    originalPrice: "468.000 đ",
    price: "258.000 đ",
    brandImage: AROMATICA,
    image: MuoiTayTBC,
  },
];

// Lấy danh sách các thương hiệu duy nhất
export const brands = [...new Set(products.map((product) => product.brand))];

// Lấy danh sách các danh mục duy nhất
export const categories = [
  ...new Set(products.map((product) => product.category)),
];

// Tạo các khoảng giá
export const priceRanges = [
  { id: 1, label: "Dưới 100.000đ", min: 0, max: 100000 },
  { id: 2, label: "100.000đ - 200.000đ", min: 100000, max: 200000 },
  { id: 3, label: "200.000đ - 300.000đ", min: 200000, max: 300000 },
  { id: 4, label: "Trên 300.000đ", min: 300000, max: Number.POSITIVE_INFINITY },
];
