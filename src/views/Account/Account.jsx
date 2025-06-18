import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Grid, Box } from "@mui/material";

import Sidebar from "../../components/Sidebar";
import AccountInfo from "./AccountInfo";
import MyOrders from "./MyOrders";
import LoyaltyPoints from "./LoyaltyPoints";
import CancelOrder from "./CancelOrder";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Green color from header
    },
    secondary: {
      main: "#FFC107",
    },
    background: {
      default: "#F5F5F5", // Light gray/beige background
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F5F5", // Light background for entire page
        },
      },
    },
  },
});

function Account() {
  const [activePage, setActivePage] = useState("account");

  const renderPage = () => {
    switch (activePage) {
      case "account":
        return <AccountInfo />;
      case "orders":
        return <MyOrders />;
      case "points":
        return <LoyaltyPoints />;
      case "cancel":
        return <CancelOrder />;
      default:
        return <AccountInfo />;
    }
  };

  const handleMenuClick = (pageId) => {
    setActivePage(pageId);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />

        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          <Grid container spacing={4}>
            <Grid item size={{ xs: 12, md: 3 }}>
              <Sidebar activeItem={activePage} onItemClick={handleMenuClick} />
            </Grid>
            <Grid item size={{ xs: 12, md: 9 }}>
              {renderPage()}
            </Grid>
          </Grid>
        </Container>

        <Footer />
      </Box>

      {/* Quick Navigation Buttons for Demo */}
      {/* <Box
        sx={{
          position: "fixed",
          top: "50%",
          right: 20,
          transform: "translateY(-50%)",
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <button
            onClick={() => setActivePage("account")}
            style={{ padding: "8px", fontSize: "12px" }}
          >
            Thông tin TK
          </button>
          <button
            onClick={() => setActivePage("orders")}
            style={{ padding: "8px", fontSize: "12px" }}
          >
            Đơn hàng
          </button>
          <button
            onClick={() => setActivePage("points")}
            style={{ padding: "8px", fontSize: "12px" }}
          >
            Điểm tích lũy
          </button>
          <button
            onClick={() => setActivePage("cancel")}
            style={{ padding: "8px", fontSize: "12px" }}
          >
            Hủy đơn
          </button>
        </Box>
      </Box> */}
    </ThemeProvider>
  );
}

export default Account;
