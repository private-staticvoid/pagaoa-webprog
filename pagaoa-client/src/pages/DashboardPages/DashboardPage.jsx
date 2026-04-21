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

// ================= TABLE =================
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
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

// ================= COMPONENT =================
function DashboardPage() {
  const location = useLocation();

  // ✅ SAFE AVERAGE CALCULATION (prevents NaN crash)
  const validRows = rows.filter((row) => row.age !== null);

  const averageAge =
    validRows.length > 0
      ? rows.reduce((sum, row) => sum + (row.age || 0), 0) / validRows.length
      : 0;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Summary Section */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{rows.length}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Average Age</Typography>
            <Typography variant="h4">{averageAge.toFixed(1)}</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Gauges */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        <Gauge width={100} height={100} value={50} />
        <Gauge
          width={100}
          height={100}
          value={50}
          valueMin={10}
          valueMax={60}
        />
      </Stack>

      {/* Charts */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
        <BarChart
          series={[
            { data: [35, 44, 24, 34], label: "Series 1" },
            { data: [51, 6, 49, 30], label: "Series 2" },
          ]}
          height={290}
          xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
        />

        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "Series A" },
                { id: 1, value: 15, label: "Series B" },
                { id: 2, value: 20, label: "Series C" },
              ],
            },
          ]}
          width={200}
          height={200}
        />
      </Stack>

      {/* DataGrid */}
      <Typography variant="h5" gutterBottom>
        Users Overview
      </Typography>

      <Box sx={{ height: 400, width: "100%", mb: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          paginationModel={{ pageSize: 5, page: 0 }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      {/* Map */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Location Map
      </Typography>

      <Box sx={{ height: 500, width: "100%" }}>
        <MapContainer
          center={[14.604253, 120.994314]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>
              National University Manila <br />
              <i>551 F Jhocson St, Sampaloc, Manila</i>
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </>
  );
}

export default DashboardPage;
