import { VTextField } from "@/forms";
import { selectProvider } from "@/helpers/constant";
import { AlertColor, Box, Button, MenuItem, Typography, useTheme } from "@mui/material";
import { Form } from "@unform/web";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import DataContext from "@/contexts/DataContext";
import { createClientSocialMediaLink } from "@/services";
import { CreateClientSocialMediaLink } from "@/models";

function AddSocialPage() {
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const [page, setPage] = useState(selectProvider[0]);
  const [socialLink, setSocialLink] = useState("");
  const { clientId, refresh, setDataState } = useContext(DataContext);

  const handleSubmit = async (data) => {
    const { socialLink, socialPage } = data;

    const body: CreateClientSocialMediaLink = {
      clientId: clientId,
      title: socialPage,
      url: socialLink
    };

    try {
      await createClientSocialMediaLink(body);

      setPage("Google");
      setSocialLink("");
      const errorMessage = "Social media link successfully added!";
      const severity: AlertColor = "success";

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: severity,
        isAlertOpen: true
      });

      setDataState({
        refresh: !refresh
      });
    } catch (error) {
      setPage("Google");
      setSocialLink("");
      let errorMessage = "Something went wrong, please try again later.";
      let severity: AlertColor = "error";

      if (error === "link already exist") {
        errorMessage = "Social media link already exists";
        severity = "warning";
      }

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: severity,
        isAlertOpen: true
      });
    }
  };

  useEffect(() => {
    formRef.current.setFieldValue("socialPage", "Google");
  }, []);

  return (
    <Box
      p={1.5}
      width="100%"
      sx={{
        marginBottom: "20px",
        background: `${theme.colors.alpha.black[10]}`
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: `${theme.typography.pxToRem(16)}`,
          color: `${theme.colors.alpha.black[100]}`
        }}
      >
        Add social media link
      </Typography>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <VTextField
              id="social-link"
              name="socialLink"
              value={socialLink}
              onChange={(e) => setSocialLink(e.target.value)}
              margin="normal"
              type="url"
              InputProps={{ style: { height: "35px" } }}
              sx={{
                "& .MuiInputBase-root": { fontSize: "14px", width: "40vw" }
              }}
              required
            />
            <VTextField
              name="socialPage"
              id="outlined-select-currency"
              select
              label="Select social page"
              value={page}
              InputProps={{
                style: {
                  marginTop: "15px",
                  marginLeft: "10px",
                  height: "35px",
                  width: "15vw"
                }
              }}
              InputLabelProps={{ style: { marginTop: "15px", marginLeft: "10px" } }}
              onChange={(e) => {
                setPage(e.target.value);
                formRef.current.setFieldValue("socialPage", e.target.value);
              }}
            >
              {selectProvider.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </VTextField>
          </Box>
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="secondary"
            sx={{ marginTop: 1, "& .MuiSvgIcon-root": { fontSize: "18px" } }}
          >
            <AddIcon fontSize="small" sx={{ marginRight: "5px" }} />
            ADD
          </Button>
        </Box>
      </Form>
    </Box>
  );
}

export default AddSocialPage;
