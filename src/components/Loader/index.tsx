import React from "react";
import { Box, CircularProgress } from "@mui/material";

const PageLoader: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" margin="auto">
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
