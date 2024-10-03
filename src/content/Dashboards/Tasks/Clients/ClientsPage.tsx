import { Box, Typography, useTheme } from "@mui/material";
import GetClientsPage from "./GetClientsPage";
import React from "react";

const ClientsPage = () => {
  const theme = useTheme();

  return (
    <>
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontSize: `${theme.typography.pxToRem(23)}`,
            color: `${theme.colors.alpha.black[100]}`,
            marginBottom: 3
          }}
        >
          All Clients
        </Typography>
        <GetClientsPage />
      </Box>
    </>
  );
};

export default ClientsPage;
