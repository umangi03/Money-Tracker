import React from "react";
import { Box, Card, CardContent, Typography, Stack } from "@mui/material";
import MTapp from "../components/MainMTapp";
import RecentTx from "../components/RecentTx";

const Home = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        justifyContent="space-between"
      >
        <Box sx={{ flex: 1 }}>
        <MTapp />
        </Box>
        <Box sx={{ flex: 1 }}>
          <RecentTx />
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
