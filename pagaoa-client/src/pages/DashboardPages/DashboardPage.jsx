import React from "react";
import { useLocation } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Gauge } from "@mui/x-charts/Gauge";
import { Typography, Card, CardContent } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* ICONS */
import PeopleIcon from "@mui/icons-material/People";
import CakeIcon from "@mui/icons-material/Cake";
import StarIcon from "@mui/icons-material/Star";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, firstName: "Harry", lastName: "Styles", age: 30 },
  { id: 2, firstName: "Taylor", lastName: "Swift", age: 34 },
  { id: 3, firstName: "Drake", lastName: "Graham", age: 37 },
  { id: 4, firstName: "Ariana", lastName: "Grande", age: 31 },
  { id: 5, firstName: "Justin", lastName: "Bieber", age: 30 },
  { id: 6, firstName: "Billie", lastName: "Eilish", age: 23 },
  { id: 7, firstName: "The", lastName: "Weeknd", age: 34 },
  { id: 8, firstName: "Olivia", lastName: "Rodrigo", age: 21 },
  { id: 9, firstName: "Ed", lastName: "Sheeran", age: 33 },
  { id: 10, firstName: "Doja", lastName: "Cat", age: 29 },
  { id: 11, firstName: "Bruno", lastName: "Mars", age: 39 },
  { id: 12, firstName: "Dua", lastName: "Lipa", age: 29 },
  { id: 13, firstName: "Shawn", lastName: "Mendes", age: 26 },
  { id: 14, firstName: "Selena", lastName: "Gomez", age: 32 },
  { id: 15, firstName: "Post", lastName: "Malone", age: 30 },
];

function DashboardPage() {
  const location = useLocation();

  const avgAge = rows
    .reduce(
      (sum, row) =>
        sum + (row.age || 0) / rows.filter((r) => r.age !== null).length,
      0,
    )
    .toFixed(1);

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9f6f2", minHeight: "100vh" }}>
      {/* HEADER */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#070546", fontWeight: "bold", fontFamily: "serif" }}
      >
        Dashboard
      </Typography>

      {/* KPI CARDS */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        {/* TOTAL CUSTOMERS */}
        <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3 }}>
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography variant="subtitle2">Total Customers</Typography>
              <Typography variant="h3" fontWeight="bold">
                {rows.length}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 3,
                backgroundColor: "rgba(7,5,70,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PeopleIcon sx={{ color: "#070546" }} />
            </Box>
          </CardContent>
        </Card>

        {/* AVERAGE AGE */}
        <Card sx={{ flex: 1, borderRadius: 4, boxShadow: 3 }}>
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography variant="subtitle2">Average Age</Typography>
              <Typography variant="h3" fontWeight="bold">
                {avgAge}
              </Typography>
            </Box>

            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 3,
                backgroundColor: "rgba(7,5,70,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CakeIcon sx={{ color: "#070546" }} />
            </Box>
          </CardContent>
        </Card>

        {/* TOP PRODUCT */}
        <Card
          sx={{
            flex: 1,
            borderRadius: 4,
            boxShadow: 3,
            background: "linear-gradient(135deg, #070546, #1a1870)",
            color: "#fef6e9",
          }}
        >
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                Top Product
              </Typography>

              <Typography variant="h5" fontWeight="bold">
                Chocolate Cookies
              </Typography>

              <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
                Best seller this month 🍪
              </Typography>
            </Box>

            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: 3,
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StarIcon sx={{ color: "#fef6e9" }} />
            </Box>
          </CardContent>
        </Card>
      </Stack>

      {/* GAUGES */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        <Card sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
          <Typography>Sales Target</Typography>
          <Gauge width={150} height={150} value={70} />
        </Card>

        <Card sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
          <Typography>Customer Growth</Typography>
          <Gauge width={150} height={150} value={55} />
        </Card>
      </Stack>

      {/* CHARTS */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        <Card sx={{ flex: 1, p: 2, borderRadius: 4, boxShadow: 3 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#fef6e9",
              fontWeight: "bold",
              fontFamily: "serif",
              backgroundColor: "#070546",
              p: 1,
              borderRadius: 2,
            }}
          >
            Sales Summary
          </Typography>
          <BarChart
            series={[{ data: [50, 70, 90, 120], label: "Sales" }]}
            height={250}
            xAxis={[{ data: ["Jan", "Feb", "Mar", "Apr"], scaleType: "band" }]}
          />
        </Card>

        <Card sx={{ flex: 1, p: 2, borderRadius: 4, boxShadow: 3 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#fef6e9",
              fontWeight: "bold",
              fontFamily: "serif",
              backgroundColor: "#070546",
              p: 1,
              borderRadius: 2,
            }}
          >
            Product Insights
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

      {/* TABLE */}
      <Card sx={{ mb: 4, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Customers
          </Typography>
          <Box sx={{ height: 400 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5]}
              checkboxSelection
            />
          </Box>
        </CardContent>
      </Card>

      {/* MAP */}
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Store Location
          </Typography>
          <Box sx={{ height: 400 }}>
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>Sweet Crumbs Bakery</Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;
