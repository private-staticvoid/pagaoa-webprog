import React, { useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  LinearProgress,
  Button,
} from "@mui/material";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const cream = "#fef6e9";
const navy = "#070546";
const gold = "#d4af37";

const statCard = (title, value, percent, color, Icon) => (
  <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3 }}>
    <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Chip
          label={percent}
          size="small"
          sx={{ mt: 1, backgroundColor: color, color: "#fff" }}
        />
      </Box>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(7,5,70,0.08)",
        }}
      >
        <Icon sx={{ color: navy }} />
      </Box>
    </CardContent>
  </Card>
);

const PRINT_STYLE_ID = "report-print-styles";

function ReportsPage() {
  useEffect(() => {
    const existing = document.getElementById(PRINT_STYLE_ID);
    if (!existing) {
      const style = document.createElement("style");
      style.id = PRINT_STYLE_ID;
      style.innerHTML = `
        @media print {
          @page {
            size: A4 portrait;
            margin: 16mm 12mm;
          }

          body {
            background: ${cream} !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          .MuiAppBar-root,
          .MuiDrawer-root,
          .MuiDrawer-paper {
            display: none !important;
          }

          .MuiCard-root {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .MuiChip-root {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          svg {
            max-width: 100% !important;
            overflow: visible !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const el = document.getElementById(PRINT_STYLE_ID);
      if (el) el.remove();
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ p: 3, backgroundColor: cream, minHeight: "100vh" }}>
      <Box
        className="no-print"
        sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}
      >
        <Button variant="outlined" onClick={handlePrint}>
          Export PDF
        </Button>
      </Box>

      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            sx={{ color: navy, fontWeight: "bold", fontFamily: "serif" }}
          >
            Sales Reports
          </Typography>
          <Typography sx={{ color: navy, opacity: 0.6 }}>
            Creme and Crumbs Analytics Overview
          </Typography>
        </Box>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          {statCard(
            "Cookies Sold",
            "2,340 pcs",
            "+22%",
            "#2e7d32",
            ShoppingCartIcon,
          )}
          {statCard("Customers", "1,245", "+18%", "#1565c0", PeopleIcon)}
          {statCard("Revenue", "₱24,560", "+19%", "#ef6c00", AttachMoneyIcon)}
          {statCard("Low Stock", "5 items", "-4%", "#c62828", TrendingDownIcon)}
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ mb: 4 }}
        >
          <Card sx={{ flex: 2, p: 2, borderRadius: 4, boxShadow: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: cream,
                backgroundColor: navy,
                p: 1,
                borderRadius: 2,
                mb: 2,
                fontWeight: "bold",
                fontFamily: "serif",
              }}
            >
              Monthly Sales Trend
            </Typography>
            <BarChart
              height={260}
              series={[{ data: [50, 80, 120, 150, 170], label: "Sales" }]}
              xAxis={[
                {
                  data: ["Jan", "Feb", "Mar", "Apr", "May"],
                  scaleType: "band",
                },
              ]}
            />
          </Card>

          <Card sx={{ flex: 1, p: 2, borderRadius: 4, boxShadow: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: cream,
                backgroundColor: navy,
                p: 1,
                borderRadius: 2,
                mb: 2,
                fontWeight: "bold",
                fontFamily: "serif",
              }}
            >
              Cookie Distribution
            </Typography>
            <PieChart
              height={260}
              series={[
                {
                  data: [
                    { id: 0, value: 40, label: "Chocolate" },
                    { id: 1, value: 25, label: "Matcha" },
                    { id: 2, value: 15, label: "Red Velvet" },
                  ],
                },
              ]}
            />
          </Card>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ mb: 4 }}
        >
          <Card sx={{ flex: 1, p: 2, borderRadius: 4, boxShadow: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: cream,
                backgroundColor: navy,
                p: 1,
                borderRadius: 2,
                mb: 2,
                fontWeight: "bold",
                fontFamily: "serif",
              }}
            >
              Top Selling Cookies
            </Typography>
            <BarChart
              height={250}
              series={[{ data: [120, 95, 80, 65], label: "Units Sold" }]}
              xAxis={[
                {
                  data: ["Chocolate", "Peanut", "Matcha", "Red Velvet"],
                  scaleType: "band",
                },
              ]}
            />
          </Card>

          <Card sx={{ flex: 1, p: 2, borderRadius: 4, boxShadow: 3 }}>
            <Typography
              variant="h6"
              sx={{
                color: cream,
                backgroundColor: navy,
                p: 1,
                borderRadius: 2,
                mb: 2,
                fontWeight: "bold",
                fontFamily: "serif",
              }}
            >
              Revenue Progress
            </Typography>

            <BarChart
              height={180}
              series={[
                { data: [18000, 22000, 24560, 27000, 30000], label: "Revenue" },
              ]}
              xAxis={[
                {
                  data: ["Jan", "Feb", "Mar", "Apr", "May"],
                  scaleType: "band",
                },
              ]}
            />

            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontSize: 12, opacity: 0.7, mb: 1 }}>
                April Progress (₱24,560 / ₱30,000)
              </Typography>
              <LinearProgress
                variant="determinate"
                value={82}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#eee",
                  "& .MuiLinearProgress-bar": { backgroundColor: gold },
                }}
              />
            </Box>

            {[
              { month: "March", value: 70 },
              { month: "February", value: 65 },
              { month: "January", value: 60 },
            ].map((item, i) => (
              <Box key={i} sx={{ mt: 1 }}>
                <Typography sx={{ fontSize: 11, opacity: 0.6 }}>
                  {item.month}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={item.value}
                  sx={{
                    height: 6,
                    borderRadius: 5,
                    backgroundColor: "#eee",
                    "& .MuiLinearProgress-bar": { backgroundColor: navy },
                  }}
                />
              </Box>
            ))}
          </Card>
        </Stack>

        <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                color: cream,
                backgroundColor: navy,
                p: 1,
                borderRadius: 2,
                mb: 2,
                fontWeight: "bold",
                fontFamily: "serif",
              }}
            >
              Product Performance
            </Typography>

            {[
              {
                name: "Chocolate Chunk Cookies",
                status: "Best Seller",
                color: "#2e7d32",
              },
              {
                name: "Peanut Butter Cookies",
                status: "High Demand",
                color: "#1565c0",
              },
              {
                name: "Oatmeal Raisin Cookies",
                status: "Growing",
                color: "#ef6c00",
              },
              {
                name: "Matcha White Chocolate",
                status: "Stable",
                color: "#2e7d32",
              },
              {
                name: "Red Velvet Cookies",
                status: "Low Stock",
                color: "#c62828",
              },
            ].map((item, i) => (
              <Box
                key={i}
                sx={{
                  py: 1.5,
                  borderBottom: "1px solid rgba(7,5,70,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{item.name}</Typography>
                <Chip
                  label={item.status}
                  size="small"
                  sx={{ backgroundColor: item.color, color: "#fff" }}
                />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ReportsPage;
