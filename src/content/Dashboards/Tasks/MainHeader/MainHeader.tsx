import { Typography, Box } from "@mui/material";
import SelectClient from "./SelectClient";
import EmailNotification from "./EmailNotification";
import MenuSettings from "./MenuSettings";

function MainHeader({ clientName, params }) {
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
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <EmailNotification />
        <MenuSettings clientName={clientName} params={params} />
      </Box>
    </Box>
  );
}

export default MainHeader;
