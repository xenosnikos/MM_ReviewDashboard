import { Box, Typography, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import DataContext from "@/contexts/DataContext";
import { getClientSocialMediaLink } from "@/services";
import AddSocialPage from "./AddSocialPage";
import GetSocialPages from "./GetSocialPages";
import { ClientSocialMediaLink } from "@/models";

function SocialPages() {
  const theme = useTheme();
  const { clientId, filter, refresh, setDataState } = useContext(DataContext);

  useEffect(() => {
    if (typeof clientId === "string") getClientSocialMediaData();
  }, [clientId, filter, refresh]);

  const getClientSocialMediaData = async () => {
    const title = filter === "All Social Media" ? null : filter;

    try {
      const response: ClientSocialMediaLink[] = await getClientSocialMediaLink(
        clientId,
        title
      );

      if (Array.isArray(response)) return setDataState({ links: response });

      throw new Error("Invalid response data.");
    } catch (error) {
      setDataState({ links: [] });
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
          Social Pages
        </Typography>
        <AddSocialPage />
        <GetSocialPages />
      </Box>
    </>
  );
}

export default SocialPages;
