import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState } from "react";

// Helper function to format price
const formatPrice = (price) => {
  if (typeof price !== "number") {
    // This should ideally not happen if data is well-structured, but as a fallback
    price = parseFloat(String(price).replace(/[^0-9.-]+/g, ""));
    if (isNaN(price)) {
      price = 0; // Default to 0 if parsing fails
    }
  }
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
};

const ProductCard = ({ product, onProductClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click event from firing
    setIsFavorite(!isFavorite);
  };

  // Tính toán phần trăm giảm giá
  const calculateDiscountPercentage = (originalPrice, currentPrice) => {
    if (originalPrice && currentPrice && originalPrice > currentPrice) {
      const discount = originalPrice - currentPrice;
      const percentage = (discount / originalPrice) * 100;
      return Math.round(percentage); // Làm tròn đến số nguyên gần nhất
    }
    return null; // Không có giảm giá hoặc dữ liệu không hợp lệ
  };

  const discountPercentage = calculateDiscountPercentage(product.originalPrice, product.price);

  return (
    <Card
      sx={{
        height: "100%",
        width: "200px", // Or set width to 100% and let Grid handle it
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.3s ease",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        },
      }}
      onClick={() => onProductClick(product.id)}
    >
      {/* Discount Badge */}
      {discountPercentage !== null && ( // Hiển thị nếu có phần trăm giảm giá
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            bgcolor: "#ff3b1f", // Màu xanh lá cây cho giảm giá
            color: "white",
            py: 0.5,
            px: 1.5,
            borderRadius: "20px",
            fontSize: "0.875rem",
            fontWeight: "bold",
            zIndex: 2,
          }}
        >
          {discountPercentage}% Off
        </Box>
      )}
      {/* Keep existing product.sale if you still want to use it for custom sale text */}
      {product.sale && discountPercentage === null && ( // Chỉ hiển thị product.sale nếu không có discountPercentage tự tính toán
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            bgcolor: "#2e7d32",
            color: "white",
            py: 0.5,
            px: 1.5,
            borderRadius: "20px",
            fontSize: "0.875rem",
            fontWeight: "bold",
            zIndex: 2,
          }}
        >
          {product.sale} off
        </Box>
      )}


      {/* Top Actions (Favorite, Quick View/Compare, Add to Cart - keep placeholder for now) */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          {isFavorite ? (
            <Favorite sx={{ color: "#f44336" }} />
          ) : (
            <FavoriteBorder sx={{ color: "#666" }} />
          )}
        </IconButton>
        {/* These icons are typically for Quick View or Add to Cart, keep if intended for quick actions */}

        <IconButton
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 1)",
            },
          }}
          onClick={(e) => { e.stopPropagation(); console.log("Add to cart from card clicked"); }} // Add appropriate action
        >
          <Box
            component="svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 7H16V6C16 3.79 14.21 2 12 2S8 3.79 8 6V7H5C3.9 7 3 7.9 3 9V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7ZM10 6C10 4.9 10.9 4 12 4S14 4.9 14 6V7H10V6ZM19 19H5V9H7V10C7 10.55 7.45 11 8 11S9 10.55 9 10V9H15V10C15 10.55 15.45 11 16 11S17 10.55 17 10V9H19V19Z"
              fill="#666"
            />
          </Box>
        </IconButton>
      </Box>

      {/* Product Image */}
      <Box
        sx={{
          position: "relative",
          background: "linear-gradient(135deg, #f5f1e8 0%, #e8ddd4 100%)",
          borderRadius: "20px 20px 0 0",
          overflow: "hidden",
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 200, // Adjusted height
        }}
      >
        <CardMedia
          component="img"
          image={product.image || "/placeholder.svg"}
          alt={product.name}
          sx={{
            height: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            borderRadius: "12px",
          }}
        />
      </Box>

      {/* Product Content */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 2, // Adjusted padding
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Category (or Brand, depending on preference) */}
        <Typography
          variant="body2"
          sx={{
            color: "#666",
            fontWeight: 500,
            fontSize: "0.875rem",
          }}
        >
          {product.category || "Skin Care"}
        </Typography>

        {/* Product Name */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: "1rem", // Adjusted font size
            lineHeight: 1.3,
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "2.6rem", // Ensures consistent height for product names
          }}
        >
          {product.name}
        </Typography>

        {/* Rating and Reviews */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {/* Display actual rating using MUI Rating component */}
            <Rating value={product.rating || 0} readOnly precision={0.5} size="small" sx={{ color: "#ffc107" }} />
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, fontSize: "0.875rem", ml: 0.5 }}
            >
              ({product.reviewCount || 0}) {/* Display review count */}
            </Typography>
          </Box>
        </Box>

        {/* Price */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#2e7d32",
              fontWeight: 700,
              fontSize: "1.1rem", // Adjusted font size
            }}
          >
            {formatPrice(product.price)} {/* This is the current selling price */}
          </Typography>
          {product.originalPrice && product.originalPrice > product.price && ( // Only show originalPrice if it's higher than current price
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "#999",
                fontWeight: 500,
              }}
            >
              {formatPrice(product.originalPrice)} {/* This is the original price */}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;