import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  Chip,
  Stack,
  Pagination,
  Card,
  CardContent,
  Fade,
  Slide,
  Avatar,
  Divider,
  Container,
  Grid,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import supplierService from "../../service/supplier";

const Supplier = () => {
  // State management
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({ name: "", phoneNumber: "" });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });
  const [dialogMounted, setDialogMounted] = useState(false);

  // Fetch suppliers with pagination
  const fetchSuppliers = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const data = await supplierService.getSuppliers(page, size);
      setSuppliers(data.data.items);
      setPagination({
        totalItems: data.data.totalItems,
        totalPages: data.data.totalPages,
        currentPage: data.data.currentPage,
        pageSize: data.data.pageSize,
      });
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      showSnackbar(
        error.message || "Lỗi khi tải danh sách nhà cung cấp",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Load suppliers on component mount
  useEffect(() => {
    fetchSuppliers(pagination.currentPage, pagination.pageSize);
  }, []);

  // Show snackbar notification
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên nhà cung cấp không được để trống";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ (10-11 chữ số)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission for create/update
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (editingSupplier) {
        await supplierService.updateSupplier(editingSupplier.id, formData);
        showSnackbar("Cập nhật nhà cung cấp thành công");
      } else {
        await supplierService.createSupplier(formData);
        showSnackbar("Thêm nhà cung cấp thành công");
      }
      handleCloseDialog();
      fetchSuppliers(pagination.currentPage, pagination.pageSize);
    } catch (error) {
      console.error("Error saving supplier:", error);
      showSnackbar(error.message || "Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete supplier
  const handleDelete = async (supplierId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?")) {
      return;
    }

    setLoading(true);
    try {
      await supplierService.deleteSupplier(supplierId);
      showSnackbar("Xóa nhà cung cấp thành công");
      fetchSuppliers(pagination.currentPage, pagination.pageSize);
    } catch (error) {
      console.error("Error deleting supplier:", error);
      showSnackbar(error.message || "Lỗi khi xóa nhà cung cấp", "error");
    } finally {
      setLoading(false);
    }
  };

  // Open dialog for add/edit
  const handleOpenDialog = (supplier = null) => {
    setEditingSupplier(supplier);
    setFormData(
      supplier
        ? { name: supplier.name, phoneNumber: supplier.phoneNumber }
        : { name: "", phoneNumber: "" }
    );
    setErrors({});

    setTimeout(() => {
      setDialogMounted(true);
      setOpenDialog(true);
    }, 10);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setDialogMounted(false);
      setEditingSupplier(null);
      setFormData({ name: "", phoneNumber: "" });
      setErrors({});
    }, 200);
  };

  // Handle form input change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle page change
  const handlePageChange = (event, newPage) => {
    fetchSuppliers(newPage, pagination.pageSize);
  };

  useEffect(() => {
    return () => {
      setOpenDialog(false);
      setDialogMounted(false);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header Section */}
        <Fade in timeout={800}>
          <Card
            elevation={0}
            sx={{
              mb: 4,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      width: 56,
                      height: 56,
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    }}
                  >
                    <BusinessIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h3"
                      component="h1"
                      sx={{
                        fontWeight: 700,
                        background:
                          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1,
                      }}
                    >
                      Quản lý nhà cung cấp
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Quản lý thông tin các nhà cung cấp của hệ thống
                    </Typography>
                  </Box>
                </Box>

                <Stack direction="row" spacing={2}>
                  <Tooltip title="Làm mới dữ liệu">
                    <IconButton
                      onClick={() =>
                        fetchSuppliers(
                          pagination.currentPage,
                          pagination.pageSize
                        )
                      }
                      disabled={loading}
                      sx={{
                        bgcolor: "grey.100",
                        "&:hover": { bgcolor: "grey.200" },
                      }}
                    >
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    disabled={loading}
                    sx={{
                      background:
                        "linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)",
                      borderRadius: 2,
                      px: 3,
                      py: 1.5,
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 600,
                      boxShadow: "0 4px 20px rgba(255, 107, 107, 0.3)",
                      "&:hover": {
                        background:
                          "linear-gradient(45deg, #FF5252 30%, #FF7043 90%)",
                        boxShadow: "0 6px 25px rgba(255, 107, 107, 0.4)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Thêm nhà cung cấp
                  </Button>
                </Stack>
              </Box>

              {/* Statistics Cards */}
              <Grid container spacing={3}>
                <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card
                    elevation={0}
                    sx={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      borderRadius: 2,
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="h4" fontWeight="bold">
                            {pagination.totalItems}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Tổng nhà cung cấp
                          </Typography>
                        </Box>
                        <PeopleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card
                    elevation={0}
                    sx={{
                      background:
                        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      color: "white",
                      borderRadius: 2,
                    }}
                  ></Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Main Content */}
        <Fade in timeout={1000}>
          <Card
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              overflow: "hidden",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      Tên nhà cung cấp
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      Số điện thoại
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        textAlign: "center",
                      }}
                    >
                      Thao tác
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{ textAlign: "center", py: 8 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <CircularProgress size={50} thickness={4} />
                          <Typography variant="body1" color="text.secondary">
                            Đang tải dữ liệu...
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : suppliers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{ textAlign: "center", py: 8 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <BusinessIcon
                            sx={{ fontSize: 60, color: "grey.300" }}
                          />
                          <Typography variant="h6" color="text.secondary">
                            Không có nhà cung cấp nào
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Hãy thêm nhà cung cấp đầu tiên của bạn
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    suppliers.map((supplier, index) => (
                      <Slide
                        key={supplier.id}
                        direction="up"
                        in
                        timeout={300 + index * 100}
                      >
                        <TableRow
                          hover
                          sx={{
                            "&:nth-of-type(odd)": {
                              backgroundColor: "rgba(0, 0, 0, 0.02)",
                            },
                            "&:hover": {
                              backgroundColor: "rgba(103, 126, 234, 0.08)",
                              transform: "scale(1.01)",
                              transition: "all 0.2s ease",
                            },
                            cursor: "pointer",
                          }}
                        >
                          <TableCell>
                            <Chip
                              label={`#${supplier.id}`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor: "primary.main",
                                  width: 40,
                                  height: 40,
                                  background:
                                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                                }}
                              >
                                <BusinessIcon />
                              </Avatar>
                              <Box>
                                <Typography variant="body1" fontWeight="600">
                                  {supplier.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  Nhà cung cấp
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <PhoneIcon color="action" fontSize="small" />
                              <Typography variant="body1">
                                {supplier.phoneNumber}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="center"
                            >
                              <Tooltip title="Chỉnh sửa">
                                <IconButton
                                  color="primary"
                                  onClick={() => handleOpenDialog(supplier)}
                                  disabled={loading}
                                  sx={{
                                    bgcolor: "rgba(33, 150, 243, 0.1)",
                                    "&:hover": {
                                      bgcolor: "rgba(33, 150, 243, 0.2)",
                                      transform: "scale(1.1)",
                                    },
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xóa">
                                <IconButton
                                  color="error"
                                  onClick={() => handleDelete(supplier.id)}
                                  disabled={loading}
                                  sx={{
                                    bgcolor: "rgba(244, 67, 54, 0.1)",
                                    "&:hover": {
                                      bgcolor: "rgba(244, 67, 54, 0.2)",
                                      transform: "scale(1.1)",
                                    },
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      </Slide>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 3,
                  bgcolor: "grey.50",
                }}
              >
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  disabled={loading}
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: 2,
                      fontWeight: 600,
                    },
                  }}
                />
              </Box>
            )}
          </Card>
        </Fade>

        {/* Enhanced Dialog */}
        {dialogMounted && (
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
            disableEscapeKeyDown={loading}
            disableBackdropClick={loading}
            keepMounted={false}
            TransitionProps={{
              onExited: () => setDialogMounted(false),
            }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: editingSupplier ? "warning.main" : "primary.main",
                    background: editingSupplier
                      ? "linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)"
                      : "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
                  }}
                >
                  {editingSupplier ? <EditIcon /> : <AddIcon />}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {editingSupplier
                      ? "Chỉnh sửa nhà cung cấp"
                      : "Thêm nhà cung cấp mới"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {editingSupplier
                      ? "Cập nhật thông tin nhà cung cấp"
                      : "Điền thông tin nhà cung cấp mới"}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Tên nhà cung cấp"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  disabled={loading}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <BusinessIcon sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  required
                  disabled={loading}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <PhoneIcon sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
              </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 2 }}>
              <Button
                onClick={handleCloseDialog}
                disabled={loading}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Hủy
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{
                  background: editingSupplier
                    ? "linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)"
                    : "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {editingSupplier ? "Cập nhật" : "Thêm mới"}
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Enhanced Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            variant="filled"
            sx={{
              width: "100%",
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Supplier;
