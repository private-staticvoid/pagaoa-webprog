import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const cream = "#fef6e9";
const navy = "#070546";
const gold = "#d4af37";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Customer Name", width: 200 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "favorite", headerName: "Favorite Cookie", width: 200 },
];

const rows = [
  {
    id: 1,
    name: "Harry Styles",
    email: "harry.styles@email.com",
    favorite: "Chocolate Chunk",
  },
  {
    id: 2,
    name: "Taylor Swift",
    email: "taylor.swift@email.com",
    favorite: "Red Velvet",
  },
  {
    id: 3,
    name: "Drake Graham",
    email: "drake.graham@email.com",
    favorite: "Peanut Butter",
  },
  {
    id: 4,
    name: "Ariana Grande",
    email: "ariana.grande@email.com",
    favorite: "Matcha",
  },
  {
    id: 5,
    name: "Justin Bieber",
    email: "justin.bieber@email.com",
    favorite: "Double Chocolate",
  },
  {
    id: 6,
    name: "Billie Eilish",
    email: "billie.eilish@email.com",
    favorite: "Oatmeal Raisin",
  },
  {
    id: 7,
    name: "The Weeknd",
    email: "the.weeknd@email.com",
    favorite: "Chocolate Chunk",
  },
  {
    id: 8,
    name: "Olivia Rodrigo",
    email: "olivia.rodrigo@email.com",
    favorite: "Matcha",
  },
  {
    id: 9,
    name: "Ed Sheeran",
    email: "ed.sheeran@email.com",
    favorite: "Peanut Butter",
  },
  {
    id: 10,
    name: "Doja Cat",
    email: "doja.cat@email.com",
    favorite: "Red Velvet",
  },
  {
    id: 11,
    name: "Bruno Mars",
    email: "bruno.mars@email.com",
    favorite: "Chocolate Chunk",
  },
  {
    id: 12,
    name: "Dua Lipa",
    email: "dua.lipa@email.com",
    favorite: "Matcha",
  },
  {
    id: 13,
    name: "Shawn Mendes",
    email: "shawn.mendes@email.com",
    favorite: "Oatmeal Raisin",
  },
  {
    id: 14,
    name: "Selena Gomez",
    email: "selena.gomez@email.com",
    favorite: "Red Velvet",
  },
  {
    id: 15,
    name: "Post Malone",
    email: "post.malone@email.com",
    favorite: "Double Chocolate",
  },
];

const topCookies = [
  { name: "Chocolate Chunk Cookies", sales: 120, color: "#2e7d32" },
  { name: "Peanut Butter Cookies", sales: 95, color: "#1565c0" },
  { name: "Matcha White Chocolate", sales: 80, color: "#ef6c00" },
  { name: "Red Velvet Cookies", sales: 65, color: "#c62828" },
];

function UsersPage() {
  return (
    <Box sx={{ p: 3, backgroundColor: navy, minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ color: cream, fontWeight: "bold", fontFamily: "serif", mb: 3 }}
      >
        Customers Overview
      </Typography>

      <Card sx={{ mb: 4, borderRadius: 3, backgroundColor: cream }}>
        <CardContent>
          <Typography sx={{ color: navy, fontWeight: "bold", mb: 2 }}>
            Top Customer List
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

      <Grid container spacing={3}>
        {topCookies.map((cookie, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                backgroundColor: cream,
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ backgroundColor: cookie.color, mr: 2 }}>
                    🍪
                  </Avatar>

                  <Typography sx={{ color: navy, fontWeight: "bold" }}>
                    {cookie.name}
                  </Typography>
                </Box>

                <Typography sx={{ color: navy, opacity: 0.7 }}>
                  {cookie.sales} sold
                </Typography>

                <Chip
                  label="Top Seller"
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: gold,
                    color: "#000",
                    fontWeight: "bold",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UsersPage;
