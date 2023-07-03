import { VTextField } from "@/forms";
import {
  Box,
  Button,
  IconButton,
  Link,
  MenuItem,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const pages = [
  {
    value: "facebook",
    label: "Facebook"
  },
  {
    value: "google",
    label: "Google"
  },
  {
    value: "yelp",
    label: "Yelp"
  },
  {
    value: "yellow_pages",
    label: "Yellow Pages"
  }
];

function SocialPages() {
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const [page, setPage] = useState("facebook");
  const [links, setLinks] = useState([]);

  console.log(links);

  const handleSubmit = (data) => {
    setLinks([...links, data]);
    formRef.current.setFieldValue("socialLink", "");
    formRef.current.setFieldValue("socialPage", "facebook");
  };

  useEffect(() => {
    formRef.current.setData({ socialPage: page });
  }, [page]);

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontSize: `${theme.typography.pxToRem(23)}`,
          color: `${theme.colors.alpha.black[100]}`,
          marginBottom: 3
        }}
      >
        Social Pages
      </Typography>
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
          Add social page link
        </Typography>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <VTextField
                id="social-link"
                name="socialLink"
                margin="normal"
                InputProps={{ style: { height: "35px" } }}
                sx={{
                  "& .MuiInputBase-root": { fontSize: "14px", width: "40vw" }
                }}
                required
              />
              <VTextField
                name="socialPage"
                id="outlined-select-currency"
                select
                label="Select social page"
                value={page}
                onChange={(e) => setPage(e.target.value)}
                InputProps={{ style: { height: "35px", width: "15vw" } }}
                sx={{ marginTop: "16px", marginLeft: "10px" }}
              >
                {pages.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </VTextField>
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
      {links.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            marginTop: "45px",
            fontSize: `${theme.typography.pxToRem(22)}`,
            color: `${theme.palette.text.primary}`,
            textAlign: "center"
          }}
        >
          There are no social links added for this client yet.
        </Typography>
      ) : (
        links.map((linkObj, index) => {
          const selectedPage = pages.find(
            (option) => option.value === linkObj.socialPage
          );
          const pageLabel = selectedPage ? selectedPage.label : "";

          return (
            <Box
              key={index}
              p={1.5}
              width="100%"
              sx={{
                marginBottom: "20px",
                background: `${theme.colors.alpha.black[5]}`
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: `${theme.typography.pxToRem(16)}`,
                  color: `${theme.colors.alpha.black[100]}`
                }}
              >
                {pageLabel}
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                  <AttachFileIcon sx={{ fontSize: 18, marginRight: "5px" }} />
                  <Link
                    href={linkObj.socialLink}
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                    color="inherit"
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: `${theme.typography.pxToRem(14)}`,
                        color: `${theme.palette.text.primary}`
                      }}
                    >
                      {linkObj.socialLink}
                    </Typography>
                  </Link>
                </Box>
                <Box>
                  <Tooltip title="Edit Link" arrow>
                    <IconButton
                      sx={{
                        "&:hover": {
                          background: theme.colors.primary.lighter
                        },
                        color: theme.palette.primary.main
                      }}
                      color="inherit"
                      size="small"
                    >
                      <EditTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Link" arrow>
                    <IconButton
                      sx={{
                        "&:hover": { background: theme.colors.error.lighter },
                        color: theme.palette.error.main
                      }}
                      color="inherit"
                      size="small"
                    >
                      <DeleteTwoToneIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
}

export default SocialPages;
