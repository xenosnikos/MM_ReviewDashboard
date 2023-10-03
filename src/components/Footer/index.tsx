import { Box, Container, Link, Typography, styled } from "@mui/material";

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  const currentdata = new Date()
  const currentYear = currentdata.getFullYear()
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: "block", md: "flex" }}
        alignItems="center"
        textAlign={{ xs: "center", md: "left" }}
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; {currentYear} - &nbsp;
            <Link href={"http://gopinion.ca"} target="_blank" rel="noopener noreferrer">
              Gopinion.ca
            </Link>
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          Powered by{" "}
          <Link href="http://maxxmedia.ca/" target="_blank" rel="noopener noreferrer">
            MaxxMedia
          </Link>
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
