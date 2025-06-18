import React, { useState, useEffect } from "react"; // Import useEffect
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Badge,
  IconButton,
  Container,
  Menu, // Import Menu for dropdown
  MenuItem, // Import MenuItem for dropdown items
  Typography, // Import Typography for text styling within MenuItem
} from "@mui/material";
import {
  Search as SearchIcon, // Kept if needed for SearchBar
  Person as PersonIcon, // Used for the account icon
  ShoppingCart as ShoppingCartIcon, // Used for the cart icon
} from "@mui/icons-material";
import SearchBar from "./SearchBar"; // Assuming SearchBar component exists
import { useNavigate } from "react-router-dom"; // For navigation
import logoWhite from "../assets/logo_no_bg_w.svg";

export const Header = () => {
  // State for search query (if SearchBar uses it internally)
  const [searchQuery, setSearchQuery] = useState("");

  // State for the account dropdown menu anchor element
  const [anchorEl, setAnchorEl] = useState(null);
  // Derived state to check if the account menu should be open
  const openAccountMenu = Boolean(anchorEl);

  const navigate = useNavigate(); // Hook for navigation

  // --- User State Management ---
  // Default to false and empty string, will be updated from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // useEffect to check localStorage on component mount
  useEffect(() => {
    // Check if 'userLoggedIn' flag or 'userName' exists in localStorage
    const storedLoggedInStatus = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");

    if (storedLoggedInStatus === "true" && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    } else {
      setIsLoggedIn(false);
      setUserName(""); // Ensure userName is clear if not logged in
    }
  }, []); // Empty dependency array means this runs once on mount

  // --- End User State Management ---

  // Function to handle search action (if SearchBar integrates with Header's search state)
  const handleSearch = () => {
    console.log("Tìm kiếm:", searchQuery);
    // Add actual search logic here
  };

  // Function to handle Enter key press for search
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Handler to open the account dropdown menu
  const handleAccountMenuClick = (event) => {
    // If the user is logged in, open the menu
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget); // Set the button as the anchor for the menu
    } else {
      // If not logged in, navigate directly to the login page
      navigate("/login");
    }
  };

  // Handler to close the account dropdown menu
  const handleAccountMenuClose = () => {
    setAnchorEl(null); // Close the menu by setting anchorEl back to null
  };

  // Handler for the "Đăng xuất" (Logout) action
  const handleLogout = () => {
    // In a real application, this is where you'd clear user session/token
    console.log("Đang đăng xuất...");
    localStorage.removeItem("isLoggedIn"); // Remove login status from localStorage
    localStorage.removeItem("userName"); // Remove user name from localStorage
    setIsLoggedIn(false); // Update state
    setUserName(""); // Clear user name in state
    handleAccountMenuClose(); // Close the menu after logout action
    navigate("/login"); // Navigate to the login page
  };

  // Handler for clicking on the user's name/profile in the menu
  const handleProfileClick = () => {
    handleAccountMenuClose(); // Close the menu
    navigate("/account"); // Navigate to a user profile page (optional route)
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#52B788", // Green background for the header
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // Subtle shadow
        transition: "background-color 0.3s ease", // Smooth transition for background changes
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Toolbar sx={{ padding: "8px 0", minHeight: "70px" }}>
          {/* Logo Section */}
          <Box sx={{ display: "flex", alignItems: "center", marginRight: 4 }}>
            <img
              src={logoWhite} // Đã chuyển sang import
              alt="Logo"
              style={{
                marginRight: 8,
                width: 60,
                height: 60,
                borderRadius: "50%", // Make logo circular
              }}
            />
          </Box>

          {/* Navigation Menu (Left side) */}
          <Box sx={{ display: "flex", gap: 3, marginRight: "auto" }}>
            <Button
              onClick={() => navigate("/home")} // Navigate to home page
              color="inherit" // Inherit color from AppBar (white text)
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                textTransform: "none", // Prevent uppercase
                padding: "8px 16px",
                borderRadius: "20px", // Rounded button corners
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)", // Light hover effect
                  transform: "translateY(-2px)", // Slight lift on hover
                },
                transition: "all 0.3s ease", // Smooth transitions for hover effects
              }}
            >
              TRANG CHỦ
            </Button>
            <Button
              onClick={() => navigate("/products")} // Navigate to products page
              color="inherit"
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                textTransform: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              SẢN PHẨM
            </Button>
            <Button
              onClick={() => navigate("/cosai")} // Navigate to COSAI page
              color="inherit"
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                textTransform: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              COSAI
            </Button>
          </Box>

          {/* Search Bar Component */}
          {/* Ensure SearchBar is correctly implemented and styled */}
          <SearchBar />

          {/* User Actions (Account and Cart) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Account Button */}
            <Button
              startIcon={<PersonIcon />} // Icon for the account button
              sx={{
                textTransform: "none", // Prevent uppercase
                borderRadius: "10px", // Slightly rounded corners
                padding: "8px 16px",
                border: "1px solid rgba(255,255,255,0.3)", // Light border
                backgroundColor: "rgb(255, 253, 253)", // Off-white background
                color: "#1E4434", // Dark green text color
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)", // Light hover background
                  borderColor: "white", // White border on hover
                },
                transition: "all 0.3s ease", // Smooth hover transitions
              }}
              onClick={handleAccountMenuClick} // Click handler to open menu or navigate to login
              // Accessibility attributes for the menu
              aria-controls={openAccountMenu ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openAccountMenu ? "true" : undefined}
            >
              {/* Display user name if logged in, otherwise "Tài khoản" */}
              {isLoggedIn ? userName : "Tài khoản"}
            </Button>

            {/* Account Dropdown Menu */}
            <Menu
              id="account-menu" // Unique ID for the menu
              anchorEl={anchorEl} // The DOM element that the menu is anchored to
              open={openAccountMenu} // Controls whether the menu is open or closed
              onClose={handleAccountMenuClose} // Function to call when the menu needs to close
              MenuListProps={{
                "aria-labelledby": "account-button", // Links menu to the button for accessibility
              }}
              // Positioning of the menu relative to the anchor
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {/* Menu Item displaying user name (optional: make clickable for profile) */}
              <MenuItem onClick={handleProfileClick}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {userName}
                </Typography>
              </MenuItem>
              {/* Menu Item for Logout */}
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>

            {/* Shopping Cart Icon Button */}
            <IconButton
              color="inherit" // Inherit color (white)
              sx={{
                border: "1px solid rgba(255,255,255,0.3)", // Light border
                borderRadius: "50%", // Circular button
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)", // Light hover background
                  borderColor: "white", // White border on hover
                },
                transition: "all 0.3s ease", // Smooth hover transitions
              }}
              onClick={() => navigate("/cart")} // Navigate to cart page
            >
              <Badge badgeContent={3} color="error">
                {" "}
                {/* Example badge content */}
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
