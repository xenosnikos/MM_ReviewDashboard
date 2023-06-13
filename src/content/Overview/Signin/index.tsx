import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';

function Signin() {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Container maxWidth="sm" sx={{ textAlign: 'left', marginBottom: '150px' }}>
        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card
            variant="outlined"
            sx={{
              background: `${theme.colors.alpha.black[10]}`
            }}>
            <CardHeader title="Sign in" subheader="Enter your account details below" />
            <Divider />
            <Box
              p={5}
              component="form"
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                sx={{ marginBottom: '30px', width: '100%' }}
                id="outlined-email"
                label="E-mail"
                type="email"
              />
              <FormControl required sx={{ marginBottom: '60px', width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Box >
                <Button variant="contained" sx={{ width: '100%' }}>SIGN IN</Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Container >
    </>
  );
}

export default Signin;
