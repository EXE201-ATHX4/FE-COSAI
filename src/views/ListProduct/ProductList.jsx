import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Paper,
  Button,
  IconButton,
  Collapse,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Chip,
} from "@mui/material";
import {
  Circle as CircleIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { products, brands, categories, priceRanges } from "./data/products";

function ProductList() {
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [expandedFilters, setExpandedFilters] = useState({
    brand: false,
    price: false,
    category: false,
  });
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: null,
    categories: [],
  });
  const [activeFilters, setActiveFilters] = useState([]);

  // Xử lý khi người dùng nhấp vào tiêu đề bộ lọc
  const handleToggleFilter = (filterType) => {
    setExpandedFilters({
      ...expandedFilters,
      [filterType]: !expandedFilters[filterType],
    });
  };

  // Xử lý khi người dùng chọn thương hiệu
  const handleBrandChange = (brand) => {
    const currentBrands = [...filters.brands];
    if (currentBrands.includes(brand)) {
      setFilters({
        ...filters,
        brands: currentBrands.filter((b) => b !== brand),
      });
    } else {
      setFilters({
        ...filters,
        brands: [...currentBrands, brand],
      });
    }
  };

  // Xử lý khi người dùng chọn khoảng giá
  const handlePriceRangeChange = (event) => {
    setFilters({
      ...filters,
      priceRange:
        event.target.value === filters.priceRange ? null : event.target.value,
    });
  };

  // Xử lý khi người dùng chọn danh mục
  const handleCategoryChange = (category) => {
    const currentCategories = [...filters.categories];
    if (currentCategories.includes(category)) {
      setFilters({
        ...filters,
        categories: currentCategories.filter((c) => c !== category),
      });
    } else {
      setFilters({
        ...filters,
        categories: [...currentCategories, category],
      });
    }
  };

  // Xử lý khi người dùng nhấn nút tìm kiếm
  const handleSearch = () => {
    applyFilters();
    updateActiveFilters();
  };

  // Xử lý khi người dùng xóa một bộ lọc
  const handleRemoveFilter = (filterType, value) => {
    if (filterType === "brand") {
      setFilters({
        ...filters,
        brands: filters.brands.filter((b) => b !== value),
      });
    } else if (filterType === "category") {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== value),
      });
    } else if (filterType === "price") {
      setFilters({
        ...filters,
        priceRange: null,
      });
    }
  };

  // Xử lý khi người dùng xóa tất cả bộ lọc
  const handleClearAllFilters = () => {
    setFilters({
      brands: [],
      priceRange: null,
      categories: [],
    });
  };

  // Áp dụng bộ lọc
  const applyFilters = () => {
    let result = [...products];

    // Lọc theo thương hiệu
    if (filters.brands.length > 0) {
      result = result.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // Lọc theo khoảng giá
    if (filters.priceRange) {
      const selectedRange = priceRanges.find(
        (range) => range.id.toString() === filters.priceRange
      );
      if (selectedRange) {
        result = result.filter(
          (product) =>
            product.price >= selectedRange.min &&
            product.price <= selectedRange.max
        );
      }
    }

    // Lọc theo danh mục
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    setFilteredProducts(result);
  };

  // Cập nhật danh sách bộ lọc đang hoạt động
  const updateActiveFilters = () => {
    const active = [];

    // Thêm bộ lọc thương hiệu
    filters.brands.forEach((brand) => {
      active.push({
        type: "brand",
        value: brand,
        label: `Thương hiệu: ${brand}`,
      });
    });

    // Thêm bộ lọc khoảng giá
    if (filters.priceRange) {
      const selectedRange = priceRanges.find(
        (range) => range.id.toString() === filters.priceRange
      );
      if (selectedRange) {
        active.push({
          type: "price",
          value: filters.priceRange,
          label: `Giá: ${selectedRange.label}`,
        });
      }
    }

    // Thêm bộ lọc danh mục
    filters.categories.forEach((category) => {
      active.push({
        type: "category",
        value: category,
        label: `Danh mục: ${category}`,
      });
    });

    setActiveFilters(active);
  };

  // Xử lý khi người dùng nhấp vào sản phẩm
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Áp dụng bộ lọc khi component được tải hoặc khi bộ lọc thay đổi
  useEffect(() => {
    applyFilters();
    updateActiveFilters();
  }, [filters]);

  return (
    <Box>
      <Paper
        sx={{
          mb: 4,
          borderRadius: 1,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Grid container>
          {/* Bộ lọc thương hiệu */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ borderRight: { md: "1px solid #eee" } }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                cursor: "pointer",
              }}
              onClick={() => handleToggleFilter("brand")}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircleIcon sx={{ color: "#0a5c36", mr: 1 }} />
                <Typography>Thương hiệu (Brand)</Typography>
              </Box>
              <IconButton size="small">
                {expandedFilters.brand ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </Box>
            <Collapse in={expandedFilters.brand}>
              <Box sx={{ p: 2, pt: 0, maxHeight: "200px", overflowY: "auto" }}>
                <FormGroup>
                  {brands.map((brand) => (
                    <FormControlLabel
                      key={brand}
                      control={
                        <Checkbox
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          size="small"
                        />
                      }
                      label={brand}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Collapse>
          </Grid>

          {/* Bộ lọc giá cả */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{ borderRight: { md: "1px solid #eee" } }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                cursor: "pointer",
              }}
              onClick={() => handleToggleFilter("price")}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircleIcon sx={{ color: "#0a5c36", mr: 1 }} />
                <Typography>Giá cả (Price)</Typography>
              </Box>
              <IconButton size="small">
                {expandedFilters.price ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </Box>
            <Collapse in={expandedFilters.price}>
              <Box sx={{ p: 2, pt: 0 }}>
                <RadioGroup
                  value={filters.priceRange || ""}
                  onChange={handlePriceRangeChange}
                >
                  {priceRanges.map((range) => (
                    <FormControlLabel
                      key={range.id}
                      value={range.id.toString()}
                      control={<Radio size="small" />}
                      label={range.label}
                    />
                  ))}
                </RadioGroup>
              </Box>
            </Collapse>
          </Grid>

          {/* Bộ lọc phân loại */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                cursor: "pointer",
              }}
              onClick={() => handleToggleFilter("category")}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircleIcon sx={{ color: "#0a5c36", mr: 1 }} />
                <Typography>Phân loại (Type)</Typography>
              </Box>
              <IconButton size="small">
                {expandedFilters.category ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </Box>
            <Collapse in={expandedFilters.category}>
              <Box sx={{ p: 2, pt: 0, maxHeight: "200px", overflowY: "auto" }}>
                <FormGroup>
                  {categories.map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          checked={filters.categories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          size="small"
                        />
                      }
                      label={category}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Collapse>
          </Grid>

          {/* Nút tìm kiếm */}
          <Grid
            item
            xs={12}
            sx={{
              bgcolor: "#0a5c36",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleSearch}
              startIcon={<FilterListIcon />}
              sx={{
                bgcolor: "#fff",
                color: "#0a5c36",
                "&:hover": { bgcolor: "#f0f0f0" },
                fontWeight: "bold",
              }}
            >
              TÌM KIẾM
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Hiển thị bộ lọc đang hoạt động */}
      {activeFilters.length > 0 && (
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            Bộ lọc đang áp dụng:
          </Typography>
          {activeFilters.map((filter, index) => (
            <Chip
              key={index}
              label={filter.label}
              onDelete={() => handleRemoveFilter(filter.type, filter.value)}
              size="small"
              sx={{ bgcolor: "#e8f5e9", color: "#0a5c36" }}
            />
          ))}
          {activeFilters.length > 0 && (
            <Button
              variant="text"
              size="small"
              onClick={handleClearAllFilters}
              startIcon={<CloseIcon fontSize="small" />}
              sx={{ color: "#0a5c36" }}
            >
              Xóa tất cả
            </Button>
          )}
        </Box>
      )}

      {/* Hiển thị số lượng sản phẩm tìm thấy */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          Tìm thấy {filteredProducts.length} sản phẩm
        </Typography>
      </Box>

      {/* Danh sách sản phẩm */}
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item size={{ xs: 6, sm: 4, md: 3 }} key={product.id}>
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
              onClick={() => handleProductClick(product.id)}
            >
              {product.sale && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    bgcolor: "#f44336",
                    color: "white",
                    py: 0.5,
                    px: 1,
                    borderRadius: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    zIndex: 1,
                  }}
                >
                  SALE {product.sale}
                </Box>
              )}
              <Box
                sx={{
                  position: "relative",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={product.brandImage || "/placeholder.svg"}
                    alt={product.brand}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ width: "100%", height: 180, position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={product.image || "/placeholder.svg"}
                    alt={product.name}
                    sx={{
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
              <CardContent
                sx={{ flexGrow: 1, p: 2, pt: 0, textAlign: "center" }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    fontWeight: "medium",
                    mb: 0.5,
                    height: "48px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Dung tích:{" "}
                  <span
                    style={{
                      backgroundColor: "#ccc",
                      padding: "2px 8px",
                      borderRadius: "12px",
                    }}
                  >
                    {product.volume}
                  </span>
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                  <Typography
                    variant="body2"
                    component="div"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                      mr: 1,
                    }}
                  >
                    {product.originalPrice}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      color: "#0a5c36",
                    }}
                  >
                    {product.price}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Rating
                    value={product.rating}
                    readOnly
                    size="small"
                    precision={1}
                  />
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {product.reviewCount} Đánh giá
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Hiển thị thông báo khi không tìm thấy sản phẩm */}
      {filteredProducts.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" sx={{ color: "#0a5c36", mb: 2 }}>
            Không tìm thấy sản phẩm nào phù hợp với bộ lọc của bạn
          </Typography>
          <Button
            variant="contained"
            onClick={handleClearAllFilters}
            sx={{ bgcolor: "#0a5c36", "&:hover": { bgcolor: "#084c2d" } }}
          >
            Xóa bộ lọc
          </Button>
        </Box>
      )}

      {/* Nút xem thêm */}
      {filteredProducts.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0a5c36",
              "&:hover": { bgcolor: "#084c2d" },
              borderRadius: 1,
              px: 4,
            }}
          >
            Xem thêm
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ProductList;
