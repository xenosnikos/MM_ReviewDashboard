import { Box, Typography, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import DataContext from "@/contexts/DataContext";
import AddClientEmailPage from "./AddClientEmail";
import GetClientEmailPage from "./GetClientEmail";
import { getClientReminderEmails } from "@/services/clientEmail";
import { ClientEmail } from "@/models";

function ClientEmailPage() {
  const theme = useTheme();
  const { clientId, filter, refresh, setDataState } = useContext(DataContext);

  useEffect(() => {
    if (typeof clientId === "string") getClientEmailData();
  }, [clientId, filter, refresh]);

  const getClientEmailData = async () => {

    try {
      const response: ClientEmail[] = await getClientReminderEmails(
        clientId
      );
      if (Array.isArray(response)) return setDataState({ emails: response });

      throw new Error("Invalid response data.");
    } catch (error) {
      setDataState({ emails: [] });
    }
  };

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
          Clients Email
        </Typography>
        <AddClientEmailPage />
        <GetClientEmailPage />
      </Box>
    </>
  );
}

export default ClientEmailPage;
