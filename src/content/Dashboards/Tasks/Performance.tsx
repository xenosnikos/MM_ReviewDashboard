import {
  Card,
  Box,
  CardContent,
  Typography,
  useTheme,
  styled,
  Rating
} from "@mui/material";

const RootWrapper = styled(Card)(
  ({ theme }) => `
    background: ${theme.colors.gradients.green1};
    color: ${theme.colors.alpha.white[100]};
`
);

function Performance() {
  const theme = useTheme();

  return (
    <RootWrapper
      sx={{
        p: 2
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
        Average Star Rating
      </Typography>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: `${theme.typography.pxToRem(60)}`,
              color: `${theme.colors.alpha.white[100]}`,
              marginBottom: 3
            }}
          >
            4.09
          </Typography>
          <Rating value={4.09} defaultValue={5} precision={0.1} readOnly />
        </Box>
      </CardContent>
    </RootWrapper>
  );
}

export default Performance;
