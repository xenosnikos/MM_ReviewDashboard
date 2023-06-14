import { VPassField, VTextField } from '@/forms';
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
} from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Head from 'next/head';
import { useRef } from 'react';

interface IFormData {
  username: string,
  password: string
}

function Signin() {
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = (data: IFormData) => {
    // user authentication logic
    return console.log(data);
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Container maxWidth="sm" sx={{ marginBottom: '100px' }}>
        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card
            variant="outlined"
            sx={{
              background: `${theme.colors.alpha.black[10]}`
            }}>
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
                  type="text"
                />
                <VPassField
                  name="password"
                  required
                  fullWidth
                  margin="normal"
                  id="outlined-pass"

                />
                <Box display="flex" justifyContent="flex-start" sx={{ width: "100%" }}>
                  <FormControlLabel control={<Checkbox />} label="Remember me" />
                </Box>
              </Form>
              <Button
                variant="contained"
                sx={{ marginTop: "60px", width: "100%" }}
                onClick={() => formRef.current?.submitForm()}>SIGN IN</Button>
            </Box>
          </Card>
        </Grid>
      </Container >
    </>
  );
}

export default Signin;
