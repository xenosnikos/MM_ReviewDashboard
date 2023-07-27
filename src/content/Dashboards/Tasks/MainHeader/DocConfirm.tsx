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
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Typography,
  Grid
} from "@mui/material";
import { providers } from "@/helpers/constant";
import DataContext from "@/contexts/DataContext";

function DocConfirm({ open, onClose, onConfirm }) {
  const { selectedSources, setDataState } = useContext(DataContext);
  const [selectedOption, setSelectedOption] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChangeOption = (event) => {
    setSelectedOption(event.target.value);
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

  const handleConfirm = () => {
    onConfirm(selectedSources);
    setDataState({
      selectedSources: providers
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md">
      <DialogTitle variant="h4">Select sources and date range from reviews.</DialogTitle>
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
              <RadioGroup value={selectedOption} onChange={handleChangeOption}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All reviews"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="dateRange"
                      control={<Radio />}
                      label="Select date range"
                    />
                  </Grid>
                </Grid>
                {selectedOption === "dateRange" && (
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Typography variant="subtitle2">From the:</Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle2">To the:</Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </RadioGroup>
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
