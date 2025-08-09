import { useEffect, useState } from "react";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Divider,
  Rating,
  TextField,
  IconButton,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Favorite as FavoriteIcon,
  NavigateNext as NavigateNextIcon,
  Facebook as FacebookIcon,
  WhatsApp as WhatsAppIcon,
  Circle as CircleIcon,
} from "@mui/icons-material";
import ProductImageGallery from "./ProductImageGallery";
import productService from "../../service/product";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import Chatbox from "../Cosai/ChatBox";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        // Fetch current product
        const productResponse = await productService.getProductById(id);
        const { data } = productResponse;
        const productData = {
          id: data.id,
          name: data.name,
          price: data.salePrice || data.originalPrice,
          originalPrice: data.originalPrice,
          rating: data.rating || 0,
          reviewCount: data.reviewCount || 0,
          images: data.productImages || ["/placeholder.svg"],
          supplierName: data.supplierName || "Không xác định",
          category: data.categoryName || "Không xác định",
          volume: data.volume || "Không xác định",
          description: data.description || "",
          ingredients: data.ingredients || "Không có thông tin",
          usage: data.usage || "Không có thông tin",
          quantity: data.quantity || 0,
        };
        setProduct(productData);

        // Fetch all products and filter by categoryName
        const productsResponse = await productService.getProducts(1, 100); // Fetch up to 100 products
        const relatedProductsData = productsResponse.data.items
          .filter(
            (p) => p.categoryName === data.categoryName && p.id !== data.id
          )
          .slice(0, 4)
          .map((p) => ({
            id: p.id,
            name: p.name,
            price: p.salePrice || p.originalPrice,
            image: p.productImages?.[0] || "/placeholder.svg",
          }));
        setRelatedProducts(relatedProductsData);
      } catch (error) {
        console.error("Error fetching product or related products:", error);
        navigate("/");
      }
    };

    if (id) {
      fetchProductAndRelated();
    }
  }, [id, navigate]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= product.quantity) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = () => {
    if (!product || product.quantity === 0) return;

    try {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        supplierName: product.supplierName,
        volume: product.volume,
        quantity: quantity,
        addedAt: new Date().toISOString(),
      };

      const existingItemIndex = existingCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      setOpenSnackbar(true);
      setQuantity(1);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!");
    }
  };

  const buyNow = () => {
    addToCart();
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!accessToken && !refreshToken) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  if (!product) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Đang tải...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f9f7f2", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 3, color: "#666" }}
        >
          <Link
            component={RouterLink}
            to="/products"
            color="inherit"
            underline="hover"
          >
            Sản phẩm
          </Link>
          <Link
            component={RouterLink}
            to={`/products?category=${encodeURIComponent(product.category)}`}
            color="inherit"
            underline="hover"
          >
            {product.category}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <ProductImageGallery images={product.images} />
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    component="img"
                    src={
                      product.supplierImage ||
                      "/placeholder.svg?height=40&width=40"
                    }
                    alt={product.supplierName}
                    sx={{
                      width: 50,
                      height: 50,
                      mr: 2,
                      borderRadius: 2,
                      border: "2px solid #e8f5e8",
                      p: 0.5,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#0a5c36",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      {product.supplierName}
                    </Typography>
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        color: "#2d3748",
                        fontWeight: "bold",
                        lineHeight: 1.2,
                        fontSize: { xs: "1.5rem", md: "2rem" },
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating
                      value={product.rating}
                      readOnly
                      precision={0.5}
                      size="small"
                      sx={{
                        color: "#ffa726",
                        "& .MuiRating-iconFilled": { color: "#ffa726" },
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "#666", fontWeight: "500" }}
                    >
                      {product.rating}/5
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#0a5c36", fontWeight: "500" }}
                  >
                    ({product.reviewCount} đánh giá)
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #f8fcf8 0%, #e8f5e8 100%)",
                  border: "1px solid #e8f5e8",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  {product.originalPrice &&
                  product.price < product.originalPrice ? (
                    <>
                      <Typography
                        variant="h3"
                        component="p"
                        sx={{
                          color: "#0a5c36",
                          fontWeight: "bold",
                          fontSize: { xs: "1.8rem", md: "2.2rem" },
                        }}
                      >
                        {product.price.toLocaleString()}đ
                      </Typography>
                      <Typography
                        variant="h6"
                        component="p"
                        sx={{
                          color: "#999",
                          textDecoration: "line-through",
                          fontWeight: "normal",
                        }}
                      >
                        {product.originalPrice.toLocaleString()}đ
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: "#ff4757",
                          color: "#fff",
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        -
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        %
                      </Box>
                    </>
                  ) : (
                    <Typography
                      variant="h3"
                      component="p"
                      sx={{
                        color: "#0a5c36",
                        fontWeight: "bold",
                        fontSize: { xs: "1.8rem", md: "2.2rem" },
                      }}
                    >
                      {product.price.toLocaleString()}đ
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    bgcolor: "#f9f9f9",
                    borderRadius: 2,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: "#0a5c36",
                      borderRadius: "50%",
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "600", color: "#2d3748" }}
                  >
                    Dung tích:{" "}
                    <span style={{ color: "#0a5c36" }}>{product.volume}</span>
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#2d3748", fontWeight: "600" }}
                >
                  Số lượng
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "2px solid #e8f5e8",
                      borderRadius: 3,
                      bgcolor: "#ffffff",
                      overflow: "hidden",
                    }}
                  >
                    <IconButton
                      size="medium"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      sx={{
                        color: "#0a5c36",
                        "&:hover": { bgcolor: "#e8f5e8" },
                        borderRadius: 0,
                        px: 2,
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Box
                      sx={{
                        px: 3,
                        py: 1.5,
                        minWidth: 60,
                        textAlign: "center",
                        bgcolor: "#f8fcf8",
                        borderLeft: "1px solid #e8f5e8",
                        borderRight: "1px solid #e8f5e8",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#0a5c36", fontWeight: "bold" }}
                      >
                        {quantity}
                      </Typography>
                    </Box>
                    <IconButton
                      size="medium"
                      onClick={() => handleQuantityChange(1)}
                      disabled={
                        product.quantity === 0 || quantity >= product.quantity
                      }
                      sx={{
                        color: "#0a5c36",
                        "&:hover": { bgcolor: "#e8f5e8" },
                        borderRadius: 0,
                        px: 2,
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#666", ml: 2 }}>
                    {product.quantity > 0
                      ? `Còn ${product.quantity} hàng`
                      : "Hết hàng"}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addToCart}
                    disabled={product.quantity === 0}
                    sx={{
                      flex: 1,
                      borderColor: "#0a5c36",
                      color: "#0a5c36",
                      "&:hover": {
                        bgcolor: "#0a5c36",
                        color: "#fff",
                        borderColor: "#0a5c36",
                      },
                      borderRadius: 3,
                      py: 1.5,
                      fontWeight: "600",
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <IconButton
                    sx={{
                      border: "2px solid #e8f5e8",
                      color: "#0a5c36",
                      borderRadius: 3,
                      width: 56,
                      height: 56,
                      "&:hover": {
                        bgcolor: "#e8f5e8",
                        borderColor: "#0a5c36",
                      },
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={buyNow}
                  disabled={product.quantity === 0}
                  sx={{
                    bgcolor: "#0a5c36",
                    "&:hover": { bgcolor: "#084c2d" },
                    borderRadius: 3,
                    py: 2,
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1.1rem",
                    boxShadow: "0 8px 24px rgba(10, 92, 54, 0.3)",
                  }}
                >
                  Mua ngay
                </Button>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "600", color: "#2d3748" }}
                  >
                    Chia sẻ:
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#4267B2",
                      bgcolor: "#f0f2f5",
                      "&:hover": { bgcolor: "#e4e6ea" },
                    }}
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#25D366",
                      bgcolor: "#f0f8f4",
                      "&:hover": { bgcolor: "#e8f5e8" },
                    }}
                  >
                    <WhatsAppIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <List>
                  {[
                    "Cam kết chính hãng 100%",
                    "Giao hàng tận nơi trên toàn quốc",
                    "Đổi trả dễ dàng trong 7 ngày",
                    "Tư vấn miễn phí bởi chuyên gia",
                  ].map((item, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemIcon>
                        <CircleIcon sx={{ color: "#0a5c36", fontSize: 10 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                          variant: "body2",
                          sx: { color: "#2d3748", fontWeight: "500" },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              mb: 4,
              position: "sticky",
              top: 0,
              bgcolor: "background.paper",
              zIndex: 10,
              backdropFilter: "blur(10px)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, md: 4 },
                overflowX: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                px: { xs: 1, md: 0 },
              }}
            >
              {[
                { key: "description", label: "Thông tin sản phẩm", icon: "📄" },
                { key: "ingredients", label: "Thành phần chính", icon: "🧪" },
                { key: "usage", label: "Cách sử dụng", icon: "📋" },
                { key: "reviews", label: "Đánh giá", icon: "⭐" },
              ].map((tab) => (
                <Box
                  key={tab.key}
                  component="button"
                  onClick={() => setActiveTab(tab.key)}
                  sx={{
                    position: "relative",
                    pb: 2,
                    px: { xs: 2, md: 3 },
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    color: activeTab === tab.key ? "#0a5c36" : "text.secondary",
                    background: "none",
                    border: "none",
                    textTransform: "none",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    minWidth: "fit-content",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": {
                      color: "#0a5c36",
                      transform: "translateY(-1px)",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: "50%",
                      transform: `translateX(-50%) scaleX(${
                        activeTab === tab.key ? 1 : 0
                      })`,
                      width: "90%",
                      height: "3px",
                      bgcolor: "#0a5c36",
                      borderRadius: "2px 2px 0 0",
                      transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontSize: "1.1em",
                      filter:
                        activeTab === tab.key
                          ? "grayscale(0)"
                          : "grayscale(0.5)",
                      transition: "filter 0.3s ease",
                    }}
                  >
                    {tab.icon}
                  </Box>
                  {tab.label}
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              minHeight: "400px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                opacity: activeTab === "description" ? 1 : 0,
                transform:
                  activeTab === "description"
                    ? "translateY(0)"
                    : "translateY(20px)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: activeTab === "description" ? "static" : "absolute",
                width: "100%",
                pointerEvents: activeTab === "description" ? "auto" : "none",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #f8fcf8 0%, #ffffff 100%)",
                  borderRadius: 3,
                  p: 4,
                  border: "1px solid #e8f5e8",
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: "#0a5c36",
                    fontWeight: "bold",
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "#0a5c36",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    📄
                  </Box>
                  Thông tin sản phẩm
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "500",
                    mb: 4,
                    color: "#2d3748",
                    lineHeight: 1.7,
                    fontSize: "1.1rem",
                  }}
                >
                  {product.description}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                opacity: activeTab === "ingredients" ? 1 : 0,
                transform:
                  activeTab === "ingredients"
                    ? "translateY(0)"
                    : "translateY(20px)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: activeTab === "ingredients" ? "static" : "absolute",
                width: "100%",
                pointerEvents: activeTab === "ingredients" ? "auto" : "none",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #f8fcf8 0%, #ffffff 100%)",
                  borderRadius: 3,
                  p: 4,
                  border: "1px solid #e8f5e8",
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: "#0a5c36",
                    fontWeight: "bold",
                    mb: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "#0a5c36",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    🧪
                  </Box>
                  Thành phần chính
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "500",
                    mb: 4,
                    color: "#2d3748",
                    lineHeight: 1.7,
                    fontSize: "1.1rem",
                  }}
                >
                  {product.ingredients}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                opacity: activeTab === "usage" ? 1 : 0,
                transform:
                  activeTab === "usage" ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: activeTab === "usage" ? "static" : "absolute",
                width: "100%",
                pointerEvents: activeTab === "usage" ? "auto" : "none",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #f8fcf8 0%, #ffffff 100%)",
                  borderRadius: 3,
                  p: 4,
                  border: "1px solid #e8f5e8",
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: "#0a5c36",
                    fontWeight: "bold",
                    mb: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "#0a5c36",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    📋
                  </Box>
                  Cách sử dụng
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "500",
                    mb: 4,
                    color: "#2d3748",
                    lineHeight: 1.7,
                    fontSize: "1.1rem",
                  }}
                >
                  {product.usage}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                opacity: activeTab === "reviews" ? 1 : 0,
                transform:
                  activeTab === "reviews"
                    ? "translateY(0)"
                    : "translateY(20px)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: activeTab === "reviews" ? "static" : "absolute",
                width: "100%",
                pointerEvents: activeTab === "reviews" ? "auto" : "none",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #f8fcf8 0%, #ffffff 100%)",
                  borderRadius: 3,
                  p: 4,
                  border: "1px solid #e8f5e8",
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: "#0a5c36",
                    fontWeight: "bold",
                    mb: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "#0a5c36",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    ⭐
                  </Box>
                  Đánh giá của khách hàng
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {[
                    {
                      name: "Trần Văn Toàn",
                      comment: "Sản phẩm vô cùng chất lượng",
                      rating: 5,
                    },
                    {
                      name: "Võ Phi",
                      comment: "Hương thơm dễ chịu mềm",
                      rating: 5,
                    },
                    {
                      name: "Hoàng Vũ Khải",
                      comment: "Hàng Việt Nam chất lượng cao",
                      rating: 5,
                    },
                    {
                      name: "Nguyễn Ngọc Linh",
                      comment: "Sản phẩm rất tuyệt vời",
                      rating: 5,
                    },
                    {
                      name: "Võ Thị Dung",
                      comment: "Đã sử dụng, giá cả hợp lý",
                      rating: 5,
                    },
                    {
                      name: "Lê Thị Kiều Diễm",
                      comment: "Rất tốt, hợp ý mình",
                      rating: 5,
                    },
                  ].map((review, index) => (
                    <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                      <Card
                        sx={{
                          height: "100%",
                          bgcolor: "#fff",
                          borderRadius: 3,
                          border: "1px solid #e8f5e8",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 12px 30px rgba(10, 92, 54, 0.15)",
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 3,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "#0a5c36",
                                mr: 2,
                                width: 48,
                                height: 48,
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                              }}
                            >
                              {review.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: "bold", color: "#2d3748" }}
                              >
                                {review.name}
                              </Typography>
                              <Rating
                                value={review.rating}
                                readOnly
                                size="small"
                                sx={{
                                  "& .MuiRating-iconFilled": {
                                    color: "#ffa726",
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#2d3748",
                              lineHeight: 1.6,
                              fontStyle: "italic",
                            }}
                          >
                            "{review.comment}"
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box
                  sx={{
                    p: 4,
                    bgcolor: "#f0f8f4",
                    borderRadius: 3,
                    border: "1px solid #e8f5e8",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 3,
                      color: "#0a5c36",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ fontSize: "1.2rem" }}>✍️</Box>
                    Viết đánh giá
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                    sx={{
                      mb: 3,
                      bgcolor: "white",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover fieldset": {
                          borderColor: "#0a5c36",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#0a5c36",
                        },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: "500" }}>
                        Đánh giá của bạn:
                      </Typography>
                      <Rating
                        sx={{
                          "& .MuiRating-iconFilled": { color: "#ffa726" },
                          "& .MuiRating-iconHover": { color: "#ffa726" },
                        }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#0a5c36",
                        "&:hover": { bgcolor: "#084c2d" },
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        fontWeight: "600",
                        textTransform: "none",
                        boxShadow: "0 4px 12px rgba(10, 92, 54, 0.3)",
                      }}
                    >
                      Gửi đánh giá
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: "#0a5c36",
              fontWeight: "bold",
              mb: 5,
              textAlign: "center",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 80,
                height: 3,
                backgroundColor: "#0a5c36",
                borderRadius: 2,
              },
            }}
          >
            Sản phẩm liên quan
          </Typography>

          <Grid container spacing={3}>
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relatedProduct) => (
                <Grid
                  item
                  size={{ xs: 12, sm: 6, md: 3 }}
                  key={relatedProduct.id}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "#ffffff",
                      borderRadius: 3,
                      border: "1px solid #e8f5e8",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 16px 32px rgba(10, 92, 54, 0.15)",
                        border: "1px solid #0a5c36",
                      },
                      cursor: "pointer",
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    }}
                    onClick={() =>
                      (window.location.href = `/product/${relatedProduct.id}`)
                    }
                  >
                    <Box
                      sx={{
                        position: "relative",
                        p: 3,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 200,
                        background:
                          "linear-gradient(135deg, #f8fcf8 0%, #e8f5e8 100%)",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(45deg, transparent 0%, rgba(10, 92, 54, 0.03) 100%)",
                          borderRadius: "12px 12px 0 0",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        sx={{
                          height: "100%",
                          maxHeight: 160,
                          objectFit: "contain",
                          transition: "transform 0.3s ease-in-out",
                          zIndex: 1,
                          position: "relative",
                          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
                        }}
                      />
                    </Box>

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        p: 3,
                        pt: 2,
                        textAlign: "center",
                        background: "#ffffff",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: "600",
                          mb: 2,
                          height: "48px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          color: "#2d3748",
                          fontSize: "1rem",
                          lineHeight: 1.2,
                        }}
                      >
                        {relatedProduct.name}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: "#0a5c36",
                            color: "#ffffff",
                            px: 2.5,
                            py: 1,
                            borderRadius: 25,
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            boxShadow: "0 4px 12px rgba(10, 92, 54, 0.3)",
                            position: "relative",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background:
                                "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                              borderRadius: 25,
                            },
                          }}
                        >
                          {new Intl.NumberFormat("vi-VN").format(
                            relatedProduct.price
                          )}
                          đ
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          mt: 2,
                          opacity: 0,
                          transform: "translateY(10px)",
                          transition: "all 0.3s ease-in-out",
                          ".MuiCard-root:hover &": {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#0a5c36",
                            fontWeight: "600",
                            textDecoration: "underline",
                            textUnderlineOffset: "4px",
                            fontSize: "0.875rem",
                          }}
                        >
                          Xem chi tiết →
                        </Typography>
                      </Box>
                    </CardContent>

                    <Box
                      sx={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                        backgroundColor: "#ff6b6b",
                        color: "#ffffff",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        boxShadow: "0 2px 8px rgba(255, 107, 107, 0.4)",
                        zIndex: 2,
                      }}
                    >
                      Hot
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  Chưa có sản phẩm liên quan
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>

        <Box sx={{ mt: 8, mb: 4, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ color: "#0a5c36", fontStyle: "italic", mb: 2 }}
          >
            Không tìm thấy được dòng sản phẩm mà bạn cần hoặc thích hợp với bạn?
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0a5c36",
              "&:hover": { bgcolor: "#084c2d" },
              borderRadius: 1,
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
            }}
          >
            SỬ DỤNG COSAI CỦA CHÚNG TÔI
          </Button>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: "100%",
            bgcolor: "#0a5c36",
            color: "white",
            "& .MuiAlert-icon": {
              color: "white",
            },
          }}
        >
          Đã thêm sản phẩm vào giỏ hàng thành công!
        </Alert>
      </Snackbar>
      <Chatbox />
      <Footer />
    </Box>
  );
}

export default ProductDetailPage;
