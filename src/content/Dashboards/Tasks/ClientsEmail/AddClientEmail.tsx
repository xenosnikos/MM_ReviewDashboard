import { VTextField } from "@/forms";
import { AlertColor, Box, Button, Typography, useTheme } from "@mui/material";
import { Form } from "@unform/web";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useRef } from "react";
import { FormHandles } from "@unform/core";
import DataContext from "@/contexts/DataContext";
import { CreateClientEmail } from "@/models";
import { createClientReminderEmail } from "@/services/clientEmail";

function AddEmailPage() {
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const { clientId, refresh, setDataState } = useContext(DataContext);

  const handleSubmit = async (data) => {
    const { email } = data;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setDataState({
        alertMessage: "Invalid email format",
        alertSeverity: "error" as AlertColor,
        isAlertOpen: true
      });
      return;
    }

    const body: CreateClientEmail = {
      clientId: clientId,
      email: email
    };

    try {
      await createClientReminderEmail(body);

      formRef.current.setFieldValue("email", "");
      const successMessage = "Email successfully added!";
      const severity: AlertColor = "success";

      setDataState({
        alertMessage: successMessage,
        alertSeverity: severity,
        isAlertOpen: true
      });

      setDataState({
        refresh: !refresh
      });
    } catch (error) {
      formRef.current.setFieldValue("email", "");
      let errorMessage = "Something went wrong, please try again later.";
      let severity: AlertColor = "error";

      if (error === "email already exist") {
        errorMessage = "Email already exists";
        severity = "warning";
      }

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: severity,
        isAlertOpen: true
      });
    }
  };

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
        Add email
      </Typography>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <VTextField
              id="email"
              name="email"
              margin="normal"
              type="email"
              InputProps={{ style: { height: "35px" } }}
              sx={{
                "& .MuiInputBase-root": { fontSize: "14px", width: "40vw" }
              }}
              required
            />
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

export default AddEmailPage;
