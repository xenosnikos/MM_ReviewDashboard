import { Typography, Box } from "@mui/material";
import SelectClient from "./SelectClient";
import MenuHeader from "./MenuHeader";

function PageHeader({ clientName, params }) {
  return (
    <Box
      display="flex"
      alignItems={{ xs: "stretch", md: "center" }}
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Box>
          <Box display="flex" alignItems="center" sx={{ marginBottom: "5px" }}>
            <Typography variant="h3" component="h3" gutterBottom>
              Welcome,
            </Typography>
            <SelectClient />
          </Box>
          <Typography variant="subtitle2">
            Monitor all your reviews in your new personal dashboard.
          </Typography>
        </Box>
      </Box>
      <MenuHeader clientName={clientName} params={params} />
    </Box>
  );
}

export default PageHeader;
