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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Typography,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  Avatar,
  Fade,
  Slide,
  Container,
  Divider,
  Stack,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  AdminPanelSettings as AdminIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import userService from "../../service/user";

const User = () => {
  // State management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [dialogMounted, setDialogMounted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    gender: "",
    address: "",
    dateOfBirth: null,
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch users with pagination
  const fetchUsers = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const data = await userService.getUsers(page, size);
      setUsers(data.data.items);
      setPagination({
        totalItems: data.data.totalItems,
        totalPages: data.data.totalPages,
        currentPage: data.data.currentPage,
        pageSize: data.data.pageSize,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      showSnackbar(
        error.message || "Lỗi khi tải danh sách người dùng",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(pagination.currentPage, pagination.pageSize);
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên không được để trống";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ";
    }

    if (!formData.gender) {
      newErrors.gender = "Vui lòng chọn giới tính";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Vui lòng chọn ngày sinh";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        dateOfBirth: formData.dateOfBirth
          ? formData.dateOfBirth.toISOString()
          : null,
      };

      if (editMode) {
        await userService.updateUser(selectedUser.id, payload);
        showSnackbar("Cập nhật người dùng thành công!", "success");
      } else {
        await userService.createUser(payload);
        showSnackbar("Thêm người dùng thành công!", "success");
      }
      handleCloseDialog();
      fetchUsers(pagination.currentPage, pagination.pageSize);
    } catch (error) {
      console.error("Error saving user:", error);
      showSnackbar(error.message || "Có lỗi xảy ra", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setEditMode(false);
    setSelectedUser(null);
    setFormData({
      fullName: "",
      bio: "",
      gender: "",
      address: "",
      dateOfBirth: null,
      phoneNumber: "",
    });
    setErrors({});
    setTimeout(() => {
      setDialogMounted(true);
      setOpenDialog(true);
    }, 10);
  };

  const handleEditUser = (user) => {
    setEditMode(true);
    setSelectedUser(user);
    setFormData({
      fullName: user.userInfo?.fullName || "",
      bio: user.userInfo?.bio || "",
      gender: user.userInfo?.gender || "",
      address: user.userInfo?.address || "",
      dateOfBirth: user.userInfo?.dateOfBirth
        ? new Date(user.userInfo.dateOfBirth)
        : null,
      phoneNumber: user.userInfo?.phoneNumber || "",
    });
    setErrors({});
    setTimeout(() => {
      setDialogMounted(true);
      setOpenDialog(true);
    }, 10);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setDialogMounted(false);
      setEditMode(false);
      setSelectedUser(null);
      setFormData({
        fullName: "",
        bio: "",
        gender: "",
        address: "",
        dateOfBirth: null,
        phoneNumber: "",
      });
      setErrors({});
    }, 200);
  };

  const handlePageChange = (event, newPage) => {
    fetchUsers(newPage, pagination.pageSize);
  };

  useEffect(() => {
    return () => {
      setOpenDialog(false);
      setDialogMounted(false);
    };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                      <PersonIcon fontSize="large" />
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
                        Quản lý người dùng
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Quản lý thông tin các người dùng của hệ thống
                      </Typography>
                    </Box>
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <Tooltip title="Làm mới dữ liệu">
                      <IconButton
                        onClick={() =>
                          fetchUsers(
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
                      onClick={handleAddUser}
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
                      Thêm người dùng
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
                              Tổng số người dùng
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
                          "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
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
                              {
                                users.filter((user) => user.role === "Customer")
                                  .length
                              }
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                              Customer
                            </Typography>
                          </Box>
                          <PersonIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                        </Box>
                      </CardContent>
                    </Card>
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
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        Role
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        Họ tên
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
                        }}
                      >
                        Giới tính
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
                          colSpan={7}
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
                    ) : users.filter((user) => user.role !== "Admin").length ===
                      0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
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
                            <PersonIcon
                              sx={{ fontSize: 60, color: "grey.300" }}
                            />
                            <Typography variant="h6" color="text.secondary">
                              Không có người dùng nào
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Hãy thêm người dùng đầu tiên của bạn
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      users
                        .filter((user) => user.role !== "Admin")
                        .map((user, index) => (
                          <Slide
                            key={user.id}
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
                                  label={`#${user.id}`}
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
                                    {user.email.charAt(0).toUpperCase()}
                                  </Avatar>
                                  <Box>
                                    <Typography
                                      variant="body1"
                                      fontWeight="600"
                                    >
                                      {user.email}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      Email
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={user.role}
                                  color={
                                    user.role === "Admin"
                                      ? "primary"
                                      : "default"
                                  }
                                  size="small"
                                  icon={
                                    user.role === "Admin" ? (
                                      <AdminIcon />
                                    ) : (
                                      <PersonIcon />
                                    )
                                  }
                                  sx={{
                                    fontWeight: 600,
                                    ...(user.role === "Admin" && {
                                      background:
                                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                                      color: "white",
                                    }),
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                {user.userInfo?.fullName ? (
                                  <Typography variant="body1" fontWeight="600">
                                    {user.userInfo.fullName}
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    color="text.disabled"
                                    sx={{ fontStyle: "italic" }}
                                  >
                                    Chưa cập nhật
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell>
                                {user.userInfo?.phoneNumber ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                    }}
                                  >
                                    <PhoneIcon
                                      color="action"
                                      fontSize="small"
                                    />
                                    <Typography variant="body1">
                                      {user.userInfo.phoneNumber}
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    color="text.disabled"
                                    sx={{ fontStyle: "italic" }}
                                  >
                                    Chưa cập nhật
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell>
                                {user.userInfo?.gender ? (
                                  <Chip
                                    label={user.userInfo.gender}
                                    size="small"
                                    variant="outlined"
                                    color="secondary"
                                  />
                                ) : (
                                  <Typography
                                    variant="body2"
                                    color="text.disabled"
                                    sx={{ fontStyle: "italic" }}
                                  >
                                    Chưa cập nhật
                                  </Typography>
                                )}
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
                                      onClick={() => handleEditUser(user)}
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
              maxWidth="md"
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
                      bgcolor: editMode ? "warning.main" : "primary.main",
                      background: editMode
                        ? "linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)"
                        : "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
                    }}
                  >
                    {editMode ? <EditIcon /> : <AddIcon />}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {editMode
                        ? "Chỉnh sửa người dùng"
                        : "Thêm người dùng mới"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {editMode
                        ? "Cập nhật thông tin người dùng"
                        : "Điền thông tin người dùng mới"}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>

              <Divider />

              <DialogContent sx={{ pt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Họ tên"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      error={!!errors.fullName}
                      helperText={errors.fullName}
                      required
                      disabled={loading}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <PersonIcon sx={{ mr: 1, color: "text.secondary" }} />
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
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
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
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <FormControl
                      fullWidth
                      error={!!errors.gender}
                      required
                      disabled={loading}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "primary.main",
                          },
                        },
                      }}
                    >
                      <InputLabel>Giới tính</InputLabel>
                      <Select
                        value={formData.gender}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        label="Giới tính"
                      >
                        <MenuItem value="Nam">👨 Nam</MenuItem>
                        <MenuItem value="Nữ">👩 Nữ</MenuItem>
                        <MenuItem value="Khác">🏳️‍⚧️ Khác</MenuItem>
                      </Select>
                      {errors.gender && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ ml: 2, mt: 0.5 }}
                        >
                          {errors.gender}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <DatePicker
                      label="Ngày sinh"
                      value={formData.dateOfBirth}
                      onChange={(date) =>
                        handleInputChange("dateOfBirth", date)
                      }
                      disabled={loading}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          error={!!errors.dateOfBirth}
                          helperText={errors.dateOfBirth}
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                              "&:hover fieldset": {
                                borderColor: "primary.main",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      error={!!errors.address}
                      helperText={errors.address}
                      required
                      disabled={loading}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <LocationIcon
                            sx={{ mr: 1, color: "text.secondary" }}
                          />
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
                  </Grid>
                  <Grid item size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Tiểu sử"
                      value={formData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      multiline
                      rows={4}
                      placeholder="Nhập thông tin tiểu sử..."
                      disabled={loading}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          "&:hover fieldset": {
                            borderColor: "primary.main",
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
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
                    background: editMode
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
                  {editMode ? "Cập nhật" : "Thêm mới"}
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
    </LocalizationProvider>
  );
};

export default User;
