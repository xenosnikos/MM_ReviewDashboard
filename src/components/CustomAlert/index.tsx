import React, { forwardRef, useContext } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import DataContext from "@/contexts/DataContext";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomAlert() {
  const { isAlertOpen, alertMessage, alertSeverity, setDataState } =
    useContext(DataContext);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setDataState({
      isAlertOpen: false
    });
  };

  return (
    <Snackbar open={isAlertOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: "100%" }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}

export default CustomAlert;
