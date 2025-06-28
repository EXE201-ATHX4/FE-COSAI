import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
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
import { products } from "../ListProduct/data/products";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import Chatbox from "../Cosai/ChatBox";

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Redirect to home page if product not found
        window.location.href = "/";
      }
    }
  }, [id]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = () => {
    if (!product) return;

    try {
      // Lấy giỏ hàng hiện tại từ localStorage
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Tạo item sản phẩm mới
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        originalPrice: product.price,
        image: product.image,
        brand: product.brand,
        volume: product.volume,
        quantity: quantity,
        addedAt: new Date().toISOString(),
      };

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItemIndex = existingCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã có, cập nhật số lượng
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        // Nếu chưa có, thêm sản phẩm mới
        existingCart.push(cartItem);
      }

      // Lưu lại vào localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));

      // Hiển thị thông báo thành công
      setOpenSnackbar(true);

      // Reset số lượng về 1
      setQuantity(1);

      console.log("Đã thêm vào giỏ hàng:", cartItem);
      console.log("Giỏ hàng hiện tại:", existingCart);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!");
    }
  };

  // Hàm mua ngay
  const buyNow = () => {
    // Thêm vào giỏ hàng trước
    addToCart();

    // Chuyển hướng đến trang thanh toán (có thể tùy chỉnh)
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 500);
  };

  // Hàm đóng thông báo
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
        {/* Breadcrumbs */}
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
          <Link component={RouterLink} to="/" color="inherit" underline="hover">
            {product.brand}
          </Link>
          <Link component={RouterLink} to="/" color="inherit" underline="hover">
            {product.category}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <ProductImageGallery images={product.images} />
          </Grid>

          {/* Product Info */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Box
                  component="img"
                  src={
                    product.brandImage || "/placeholder.svg?height=40&width=40"
                  }
                  alt={product.brand}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ color: "#0a5c36", fontWeight: "bold" }}
                >
                  {product.name}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Rating
                  value={product.rating}
                  readOnly
                  precision={0.5}
                  sx={{ color: "#0a5c36" }}
                />
                <Typography variant="body2" sx={{ ml: 1, color: "#213547" }}>
                  {product.reviewCount} Đánh giá
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "baseline", mb: 3 }}>
                {product.salePrice ? (
                  <>
                    <Typography
                      variant="h5"
                      component="p"
                      sx={{
                        color: "#999",
                        textDecoration: "line-through",
                        fontWeight: "normal",
                        mr: 2,
                      }}
                    >
                      {product.price.toLocaleString()}đ
                    </Typography>
                    <Typography
                      variant="h4"
                      component="p"
                      sx={{
                        color: "#0a5c36",
                        fontWeight: "bold",
                      }}
                    >
                      {product.salePrice.toLocaleString()}đ
                    </Typography>
                  </>
                ) : (
                  <Typography
                    variant="h4"
                    component="p"
                    sx={{
                      color: "#0a5c36",
                      fontWeight: "bold",
                    }}
                  >
                    {product.price.toLocaleString()}đ
                  </Typography>
                )}
              </Box>

              <Typography
                variant="body1"
                sx={{ mb: 2, fontWeight: "medium", color: "#213547" }}
              >
                Dung tích: {product.volume}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Typography variant="body1" sx={{ mr: 2, color: "#213547" }}>
                  Số lượng:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    value={quantity}
                    inputProps={{
                      readOnly: true,
                      style: {
                        textAlign: "center",
                        width: "40px",
                        padding: "5px 0",
                      },
                    }}
                    variant="standard"
                    sx={{
                      "& .MuiInput-underline:before": { borderBottom: "none" },
                      "& .MuiInput-underline:after": { borderBottom: "none" },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottom: "none",
                      },
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={addToCart}
                  sx={{
                    bgcolor: "#0a5c36",
                    "&:hover": { bgcolor: "#084c2d" },
                    flex: 1,
                    borderRadius: 1,
                    py: 1.5,
                  }}
                >
                  THÊM VÀO GIỎ HÀNG
                </Button>
                <IconButton
                  sx={{
                    border: "1px solid #0a5c36",
                    color: "#0a5c36",
                    borderRadius: 1,
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={buyNow}
                sx={{
                  bgcolor: "#0a5c36",
                  "&:hover": { bgcolor: "#084c2d" },
                  mb: 3,
                  borderRadius: 1,
                  py: 1.5,
                }}
              >
                MUA NGAY
              </Button>

              <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mr: 2, color: "#213547" }}
                >
                  Share:
                </Typography>
                <IconButton size="small" sx={{ color: "#4267B2" }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: "#25D366" }}>
                  <WhatsAppIcon />
                </IconButton>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1, color: "#0a5c36" }}
                >
                  Còn hàng
                </Typography>
                <Divider />
              </Box>

              <Box sx={{ mb: 3, p: 2, bgcolor: "#f0f8f4", borderRadius: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1, color: "#0a5c36" }}
                >
                  Chính sách đổi trả Hàng
                </Typography>
                <Typography variant="body2" sx={{ color: "#213547" }}>
                  Chính sách đổi trả: Quý khách có thể đổi trả hàng trong vòng 7
                  ngày kể từ ngày nhận hàng nếu sản phẩm lỗi do nhà sản xuất.
                  Chúng tôi sẽ hỗ trợ đổi sản phẩm hoặc hoàn tiền cho khách
                  hàng, với quy trình xử lý nhanh chóng và chuyên nghiệp.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Product Details Tabs */}
        <Box sx={{ mt: 6 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Typography
                variant="h6"
                component="button"
                onClick={() => setActiveTab("description")}
                sx={{
                  pb: 1,
                  px: 2,
                  cursor: "pointer",
                  fontWeight: "bold",
                  color:
                    activeTab === "description" ? "#0a5c36" : "text.secondary",
                  borderBottom:
                    activeTab === "description" ? "3px solid #0a5c36" : "none",
                  background: "none",
                  border: "none",
                  textTransform: "uppercase",
                }}
              >
                Thông tin sản phẩm
              </Typography>
              <Typography
                variant="h6"
                component="button"
                onClick={() => setActiveTab("ingredients")}
                sx={{
                  pb: 1,
                  px: 2,
                  cursor: "pointer",
                  fontWeight: "bold",
                  color:
                    activeTab === "ingredients" ? "#0a5c36" : "text.secondary",
                  borderBottom:
                    activeTab === "ingredients" ? "3px solid #0a5c36" : "none",
                  background: "none",
                  border: "none",
                  textTransform: "uppercase",
                }}
              >
                Thành phần chính
              </Typography>
              <Typography
                variant="h6"
                component="button"
                onClick={() => setActiveTab("usage")}
                sx={{
                  pb: 1,
                  px: 2,
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: activeTab === "usage" ? "#0a5c36" : "text.secondary",
                  borderBottom:
                    activeTab === "usage" ? "3px solid #0a5c36" : "none",
                  background: "none",
                  border: "none",
                  textTransform: "uppercase",
                }}
              >
                Cách sử dụng
              </Typography>
              <Typography
                variant="h6"
                component="button"
                onClick={() => setActiveTab("reviews")}
                sx={{
                  pb: 1,
                  px: 2,
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: activeTab === "reviews" ? "#0a5c36" : "text.secondary",
                  borderBottom:
                    activeTab === "reviews" ? "3px solid #0a5c36" : "none",
                  background: "none",
                  border: "none",
                  textTransform: "uppercase",
                }}
              >
                Đánh giá
              </Typography>
            </Box>
          </Box>

          {/* Description Tab */}
          {activeTab === "description" && (
            <Box>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: "#0a5c36",
                  fontWeight: "bold",
                  mb: 3,
                  textTransform: "uppercase",
                }}
              >
                Thông tin sản phẩm
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "#0a5c36" }}
                >
                  {product.description}
                </Typography>

                <List>
                  {product.freeFrom?.map((item, index) => (
                    <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 24 }}>
                        <CircleIcon sx={{ color: "#0a5c36", fontSize: 8 }} />
                      </ListItemIcon>
                      <ListItemText primary={item} sx={{ color: "#213547" }} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}

          {/* Ingredients Tab */}
          {activeTab === "ingredients" && (
            <Box>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: "#0a5c36",
                  fontWeight: "bold",
                  mb: 3,
                  textTransform: "uppercase",
                }}
              >
                Thành phần chính
              </Typography>

              <Grid container spacing={4}>
                {product.ingredients?.map((ingredient, index) => (
                  <Grid item size={{ xs: 12, md: 6 }} key={index}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1, color: "#0a5c36" }}
                      >
                        {ingredient.name}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#213547" }}>
                        {ingredient.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Usage Tab */}
          {activeTab === "usage" && (
            <Box>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: "#0a5c36",
                  fontWeight: "bold",
                  mb: 3,
                  textTransform: "uppercase",
                }}
              >
                Cách sử dụng
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "#0a5c36" }}
                >
                  {product.usage}
                </Typography>
              </Box>

              {product.usageDetails && (
                <>
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 2, color: "#0a5c36" }}
                    >
                      Lượng dùng
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#213547" }}>
                      {product.usageDetails.amount}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 2, color: "#0a5c36" }}
                    >
                      Mùi hương
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#213547" }}>
                      {product.usageDetails.scent}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 2, color: "#0a5c36" }}
                    >
                      Lưu ý
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#213547" }}>
                      {product.usageDetails.note}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <Box>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  color: "#0a5c36",
                  fontWeight: "bold",
                  mb: 3,
                  textTransform: "uppercase",
                }}
              >
                Đánh giá của khách hàng
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                {[
                  {
                    name: "Trương Gia Hưng",
                    comment: "Sản phẩm vô cùng chất lượng",
                    rating: 5,
                  },
                  {
                    name: "Trần Việt Hội",
                    comment: "Hương thơm dễ chịu mềm",
                    rating: 5,
                  },
                  {
                    name: "Ngô Đình Anh",
                    comment: "Hàng Việt Nam chất lượng cao",
                    rating: 5,
                  },
                  {
                    name: "Nguyễn Việt Hương",
                    comment: "Sản phẩm rất tuyệt vời",
                    rating: 5,
                  },
                  {
                    name: "Minh Hoàng Trương",
                    comment: "Đã sử dụng, giá cả hợp lý",
                    rating: 5,
                  },
                  {
                    name: "Đoàn Trường",
                    comment: "Rất tốt, hợp ý mình",
                    rating: 5,
                  },
                ].map((review, index) => (
                  <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Card
                      sx={{
                        height: "100%",
                        bgcolor: "#f9f9f9",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Avatar sx={{ bgcolor: "#0a5c36", mr: 2 }}>
                            {review.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {review.name}
                            </Typography>
                            <Rating
                              value={review.rating}
                              readOnly
                              size="small"
                              sx={{ color: "#0a5c36" }}
                            />
                          </Box>
                        </Box>
                        <Typography variant="body2">
                          {review.comment}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ p: 3, bgcolor: "#f0f8f4", borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "#0a5c36" }}
                >
                  Viết đánh giá
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Để lại bình luận của bạn tại đây..."
                  sx={{
                    mb: 2,
                    bgcolor: "white",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: { xs: 2, md: 0 },
                    }}
                  >
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      Đánh giá:
                    </Typography>
                    <Rating sx={{ color: "#0a5c36" }} />
                  </Box>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#0a5c36",
                      "&:hover": { bgcolor: "#084c2d" },
                      borderRadius: 1,
                    }}
                  >
                    Gửi đánh giá
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        {/* Related Products */}
        <Box sx={{ mt: 8 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: "#0a5c36",
              fontWeight: "bold",
              mb: 3,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Sản phẩm liên quan
          </Typography>

          <Grid container spacing={3}>
            {products.slice(0, 4).map((relatedProduct) => (
              <Grid item size={{ xs: 6, sm: 3 }} key={relatedProduct.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "#f9f7f2",
                    borderRadius: 1,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 3,
                    },
                    cursor: "pointer",
                    overflow: "visible",
                    position: "relative",
                    boxShadow: "none",
                  }}
                  onClick={() =>
                    (window.location.href = `/product/${relatedProduct.id}`)
                  }
                >
                  <Box
                    sx={{
                      position: "relative",
                      p: 2,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="img"
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      sx={{ height: 150, objectFit: "contain" }}
                    />
                  </Box>
                  <CardContent
                    sx={{ flexGrow: 1, p: 2, pt: 0, textAlign: "center" }}
                  >
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{
                        fontWeight: "medium",
                        mb: 0.5,
                        height: "40px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {relatedProduct.name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mb: 1 }}
                    >
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          fontWeight: "bold",
                          color: "#0a5c36",
                        }}
                      >
                        {relatedProduct.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Bottom Banner */}
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

      {/* Snackbar thông báo */}
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
          <Chatbox/>
      <Footer />
    </Box>
  );
}

export default ProductDetailPage;
