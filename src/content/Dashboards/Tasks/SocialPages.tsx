import {
  AlertColor,
  Box,
  Button,
  IconButton,
  Link,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import { VTextField } from "@/forms";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useContext, useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DataContext from "@/contexts/DataContext";
import {
  getClientSocialMediaLink,
  createClientSocialMediaLink,
  deleteClientSocialMediaLink
} from "@/services";
import { providers } from "@/helpers/constant";
import CustomConfirm from "@/components/CustomConfirm";

const selectProvider = [...providers.filter((item) => item !== "Cars")];

const filterProvider = ["All Social Media", ...selectProvider];

function SocialPages() {
  const theme = useTheme();
  const formRef = useRef<FormHandles>(null);
  const [page, setPage] = useState(selectProvider[0]);
  const [filter, setFilter] = useState(filterProvider[0]);
  const [data, setData] = useState([]);
  const { clientId, setDataState } = useContext(DataContext);
  const [selectedLinkId, setSelectedLinkId] = useState(null);

  const handleSubmit = async (data) => {
    const { socialLink, socialPage } = data;

    const body = {
      clientid: clientId,
      title: socialPage,
      url: socialLink
    };

    try {
      await createClientSocialMediaLink(body);

      formRef.current.setFieldValue("socialLink", "");
      formRef.current.setFieldValue("socialPage", "Google");
      const errorMessage = "Social media link successfully added!";
      const severity: AlertColor = "success";

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: severity,
        isAlertOpen: true
      });

      getClientSocialMediaData();
    } catch (error) {
      formRef.current.setFieldValue("socialLink", "");
      formRef.current.setFieldValue("socialPage", "Google");
      const errorMessage = "Something went wrong, please try again later.";
      const severity: AlertColor = "error";

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: severity,
        isAlertOpen: true
      });
    }
  };

  useEffect(() => {
    formRef.current.setData({ socialPage: page });
  }, [page]);

  useEffect(() => {
    if (typeof clientId === "string") getClientSocialMediaData();
  }, [clientId, filter]);

  const getClientSocialMediaData = async () => {
    const title = filter === "All Social Media" ? null : filter;

    try {
      const response = await getClientSocialMediaLink(clientId, title);

      if (Array.isArray(response)) return setData(response);

      throw new Error("Invalid response data.");
    } catch (error) {
      const errorMessage = "Something went wrong, please try again later.";
      const severity: AlertColor = "error";

      return setDataState({
        alertMessage: errorMessage,
        alertSeverity: severity,
        isAlertOpen: true
      });
    }
  };

  const handleDeleteLink = async () => {
    try {
      await deleteClientSocialMediaLink(selectedLinkId);

      const successMessage = "Social media link successfully deleted!";
      const successSeverity: AlertColor = "success";

      setDataState({
        alertMessage: successMessage,
        alertSeverity: successSeverity,
        isAlertOpen: true
      });

      setSelectedLinkId(null);
      getClientSocialMediaData();
    } catch (error) {
      const errorMessage = "Something went wrong, please try again later.";
      const errorSeverity: AlertColor = "error";

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: errorSeverity,
        isAlertOpen: true
      });
    }
  };

  return (
    <>
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
                  type="url"
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
                  {selectProvider.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
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
        {data.length > 0 && (
          <TextField
            name="filterOption"
            id="outlined-select-filter"
            select
            label="Filter"
            value={filter}
            defaultValue={filter}
            onChange={(e) => setFilter(e.target.value)}
            InputProps={{ style: { marginBottom: "5px", height: "35px", width: "15vw" } }}
          >
            {filterProvider.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
        {data.length === 0 ? (
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
          data.map((linkObj, index) => {
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
                  {linkObj.title}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" alignItems="center">
                    <AttachFileIcon sx={{ fontSize: 18, marginRight: "5px" }} />
                    <Link
                      href={linkObj.link}
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
                        {linkObj.link}
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
                        onClick={() => {
                          setSelectedLinkId(linkObj.id);
                          setDataState({ isConfirmOpen: true });
                        }}
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
      <CustomConfirm onConfirm={handleDeleteLink} />
    </>
  );
}

export default SocialPages;
