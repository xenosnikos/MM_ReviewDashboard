import { Card, Typography, useTheme, styled } from "@mui/material";

const RootWrapper = styled(Card)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green1};
    color: ${theme.colors.alpha.white[100]};
`
);

function TotalReviews({ amount }) {
  const theme = useTheme();

  return (
    <RootWrapper
      sx={{
        p: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography
        variant="h3"
        sx={{
          px: 2,
          pb: 1,
          pt: 2,
          fontSize: `${theme.typography.pxToRem(23)}`,
          color: `${theme.colors.alpha.white[100]}`
        }}
      >
        Total Reviews
      </Typography>
      <Typography
        variant="h2"
        sx={{
          px: 2,
          pb: 1,
          pt: 2,
          fontSize: `${theme.typography.pxToRem(60)}`,
          color: `${theme.colors.alpha.white[100]}`
        }}
      >
        {amount}
      </Typography>
    </RootWrapper>
  );
}

export default TotalReviews;
