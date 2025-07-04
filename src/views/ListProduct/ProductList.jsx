import { useState, useEffect, useRef } from "react"; // Thêm useRef
import {
  Box,
  Grid,
  Typography,
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
  Slider,
  FormControl,
  Select,
  MenuItem,
  Rating,
  Pagination,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { products, brands, categories, promotions } from "./data/products";
import ProductCard from "./ProductCard";

// Helper function to format price
const formatPrice = (price) => {
  const numericPrice = typeof price === "string" ? parseFloat(String(price).replace(/[^0-9.-]+/g, "")) : price;
  if (isNaN(numericPrice)) {
    return "0 ₫";
  }
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(numericPrice);
};


function ProductList() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState(products);
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState(products);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000000],
    minRating: 0,
    promotions: [],
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [reviewOpen, setReviewOpen] = useState(true);
  const [promotionOpen, setPromotionOpen] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const productsListRef = useRef(null); // <--- Tạo một ref mới

  // Function to apply all filters and sorting
  const applyFiltersAndSort = () => {
    let result = [...allProducts];

    // Apply Filters
    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category));
    }

    result = result.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    if (filters.minRating > 0) {
      result = result.filter((product) => product.rating >= filters.minRating);
    }

    if (filters.promotions.length > 0) {
      result = result.filter((product) =>
        product.promotions && filters.promotions.some((promo) => product.promotions.includes(promo))
      );
    }

    // Apply Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredAndSortedProducts(result);
    setCurrentPage(1); // Reset về trang đầu tiên khi bộ lọc/sắp xếp thay đổi
  };

  // Update active filters for display
  const updateActiveFilters = () => {
    const active = [];

    filters.categories.forEach((category) => {
      active.push({ type: "category", value: category, label: `Thể loại: ${category}` });
    });

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000) {
      active.push({
        type: "priceRange",
        value: filters.priceRange,
        label: `Giá: ${formatPrice(filters.priceRange[0])} - ${formatPrice(filters.priceRange[1])}`,
      });
    }

    if (filters.minRating > 0) {
      active.push({
        type: "minRating",
        value: filters.minRating,
        label: `Đánh giá: ${filters.minRating} sao trở lên`,
      });
    }

    filters.promotions.forEach((promotion) => {
      active.push({ type: "promotion", value: promotion, label: `Khuyến mãi: ${promotion}` });
    });

    setActiveFilters(active);
  };

  // Remove individual filter
  const handleRemoveFilter = (type, value) => {
    if (type === "category") {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.filter(c => c !== value)
      }));
    } else if (type === "priceRange") {
      setFilters(prev => ({ ...prev, priceRange: [0, 1000000] }));
    } else if (type === "minRating") {
      setFilters(prev => ({ ...prev, minRating: 0 }));
    } else if (type === "promotion") {
      setFilters(prev => ({
        ...prev,
        promotions: prev.promotions.filter(p => p !== value)
      }));
    }
  };

  // Handlers for filter changes
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, value] : prev.categories.filter((c) => c !== value),
    }));
  };

  const handlePriceRangeChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, priceRange: newValue }));
  };

  const handleMinRatingChange = (event) => {
    setFilters((prev) => ({ ...prev, minRating: Number(event.target.value) }));
  };

  const handlePromotionChange = (event) => {
    const { value, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      promotions: checked ? [...prev.promotions, value] : prev.promotions.filter((p) => p !== value),
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000000],
      minRating: 0,
      promotions: [],
    });
    setSortBy("default");
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Cuộn đến vị trí của productsListRef khi chuyển trang
    if (productsListRef.current) {
      productsListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Apply filters and sort whenever filters or sortBy changes
  useEffect(() => {
    applyFiltersAndSort();
  }, [filters, sortBy, allProducts]);

  // Update active filters whenever filters change
  useEffect(() => {
    updateActiveFilters();
  }, [filters]);


  const valueText = (value) => {
    return `${formatPrice(value)}`;
  };

  const displayStart = filteredAndSortedProducts.length > 0 ? indexOfFirstProduct + 1 : 0;
  const displayEnd = Math.min(indexOfLastProduct, filteredAndSortedProducts.length);


  return (
    <Box sx={{ p: 3, display: "flex", gap: 3 }}>
      {/* Filter Sidebar */}
      <Box sx={{ width: 250, flexShrink: 0 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#213547" }}>
          Bộ lọc
        </Typography>

        {/* By Categories */}
        <Paper elevation={0} sx={{ mb: 2, p: 2, borderRadius: 1, border: "1px solid #eee" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
              Phân loại
            </Typography>
            <IconButton size="small">
              {categoryOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
          <Collapse in={categoryOpen}>
            <FormGroup sx={{ mt: 1 }}>
              {categories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      size="small"
                      value={category}
                      checked={filters.categories.includes(category)}
                      onChange={handleCategoryChange}
                      sx={{ color: "#0a5c36", "&.Mui-checked": { color: "#0a5c36" } }}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>
          </Collapse>
        </Paper>

        {/* Price */}
        <Paper elevation={0} sx={{ mb: 2, p: 2, borderRadius: 1, border: "1px solid #eee" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setPriceOpen(!priceOpen)}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
              Giá
            </Typography>
            <IconButton size="small">
              {priceOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
          <Collapse in={priceOpen}>
            <Box sx={{ mt: 2, px: 4 }}>
              <Slider
                getAriaLabel={() => "Price range"}
                value={filters.priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={valueText}
                min={0}
                max={1000000}
                step={10000}
                marks={[
                  { value: 0, label: formatPrice(0) },
                  { value: 1000000, label: formatPrice(1000000) },
                ]}
                sx={{ color: "#0a5c36" }}
              />
              <Typography variant="body2" sx={{ textAlign: "center", mt: 1 }}>
                {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
              </Typography>
            </Box>
          </Collapse>
        </Paper>

        {/* Review */}
        <Paper elevation={0} sx={{ mb: 2, p: 2, borderRadius: 1, border: "1px solid #eee" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => setReviewOpen(!reviewOpen)}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
              Review
            </Typography>
            <IconButton size="small">
              {reviewOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
          <Collapse in={reviewOpen}>
            <RadioGroup value={filters.minRating.toString()} onChange={handleMinRatingChange} sx={{ mt: 1 }}>
              {[5, 4, 3, 2, 1].map((star) => (
                <FormControlLabel
                  key={star}
                  value={star.toString()}
                  control={<Radio size="small" sx={{ color: "#0a5c36", "&.Mui-checked": { color: "#0a5c36" } }} />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Rating value={star} readOnly size="small" sx={{ color: "#ffc107" }} />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {star === 5 ? "" : " trở lên"}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          </Collapse>
        </Paper>

      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1 }} ref={productsListRef}> {/* <-- Gán ref vào đây */}
        {/* Active Filters and Sort By */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
            <Typography variant="body2" sx={{ fontWeight: "medium", color: "#213547" }}>
              Hiển thị {displayStart}-{displayEnd} trong {filteredAndSortedProducts.length} kết quả
            </Typography>
            {activeFilters.length > 0 && (
              <>
                <Typography variant="body2" sx={{ ml: 2, fontWeight: "medium", color: "#213547" }}>
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
                <Button
                  variant="text"
                  size="small"
                  onClick={handleClearAllFilters}
                  startIcon={<CloseIcon fontSize="small" />}
                  sx={{ color: "#0a5c36" }}
                >
                  Xóa tất cả
                </Button>
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: "medium", color:'black' }}>
              Sắp xếp theo:
            </Typography>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <Select value={sortBy} onChange={handleSortByChange} displayEmpty>
                <MenuItem value="default">Mặc định</MenuItem>
                <MenuItem value="price-asc">Giá: Thấp đến Cao</MenuItem>
                <MenuItem value="price-desc">Giá: Cao đến Thấp</MenuItem>
                <MenuItem value="name-asc">Tên: A-Z</MenuItem>
                <MenuItem value="name-desc">Tên: Z-A</MenuItem>
                <MenuItem value="rating-desc">Đánh giá: Cao nhất</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Product Grid - 4 items per row (on large screens) */}
        <Grid container spacing={4}>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
               <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                 <ProductCard
                   product={product}
                   onProductClick={handleProductClick}
                 />
               </Grid>
            ))
          ) : (
            <Grid item xs={12}>
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
            </Grid>
          )}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProductList;