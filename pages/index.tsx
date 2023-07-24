import { Box, Container, Divider, styled, Typography, useTheme } from "@mui/material";
import type { ReactElement } from "react";
import BaseLayout from "src/layouts/BaseLayout";

import Head from "next/head";

import Signin from "@/content/Overview/Signin";

import Footer from "src/components/Footer";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${theme.spacing(10)};
  background-color: ${theme.colors.alpha.black[5]};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const theme = useTheme();

  return (
    <OverviewWrapper>
      <Head>
        <title>Sign in</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box>
            <Typography
              variant="h1"
              sx={{
                textAlign: "center",
                fontSize: `${theme.typography.pxToRem(30)}`,
                color: `${theme.colors.alpha.black[100]}`
              }}
            >
              MaxxMedia
            </Typography>
          </Box>
        </Container>
      </HeaderWrapper>
      <Divider sx={{ mb: `${theme.spacing(6)}` }} />
      <Signin />
      <Footer />
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
