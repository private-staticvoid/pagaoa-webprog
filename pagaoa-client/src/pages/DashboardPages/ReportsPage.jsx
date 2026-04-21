import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

function ReportsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports Page
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">
            This is a placeholder for Reports.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Charts, analytics, and reports will go here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ReportsPage;
