import { VPassField, VTextField } from "@/forms";
import {
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

export interface IFormData {
  username: string;
  password: string;
}

function Signin() {
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();
  const { setRequiredTextError, setRequiredPassError } =
    useContext(DataContext);

  const handleSubmit = async (data: IFormData) => {
    if (!data.username && !data.password) {
      setRequiredTextError(true);
      setRequiredPassError(true);
      return;
    }

    if (!data.username) {
      setRequiredTextError(true);
      setRequiredPassError(false);
      return;
    }

    if (!data.password) {
      setRequiredTextError(false);
      setRequiredPassError(true);
      return;
    }

    try {
      const token = await postSignin(data);
      console.log(token);

      localStorage.setItem("MM_token", JSON.stringify(token));

      setRequiredTextError(false);
      setRequiredPassError(false);

      return router.push("/dashboards/tasks?client=hamel-honda");
    } catch (error) {
      console.log(error);
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
            <CardHeader
              title="Sign in"
              subheader="Enter your account details below"
            />
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
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  sx={{ width: "100%" }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
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
    </>
  );
}

export default Signin;
