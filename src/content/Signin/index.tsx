import { VPassField, VTextField } from "@/forms";
import {
  AlertColor,
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  useTheme
} from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import Head from "next/head";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { postSignin } from "@/services";
import DataContext from "@/contexts/DataContext";
import CustomAlert from "@/components/CustomAlert";
import { IFormData } from "@/models";

function Signin() {
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();
  const { setDataState } = useContext(DataContext);
  const [checked, setChecked] = useState<boolean | null>(null);

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  if (typeof window !== "undefined") {
    const clientId = localStorage.getItem("clientId");
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    const check = localStorage.getItem("check");

    if (rememberedUsername) {
      formRef.current?.setFieldValue("username", rememberedUsername);
    }

    if (clientId && check === "check") {
      router.push(`/dashboards/tasks?client=${clientId}`);
    }

    if (check === "check") {
      router.push("/dashboards/tasks");
    }
  }

  const handleSubmit = async (data: IFormData) => {
    if (!data.username && !data.password) {
      setDataState({
        requiredTextError: true,
        requiredPassError: true
      });
      return;
    }

    if (!data.username) {
      setDataState({
        requiredTextError: true,
        requiredPassError: false
      });
      return;
    }

    if (!data.password) {
      setDataState({
        requiredTextError: false,
        requiredPassError: true
      });
      return;
    }

    if (checked) {
      localStorage.setItem("rememberedUsername", data.username);
      localStorage.setItem("check", "check");
    }

    if (!checked) {
      localStorage.removeItem("rememberedUsername");
      localStorage.removeItem("check");
    }

    try {
      const token = await postSignin(data);
      const clientId = localStorage.getItem("clientId");

      localStorage.setItem("MM_token", JSON.stringify(token));

      setDataState({
        requiredTextError: false,
        requiredPassError: false
      });

      if (clientId) {
        return router.push(`/dashboards/tasks?client=${clientId}`);
      }

      return router.push("/dashboards/tasks");
    } catch (error) {
      let errorMessage = "Something went wrong, please try again later.";
      let severity: AlertColor = "error";

      if (error === "username not match" || error === "password not match") {
        errorMessage = "Your username or password is incorrect, please try again.";
        severity = "warning";
      }
      return setDataState({
        alertMessage: errorMessage,
        alertSeverity: severity,
        isAlertOpen: true
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      formRef.current?.submitForm();
    }
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Container maxWidth="sm" sx={{ marginBottom: "100px" }}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Card
            variant="outlined"
            sx={{
              background: `${theme.colors.alpha.black[10]}`
            }}
          >
            <CardHeader title="Sign in" subheader="Enter your account details below" />
            <Divider />

            <Box p={5}>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <VTextField
                  name="username"
                  required
                  fullWidth
                  margin="normal"
                  id="outlined-text"
                  label="Username"
                  onKeyDown={handleKeyDown}
                />
                <VPassField
                  name="password"
                  required
                  fullWidth
                  margin="normal"
                  id="outlined-pass"
                  label="Password"
                  onKeyDown={handleKeyDown}
                />
                <Box display="flex" justifyContent="flex-start" sx={{ width: "100%" }}>
                  <FormControlLabel
                    control={<Checkbox onChange={handleRememberMeChange} />}
                    label="Remember me"
                  />
                </Box>
              </Form>
              <Button
                variant="contained"
                sx={{ marginTop: "60px", width: "100%" }}
                onClick={() => formRef.current?.submitForm()}
              >
                SIGN IN
              </Button>
            </Box>
          </Card>
        </Grid>
      </Container>
      <CustomAlert />
    </>
  );
}

export default Signin;
