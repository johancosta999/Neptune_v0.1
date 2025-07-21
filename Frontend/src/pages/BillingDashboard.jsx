import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";

export default function BillingDashboard() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/billing")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch billing data");
        return res.json();
      })
      .then((data) => {
        setBills(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching billing data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#121212",
        px: 4,
        pt: 5,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#f5f5f5",
          mb: 3,
        }}
      >
        Billing Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TableContainer
            component={Paper}
            sx={{
              width: "90%",
              maxWidth: "1000px",
              borderRadius: 2,
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>User</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Month</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Usage (L)</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Price/Unit</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Water Quality
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bills.map((bill) => (
                  <TableRow key={bill._id}>
                    <TableCell>{bill.userId?.name || "Unknown"}</TableCell>
                    <TableCell>{bill.month}</TableCell>
                    <TableCell>{bill.usageInLiters}</TableCell>
                    <TableCell>{bill.pricePerUnit}</TableCell>
                    <TableCell>{bill.totalBill}</TableCell>
                    <TableCell>{bill.waterQualityLevel}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button variant="contained" color="primary">
          Generate New Bill
        </Button>
      </Box>
    </Box>
  );
}
