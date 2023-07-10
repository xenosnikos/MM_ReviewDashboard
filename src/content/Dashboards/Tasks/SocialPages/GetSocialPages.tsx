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
import { useCallback, useContext, useState } from "react";
import { filterProvider } from "@/helpers/constant";
import DataContext from "@/contexts/DataContext";
import { deleteClientSocialMediaLink } from "@/services";
import CustomConfirm from "@/components/CustomConfirm";

function GetSocialPages() {
  const theme = useTheme();
  const { links, filter, refresh, setDataState } = useContext(DataContext);
  const [selectedLinkId, setSelectedLinkId] = useState(null);

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

  return (
    <>
      {links.length > 0 && (
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
      )}
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
      <CustomConfirm onConfirm={handleDeleteLink} />
    </>
  );
}

export default GetSocialPages;
