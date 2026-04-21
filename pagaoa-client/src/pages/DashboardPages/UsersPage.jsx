import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

function UsersPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users Page
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">
            This is a placeholder for the Users section.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can add user tables, profiles, and management tools here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;
