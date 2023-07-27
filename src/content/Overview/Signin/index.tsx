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
import { useContext, useRef } from "react";
import { useRouter } from "next/router";
import { postSignin } from "@/services";
import DataContext from "@/contexts/DataContext";

import CustomAlert from "@/components/CustomAlert";

export interface IFormData {
  username: string;
  password: string;
}

function Signin() {
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();
  const { setDataState } = useContext(DataContext);

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

    try {
      const token = await postSignin(data);
      const clientUrlKey = localStorage.getItem("clientUrlKey");

      localStorage.setItem("MM_token", JSON.stringify(token));

      setDataState({
        requiredTextError: false,
        requiredPassError: false
      });

      if (clientUrlKey) {
        return router.push(`/dashboards/tasks?client=${clientUrlKey}`);
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
                  <FormControlLabel control={<Checkbox />} label="Remember me" />
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
