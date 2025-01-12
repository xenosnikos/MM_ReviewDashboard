import { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Grid,
  Box
} from "@mui/material";
import { providers } from "@/helpers/constant";
import DataContext from "@/contexts/DataContext";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
function DocConfirm({ open, onClose, onConfirm }) {
  const { selectedSources, selectedDateOption, setDataState } = useContext(DataContext);
  // const [disabledDate, setDisabledDate] = useState(true);
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
      moveRangeOnFirstSelection: false,
      retainEndDateOnFirstSelection: false
    }
  ]);

  const handleChangeOption = (event) => {
    const value = event.target.value;
    setDataState({
      selectedDateOption: value,
      startDate: value === "all" ? null : state[0].startDate,
      endDate: value === "all" ? null : state[0].endDate
    });
  };

  const isAllSelectedSources =
    providers.length > 0 && selectedSources.length === providers.length;

  const handleChangeSelectSources = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setDataState({
        selectedSources: selectedSources.length === providers.length ? [] : providers
      });
      return;
    }
    setDataState({
      selectedSources: value
    });
  };

  const handleCancel = () => {
    setDataState({
      selectedSources: providers
    });
    onClose();
  };

  const handleConfirm = async () => {
    if (
      selectedDateOption === "dateRange" &&
      (!state[0].startDate || !state[0].endDate)
    ) {
      setDataState({
        alertMessage: "Please select both start and end dates",
        alertSeverity: "warning",
        isAlertOpen: true
      });
      return;
    }

    if (selectedDateOption === "dateRange") {
      await setDataState({
        startDate: state[0].startDate,
        endDate: state[0].endDate
      });
    }

    onClose();
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md">
      <DialogTitle variant="h4">Select sources and date range from reviews</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl style={{ minWidth: 150 }}>
              <Select
                multiple
                inputProps={{
                  id: "sourcesSelect"
                }}
                value={selectedSources}
                renderValue={() => {
                  return "Select Sources";
                }}
                notched={true}
                onChange={handleChangeSelectSources}
                autoWidth
              >
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={isAllSelectedSources}
                      indeterminate={
                        selectedSources.length > 0 &&
                        selectedSources.length < providers.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {providers.map((option) => (
                  <MenuItem key={option} value={option}>
                    <ListItemIcon>
                      <Checkbox checked={selectedSources.indexOf(option) > -1} />
                    </ListItemIcon>
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDateOption === "all"}
                      onChange={() => handleChangeOption({ target: { value: "all" } })}
                    />
                  }
                  label="All reviews"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedDateOption === "dateRange"}
                      onChange={() =>
                        handleChangeOption({ target: { value: "dateRange" } })
                      }
                    />
                  }
                  label="Select date range"
                />
              </Box>
              {selectedDateOption != "all" ? (
                <DateRange
                  className="DatePicker"
                  editableDateInputs={true}
                  onChange={(item) => {
                    setState([item.selection]);
                    // Immediately update the context when dates change
                    setDataState({
                      startDate: item.selection.startDate,
                      endDate: item.selection.endDate
                    });
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  maxDate={new Date()}
                />
              ) : (
                // <Grid spacing={2} alignItems="center" sx={{ marginTop: "8px" }}>
                //   <Grid item>
                //     <Typography
                //       variant="subtitle2"
                //       color={disabledDate ? "" : "textPrimary"}
                //     >
                //       From the:
                //     </Typography>
                //   </Grid>
                //   <Grid item sx={{ marginTop: "10px" }}>
                //     <MobileDatePicker
                //       label="Start Date"
                //       inputFormat="dd/MM/yyyy"
                //       value={startDate}
                //       onChange={(date) => setDataState({ startDate: date })}
                //       renderInput={(params) => <TextField {...params} />}
                //       disabled={disabledDate}
                //     />
                //   </Grid>
                //   <Grid item sx={{ marginTop: "10px" }}>
                //     <Typography
                //       variant="subtitle2"
                //       color={disabledDate ? "" : "textPrimary"}
                //     >
                //       To the:
                //     </Typography>
                //   </Grid>
                //   <Grid item sx={{ marginTop: "10px" }}>
                //     <MobileDatePicker
                //       label="End Date"
                //       inputFormat="dd/MM/yyyy"
                //       value={endDate}
                //       onChange={(date) => setDataState({ endDate: date })}
                //       renderInput={(params) => <TextField {...params} />}
                //       disabled={disabledDate}
                //     />
                //   </Grid>
                // </Grid>
                ""
              )}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DocConfirm;
