import {
  AlertColor,
  Box,
  IconButton,
  Link,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import { useCallback, useContext, useState } from "react";
import { filterProvider } from "@/helpers/constant";
import DataContext from "@/contexts/DataContext";
import { deleteClientSocialMediaLink, editClientSocialMediaLink } from "@/services";
import CustomConfirm from "@/components/CustomConfirm";

function GetSocialPages() {
  const theme = useTheme();
  const { links, filter, refresh, setDataState } = useContext(DataContext);
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editLinkValue, setEditLinkValue] = useState("");

  const handleDeleteLink = useCallback(async () => {
    try {
      await deleteClientSocialMediaLink(+selectedLinkId);

      const successMessage = "Social media link successfully deleted!";
      const successSeverity: AlertColor = "success";

      setDataState({
        alertMessage: successMessage,
        alertSeverity: successSeverity,
        isAlertOpen: true
      });

      setSelectedLinkId(null);
      setDataState({
        refresh: !refresh
      });
    } catch (error) {
      const errorMessage = "Something went wrong, please try again later.";
      const errorSeverity: AlertColor = "error";

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: errorSeverity,
        isAlertOpen: true
      });
    }
  }, [selectedLinkId]);

  const handleEditLink = useCallback(async () => {
    const body = {
      id: selectedLinkId,
      url: editLinkValue
    };

    try {
      await editClientSocialMediaLink(body);

      const successMessage = "Social media link successfully edited!";
      const successSeverity: AlertColor = "success";

      setDataState({
        alertMessage: successMessage,
        alertSeverity: successSeverity,
        isAlertOpen: true
      });

      setEditMode(false);
      setSelectedLinkId(null);
      setEditLinkValue("");
      setDataState({
        refresh: !refresh
      });
    } catch (error) {
      const errorMessage = "Something went wrong, please try again later.";
      const errorSeverity: AlertColor = "error";

      setDataState({
        alertMessage: errorMessage,
        alertSeverity: errorSeverity,
        isAlertOpen: true
      });
    }
  }, [selectedLinkId, editLinkValue]);

  const handleCancelEdit = () => {
    setSelectedLinkId(null);
    setEditLinkValue("");
    setEditMode(false);
  };

  const handleStartEdit = (linkObj) => {
    setSelectedLinkId(linkObj.id);
    setEditLinkValue(linkObj.link);
    setEditMode(true);
  };

  return (
    <>
      <TextField
        name="filterOption"
        id="outlined-select-filter"
        select
        label="Filter"
        value={filter}
        defaultValue={filter}
        onChange={(e) => setDataState({ filter: e.target.value })}
        InputProps={{ style: { marginBottom: "5px", height: "35px", width: "15vw" } }}
      >
        {filterProvider.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

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
                  {editMode && selectedLinkId === linkObj.id ? (
                    <TextField
                      id="social-url"
                      name="socialUrl"
                      margin="normal"
                      type="url"
                      value={editLinkValue}
                      onChange={(e) => setEditLinkValue(e.target.value)}
                      InputProps={{ style: { height: "35px" } }}
                      sx={{
                        "& .MuiInputBase-root": {
                          fontSize: "14px",
                          width: "40vw",
                          marginBottom: "7px"
                        }
                      }}
                      required
                    />
                  ) : (
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
                  )}
                </Box>
                <Box>
                  {editMode && selectedLinkId === linkObj.id ? (
                    <>
                      <Tooltip title="Cancel Edit" arrow>
                        <IconButton
                          sx={{
                            "&:hover": { background: theme.colors.error.lighter },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={handleCancelEdit}
                        >
                          <CancelIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Save Link" arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.success.lighter
                            },
                            color: theme.palette.success.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={handleEditLink}
                        >
                          <DoneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <>
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
                          onClick={() => handleStartEdit(linkObj)}
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
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })
      )}
      <CustomConfirm onConfirm={handleDeleteLink} />
    </>
  );
}

export default GetSocialPages;
