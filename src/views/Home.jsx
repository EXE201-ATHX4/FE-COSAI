import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import {
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
  Diamond as DiamondIcon,
  Spa as SpaIcon,
  Security as SecurityIcon,
  NavigateBefore,
  NavigateNext,
  ArrowForward,
} from "@mui/icons-material";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Diamond, Droplets, Shield } from "lucide-react";
import { useEffect, useState } from "react";

// Trang chủ mẫu
export default function Home() {
  return (
    <>
      <Header />
      <CombinedBeautyLayout />
      <Footer />
    </>
  );
}

const CombinedBeautyLayout = () => {
  const features = [
    {
      number: "01",
      title: "Sản phẩm tự nhiên, lành tính",
      description: "Sản phẩm thuần chay từ thực vật tự nhiên",
    },
    {
      number: "02",
      title: "Công nghệ nghiên cứu mới nhất",
      description: "Nghiên cứu mới từ mỹ phẩm thế giới",
    },
    {
      number: "03",
      title: "COSAI, giải pháp tìm kiếm, tư vấn",
      description: "Giải pháp tìm kiếm sản phẩm dựa trên da",
    },
    {
      number: "04",
      title: "Tư vấn chuyên nghiệp từ chữa",
      description: "Tư vấn từ chuyên gia hàng đầu về da liễu",
    },
    {
      number: "05",
      title: "Thành phần, công thức chi tiết",
      description: "Thành phần rõ ràng, công thức đã thực hiện",
    },
    {
      number: "06",
      title: "Không thử nghiệm trên động vật",
      description: "Sản phẩm cruelty-free, thân thiện với môi trường",
    },
  ];

  const cosmeticProducts = [
    {
      id: 1,
      name: "Pomelo Hair Tonic",
      subtitle: "Tonic dưỡng tóc thuần chay",
      category: "CHĂM SÓC TÓC THUẦN CHAY",
      mainTitle: "NUÔI DƯỠNG TÓC CHẮC KHỎE",
      description:
        "Tonic dưỡng tóc từ bưởi tự nhiên của Việt Nam, giúp giảm gãy rụng và nuôi dưỡng tóc chắc khỏe. Sản phẩm 100% thuần chay, không chứa thành phần động vật, không thử nghiệm trên động vật, an toàn cho mọi loại tóc và thân thiện với môi trường.",
      image:
        "https://image.cocoonvietnam.com/uploads/Avatar_Website_Nuoc_duong_toc_tinh_dau_buoi_140ml_Cai_tien_moi_240629_7819f9ba98.jpg",
      bgColor: "#E8F5E8",
      textColor: "#2E7D32",
    },
    {
      id: 2,
      name: "Hung Yen Turmeric Face Mask",
      subtitle: "Mặt nạ nghệ thuần chay - Làm sáng da",
      category: "CHĂM SÓC DA MẶT THUẦN CHAY",
      mainTitle: "LÀM SÁNG DA TỰ NHIÊN",
      description:
        "Mặt nạ nghệ từ Hưng Yên giúp làm sáng da, mờ thâm và chống oxy hóa nhờ nghệ tự nhiên kết hợp các hoạt chất thực vật. Sản phẩm thuần chay, không chứa thành phần động vật, an toàn cho da nhạy cảm và được chứng nhận bởi Leaping Bunny.",
      image:
        "https://image.cocoonvietnam.com/uploads/z3741702902215_49db1948b5dffb7694e872a09681ff7e_2b217c5fb7.jpg",
      bgColor: "#FFF3E0",
      textColor: "#E65100",
    },
    {
      id: 3,
      name: "Dak Lak Coffee Body Polish",
      subtitle: "Tẩy tế bào chết cơ thể thuần chay",
      category: "CHĂM SÓC CƠ THỂ THUẦN CHAY",
      mainTitle: "LÀM MỊN DA TỰ NHIÊN",
      description:
        "Sản phẩm tẩy tế bào chết từ cà phê Đắk Lắk, làm sạch sâu, dưỡng ẩm và cải thiện độ mịn màng của da. Thành phần 100% từ thực vật, không chứa hóa chất độc hại, phù hợp với mọi loại da và thân thiện với môi trường.",
      image:
        "https://image.cocoonvietnam.com/uploads/z4147355364575_e4b88c65711b8261d9c996e6797b60a1_83f203bec3.jpg",
      bgColor: "#E3F2FD",
      textColor: "#1565C0",
    },
    {
      id: 4,
      name: "Cocoon Hydrating Cleanser",
      subtitle: "Sữa rửa mặt thuần chay - Dưỡng ẩm",
      category: "CHĂM SÓC DA MẶT THUẦN CHAY",
      mainTitle: "SẠCH SÂU - DƯỠNG ẨM",
      description:
        "Sữa rửa mặt thuần chay với chiết xuất thực vật giúp làm sạch sâu, dưỡng ẩm và cân bằng pH da. Không chứa sulfate, paraben hay thành phần động vật, phù hợp cho da nhạy cảm và được chứng nhận bởi PETA.",
      image:
        "https://image.cocoonvietnam.com/uploads/Website_Avatar_Sua_rua_mat_Sen_Hau_Giang_140ml_573f5b39f6.jpg",
      bgColor: "#F3E5F5",
      textColor: "#7B1FA2",
    },
    {
      id: 5,
      name: "Cocoon Green Tea Toner",
      subtitle: "Nước hoa hồng thuần chay - Làm dịu da",
      category: "CHĂM SÓC DA NHẠY CẢM THUẦN CHAY",
      mainTitle: "LÀM DỊU VÀ CÂN BẰNG DA",
      description:
        "Nước hoa hồng từ trà xanh tự nhiên giúp làm dịu da, thu nhỏ lỗ chân lông và cân bằng độ ẩm. Sản phẩm thuần chay, không chứa cồn hay thành phần động vật, an toàn cho da nhạy cảm và thân thiện với môi trường.",
      image:
        "https://image.cocoonvietnam.com/uploads/Avatar_Nuoc_sen_Hau_Giang_500ml_front_b3d8e0fbf4.jpg",
      bgColor: "#E8F5E8",
      textColor: "#388E3C",
    },
  ];

  const [currentProduct, setCurrentProduct] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Auto slide functionality
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentProduct((prev) =>
          prev === cosmeticProducts.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  const handleNext = () => {
    setCurrentProduct((prev) =>
      prev === cosmeticProducts.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentProduct((prev) =>
      prev === 0 ? cosmeticProducts.length - 1 : prev - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentProduct(index);
  };

  const product = cosmeticProducts[currentProduct];
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "#52B788",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          color: "white",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "700",
                  fontFamily: "Anton, sans-serif",
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  lineHeight: 0.9,
                  marginBottom: 1,
                }}
              >
                Care for,
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "700",
                  fontFamily: "Anton, sans-serif",
                  fontSize: { xs: "4rem", sm: "5.5rem", md: "7rem" },
                  lineHeight: 0.8,
                  marginBottom: 0.5,
                }}
              >
                YOUR SKIN
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "700",
                  fontFamily: "Anton, sans-serif",
                  fontSize: { xs: "4rem", sm: "5.5rem", md: "7rem" },
                  lineHeight: 0.8,
                  marginBottom: 2,
                }}
              >
                YOUR BEAUTY
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  color: "#FFFFFF",
                  marginBottom: 3,
                  opacity: 0.9,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  marginBottom: 4,
                }}
              >
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    border: "3px solid #FFFFFF",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      border: "3px solid #FFFFFF",
                      objectFit: "cover",
                    }}
                    image="/src/assets/Ellipse_95.png"
                    alt="AI Avatar"
                  />{" "}
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Asap, sans-serif",
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#FFFFFF",
                      marginBottom: 0.5,
                    }}
                  >
                    Tích hợp công nghệ tư vấn
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Asap, sans-serif",
                      fontWeight: "600",
                      fontSize: "1rem",
                      color: "#FFFFFF",
                      marginBottom: 1,
                    }}
                  >
                    TRÍ TUỆ NHÂN TẠO (COSAI)
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Asap, sans-serif",
                      fontWeight: "400",
                      color: "#ECD8BD",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Trải nghiệm ngay
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {/* This grid item will be empty as we use absolute positioning */}
            </Grid>
          </Grid>
        </Container>

        {/* Small green text overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: "100px",
            left: "50px",
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "8px 16px",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#FFFFFF",
              fontSize: "0.8rem",
              fontWeight: "500",
            }}
          >
            Alive every moment
          </Typography>
        </Box>
      </Box>

      {/* Beauty Section */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "4rem 0",
          width: "100%",
          position: "relative",
        }}
      >
        /* Icon Features - Top section */
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
            marginBottom: "3rem",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "4rem",
              marginBottom: "2rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Diamond
                size={48}
                color="#52B788"
                style={{ marginBottom: "0.5rem" }}
              />
              <p
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  margin: 0,
                }}
              >
                Lorem ipsum
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <Droplets
                size={48}
                color="#52B788"
                style={{ marginBottom: "0.5rem" }}
              />
              <p
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  margin: 0,
                }}
              >
                Lorem ipsum
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <Shield
                size={48}
                color="#52B788"
                style={{ marginBottom: "0.5rem" }}
              />
              <p
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  margin: 0,
                }}
              >
                Lorem ipsum
              </p>
            </div>
          </div>
        </div>
        {/* Main content with 2 images and center text */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              gap: "2rem",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Left Image */}
            <div
              style={{
                position: "relative",
                borderRadius: "30px",
                overflow: "hidden",
                height: "350px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <img
                src="/src/assets/placeholder.png"
                alt="Beauty Treatment Left"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "30px",
                  backgroundColor: "#f5f5f5",
                }}
              />

              {/* Decorative green circle */}
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "-20px",
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#52B788",
                  borderRadius: "50%",
                  zIndex: 1,
                }}
              />
            </div>

            {/* Center Text Content */}
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h6
                style={{
                  fontWeight: "medium",
                  color: "#023A15",
                  marginBottom: "0.5rem",
                  fontSize: "1.1rem",
                  margin: "0 0 0.5rem 0",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Alive every moment
              </h6>
              <h2
                style={{
                  fontWeight: "bold",
                  color: "#023A15",
                  marginBottom: "1.5rem",
                  fontSize: "60px",
                  lineHeight: 1.2,
                  margin: "0.5rem 0 1.5rem 0",
                }}
              >
                Beauty is all about you.
              </h2>
              <p
                style={{
                  color: "#666",
                  marginBottom: "2rem",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                lobortis elit sapien ut pretium. Donec tincidunt, quam.
              </p>

              {/* Decorative element behind text */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "200px",
                  height: "200px",
                  backgroundColor: "#52B788",
                  borderRadius: "50%",
                  opacity: 0.05,
                  zIndex: -1,
                }}
              />
            </div>

            {/* Right Image */}
            <div
              style={{
                position: "relative",
                borderRadius: "30px",
                overflow: "hidden",
                height: "350px",
                backgroundColor: "#f5f5f5",
              }}
            >
              <img
                src="/src/assets/placeholder_2.png"
                alt="Beauty Treatment Right"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "30px",
                }}
              />

              {/* Decorative green circle */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  right: "-20px",
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#52B788",
                  borderRadius: "50%",
                  zIndex: 1,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Large Overlapping Image - Positioned absolutely to span both sections */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "8%",
          width: "900px",
          height: "700px",
          zIndex: 10,
          display: window.innerWidth > 768 ? "block" : "none", // Hide on mobile
        }}
      >
        <img
          src="/src/assets/IMG_Home_1.png"
          alt="Beauty Products"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "30px",
          }}
        />
      </div>

      <Box sx={{ backgroundColor: "#52B788", width: "100%" }}>
        <Container
          maxWidth="xl"
          sx={{ px: { xs: 2, sm: 3, md: 6 }, position: "relative" }}
        >
          {/* Main Title */}
          <Box sx={{ textAlign: "center", top: "-30px", position: "relative" }}>
            <Typography
              variant="h3"
              sx={{
                display: "inline-block",
                backgroundColor: "#2D5016",
                color: "#FFFFFF",
                px: 6,
                py: 2,
                borderRadius: "50px",
                fontWeight: "700",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              VÌ SAO CHỌN CHÚNG TÔI
            </Typography>
          </Box>

          {/* Main Content Container */}
          <Box
            sx={{
              position: "relative",
              minHeight: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Central Portrait */}
            <Box sx={{ position: "relative", zIndex: 10 }}>
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
                image="/src/assets/IMG_Home_2.png"
                alt="Beauty Portrait"
              />

              {/* Skin Analysis Circles */}
            </Box>

            {/* Left Side Features */}
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "420px",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {features.slice(0, 3).map((feature, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "16px",
                      p: 2,
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#2D5016",
                        color: "#FFFFFF",
                        borderRadius: "12px",
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "1.1rem",
                        flexShrink: 0,
                      }}
                    >
                      {feature.number}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "#2D5016",
                          fontWeight: "600",
                          fontSize: "1rem",
                          mb: 0.5,
                        }}
                      >
                        {feature.title.includes(",") ? (
                          <>
                            <Box component="span" sx={{ fontWeight: "700" }}>
                              {feature.title.split(",")[0]}
                            </Box>
                            {feature.title.split(",")[1]}
                          </>
                        ) : (
                          <Box component="span" sx={{ fontWeight: "700" }}>
                            {feature.title}
                          </Box>
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontSize: "0.85rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              ))}
            </Box>

            {/* Right Side Features */}
            <Box
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "420px",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {features.slice(3, 6).map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "16px",
                      p: 2,
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#2D5016",
                        color: "#FFFFFF",
                        borderRadius: "12px",
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "1.1rem",
                        flexShrink: 0,
                      }}
                    >
                      {feature.number}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "#2D5016",
                          fontWeight: "600",
                          fontSize: "1rem",
                          mb: 0.5,
                        }}
                      >
                        {feature.title.includes(",") ? (
                          <>
                            <Box component="span" sx={{ fontWeight: "700" }}>
                              {feature.title.split(",")[0]}
                            </Box>
                            {feature.title.split(",")[1]}
                          </>
                        ) : (
                          <Box component="span" sx={{ fontWeight: "700" }}>
                            {feature.title}
                          </Box>
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontSize: "0.85rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Bottom Title */}
          <Box sx={{ textAlign: "center", mt: 8, pb: 14 }}>
            <Typography
              variant="h4"
              sx={{
                display: "inline-block",
                backgroundColor: "#2D5016",
                color: "#FFFFFF",
                px: 4,
                py: 2,
                borderRadius: "50px",
                fontWeight: "700",
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                maxWidth: "1000px",
              }}
            >
              TÍCH HỢP AI PHÂN TÍCH GỢI Ý SẢN PHẨM PHÙ HỢP CHO TỪNG KHÁCH HÀNG
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Cocoon Image Overlay - positioned between sections */}

      <Container
        maxWidth="100%"
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          backgroundColor: "#DEEFDC",
          padding: "20px 0",
        }}
      >
        <Grid
          container
          alignItems="center"
          sx={{ height: "100%" }}
          justifyContent={"space-between"}
        >
          {/* Text bên trái */}
          <Grid item xs={12} md={4} sx={{ paddingRight: "100px" }}>
            <Box
              sx={{ textAlign: { xs: "center", md: "left" }, pl: { md: 3 } }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "700",
                  color: "#2E7D32",
                  fontSize: { xs: "2.2rem", md: "2.8rem" },
                  lineHeight: 1.2,
                  mb: 1,
                }}
              >
                CHĂM SÓC DA
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "400",
                  color: "#52B788",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  lineHeight: 1.2,
                }}
              >
                TỪ THIÊN NHIÊN
              </Typography>
            </Box>
          </Grid>

          {/* Ảnh ở giữa - overlapping all 3 sections */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                zIndex: 3,
                height: "100%",
                top: "-20px",
                left: "40%",
              }}
            >
              <img
                src="/src/assets/cocoon.png"
                alt="Natural Skincare Product"
                style={{
                  width: "450px",
                  height: "350px",
                  objectFit: "contain",
                  maxWidth: "100%",
                  filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.2))",
                }}
              />
            </Box>
          </Grid>

          {/* Text bên phải */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{ textAlign: { xs: "center", md: "left" }, pl: { md: 3 } }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "700",
                  color: "#2E7D32",
                  fontSize: { xs: "2.2rem", md: "2.8rem" },
                  lineHeight: 1.2,
                  mb: 1,
                }}
              >
                CHO LÀN DA
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "400",
                  color: "#52B788",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  lineHeight: 1.2,
                }}
              >
                CĂNG MỊN TƯƠI TRẺ
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          backgroundColor: product.bgColor,
          minHeight: "100vh",
          py: { xs: 4, md: 8 },
          position: "relative",
          transition: "background-color 0.6s ease-in-out",
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: { xs: 10, md: 30 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
            color: product.textColor,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            width: 60,
            height: 60,
            zIndex: 10,
            "&:hover": {
              backgroundColor: "white",
              transform: "translateY(-50%) scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <NavigateBefore fontSize="large" />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: { xs: 10, md: 30 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "white",
            color: product.textColor,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            width: 60,
            height: 60,
            zIndex: 10,
            "&:hover": {
              backgroundColor: "white",
              transform: "translateY(-50%) scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <NavigateNext fontSize="large" />
        </IconButton>

        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
          <Grid
            container
            spacing={6}
            alignItems="center"
            sx={{ minHeight: "80vh" }}
          >
            {/* Product Image */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "30px",
                  overflow: "hidden",
                  height: { xs: "300px", md: "500px" },
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  transform: "perspective(1000px) rotateY(-5deg)",
                  transition: "all 0.6s ease-in-out",
                  "&:hover": {
                    transform: "perspective(1000px) rotateY(0deg) scale(1.02)",
                  },
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "all 0.6s ease-in-out",
                  }}
                />

                {/* Product Label */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    backgroundColor: "white",
                    borderRadius: "20px",
                    padding: "10px 20px",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "700",
                      color: product.textColor,
                      fontSize: "1.1rem",
                    }}
                  >
                    SÂN PHẨM MỚI
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Product Content */}
            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: "600px" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "500",
                    color: product.textColor,
                    marginBottom: 2,
                    fontSize: "1.1rem",
                    opacity: 0.8,
                    letterSpacing: "1px",
                  }}
                >
                  {product.category}
                </Typography>

                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: "800",
                    color: product.textColor,
                    marginBottom: 3,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.1,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {product.mainTitle}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "700",
                    color: product.textColor,
                    marginBottom: 2,
                    fontSize: { xs: "1.3rem", md: "1.5rem" },
                    opacity: 0.9,
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "500",
                    color: product.textColor,
                    marginBottom: 3,
                    fontSize: "1.1rem",
                    opacity: 0.7,
                  }}
                >
                  {product.subtitle}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "#666",
                    marginBottom: 4,
                    fontSize: "1.1rem",
                    lineHeight: 1.7,
                    textAlign: "justify",
                  }}
                >
                  {product.description}
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    backgroundColor: product.textColor,
                    borderRadius: "30px",
                    padding: "15px 40px",
                    fontSize: "1.1rem",
                    textTransform: "none",
                    fontWeight: "600",
                    boxShadow: `0 8px 25px ${product.textColor}40`,
                    "&:hover": {
                      backgroundColor: product.textColor,
                      transform: "translateY(-3px)",
                      boxShadow: `0 15px 35px ${product.textColor}50`,
                    },
                    transition: "all 0.3s ease",
                    mb: 4,
                  }}
                >
                  Tìm hiểu thêm
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Dots Navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            {cosmeticProducts.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleDotClick(index)}
                sx={{
                  width: currentProduct === index ? 40 : 12,
                  height: 12,
                  borderRadius: "6px",
                  backgroundColor:
                    currentProduct === index
                      ? product.textColor
                      : "rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: product.textColor,
                    opacity: 0.8,
                  },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "#F8F8F8", py: 8, width: "100%" }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
          <Grid
            container
            spacing={6}
            alignItems="center"
            justifyContent={"space-around"}
          >
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "700",
                  color: "#2E7D32",
                  marginBottom: 3,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                }}
              >
                Về Cosmetic
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  marginBottom: 4,
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  maxWidth: "500px",
                }}
              >
                Cosmetic của chúng tôi chuyên cung cấp về mỹ phẩm thiên nhiên,
                không chất hoá học. Đồng thời mang đến trải nghiệm mua sắm trực
                tuyến độc đáo với website tích hợp công nghệ AI tiên tiến. Nhờ
                khả năng phân tích da chính xác và dịch vụ tư vấn 24/24, chúng
                tôi cam kết cung cấp những sản phẩm chăm sóc da phù hợp nhất,
                giúp bạn tự tin tỏa sáng mỗi ngày. Hãy khám phá ngay để trải
                nghiệm sự khác biệt mà Cosmetic mang lại!
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#52B788",
                  borderRadius: "25px",
                  padding: "15px 40px",
                  fontSize: "1.1rem",
                  textTransform: "none",
                  fontWeight: "600",
                  boxShadow: "0 8px 25px rgba(82, 183, 136, 0.3)",
                  "&:hover": {
                    backgroundColor: "#40916C",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 35px rgba(82, 183, 136, 0.4)",
                  },
                  transition: "all 0.3s ease",
                  marginBottom: 4,
                }}
              >
                Đọc thêm
              </Button>
              <Box sx={{ display: "flex", gap: 6 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#52B788",
                      fontWeight: "700",
                      fontSize: "3rem",
                    }}
                  >
                    50+
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", fontWeight: "500" }}
                  >
                    Happy Customer
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{
                      color: "#52B788",
                      fontWeight: "700",
                      fontSize: "3rem",
                    }}
                  >
                    20+
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#666", fontWeight: "500" }}
                  >
                    Good Service
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "30px",
                  overflow: "hidden",
                  height: "500px",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  image="/src/assets/placeholder_3.png"
                  alt="Testimonial Image"
                />
                {/* Decorative green circle */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-50px",
                    left: "-50px",
                    width: "150px",
                    height: "150px",
                    backgroundColor: "#52B788",
                    borderRadius: "50%",
                    zIndex: 1,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
