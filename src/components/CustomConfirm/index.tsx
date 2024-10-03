import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, useTheme } from "@mui/material";
import { useContext } from "react";
import DataContext from "@/contexts/DataContext";
import WarningIcon from "@mui/icons-material/Warning";

function CustomConfirm({ onConfirm }) {
  const { isConfirmOpen, setDataState } = useContext(DataContext);
  const theme = useTheme();

  const handleClose = () => {
    setDataState({
      isConfirmOpen: false
    });
  };

  const handleAgree = () => {
    onConfirm();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={isConfirmOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box display="flex" alignItems="center" justifyContent="center">
            <WarningIcon sx={{ fontSize: 40, color: theme.palette.error.main }} />
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: 18, textAlign: "center" }}
          >
            Do you want to proceed with this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: theme.palette.error.main }}>
            Cancel
          </Button>
          <Button
            onClick={handleAgree}
            autoFocus
            style={{ color: theme.palette.success.main }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomConfirm;
