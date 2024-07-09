import {
  AlertColor,
  Box,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import { useCallback, useContext, useState } from "react";
import DataContext from "@/contexts/DataContext";
import CustomConfirm from "@/components/CustomConfirm";
import { EditClientReminderEmail } from "@/models";
import { deleteClientReminderEmail, editClientReminderEmail } from "@/services/clientEmail";

function GetEmails() {
  const theme = useTheme();
  const { emails, refresh, setDataState } = useContext(DataContext);
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editEmailValue, setEditEmailValue] = useState<string>("");
  

  const handleDeleteEmail = useCallback(async () => {
    if (selectedEmailId === null) return;

    try {
      await deleteClientReminderEmail(selectedEmailId);

      const successMessage = "Email successfully deleted!";
      const successSeverity: AlertColor = "success";

      setDataState({
        alertMessage: successMessage,
        alertSeverity: successSeverity,
        isAlertOpen: true
      });

      setSelectedEmailId(null);
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
  }, [selectedEmailId, setDataState, refresh]);

  const handleEditEmail = useCallback(async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editEmailValue)) {
      setDataState({
        alertMessage: "Invalid email format",
        alertSeverity: "error" as AlertColor,
        isAlertOpen: true
      });
      return;
    }

    const body: EditClientReminderEmail = {
      id: selectedEmailId!,
      email: editEmailValue
    };

    try {
      await editClientReminderEmail(body);

      const successMessage = "Email successfully edited!";
      const successSeverity: AlertColor = "success";

      setDataState({
        alertMessage: successMessage,
        alertSeverity: successSeverity,
        isAlertOpen: true
      });

      setEditMode(false);
      setSelectedEmailId(null);
      setEditEmailValue("");
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
  }, [selectedEmailId, editEmailValue, setDataState, refresh]);

  const handleCancelEdit = () => {
    setSelectedEmailId(null);
    setEditEmailValue("");
    setEditMode(false);
  };

  const handleStartEdit = (emailObj) => {
    setSelectedEmailId(emailObj.id);
    setEditEmailValue(emailObj.email);
    setEditMode(true);
  };

  return (
    <>
      {emails?.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            marginTop: "45px",
            fontSize: `${theme.typography.pxToRem(22)}`,
            color: `${theme.palette.text.primary}`,
            textAlign: "center"
          }}
        >
          There are no emails added for this client yet.
        </Typography>
      ) : (
        emails?.map((emailObj, index) => (
          <Box
            key={index}
            p={1.5}
            width="100%"
            sx={{
              marginBottom: "20px",
              background: `${theme.colors.alpha.black[5]}`
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center">
                {editMode && selectedEmailId === emailObj.id ? (
                  <TextField
                    id="email"
                    name="email"
                    margin="normal"
                    type="email"
                    value={editEmailValue}
                    onChange={(e) => setEditEmailValue(e.target.value)}
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
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: `${theme.typography.pxToRem(14)}`,
                      color: `${theme.palette.text.primary}`
                    }}
                  >
                    {emailObj.email}
                  </Typography>
                )}
              </Box>
              <Box>
                {editMode && selectedEmailId === emailObj.id ? (
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
                    <Tooltip title="Save Email" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.success.lighter
                          },
                          color: theme.palette.success.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={handleEditEmail}
                      >
                        <DoneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="Edit Email" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleStartEdit(emailObj)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Email" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setSelectedEmailId(emailObj.id);
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
        ))
      )}
      <CustomConfirm onConfirm={handleDeleteEmail} />
    </>
  );
}

export default GetEmails;
