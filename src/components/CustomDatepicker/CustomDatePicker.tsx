import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, Input } from '@mui/material';
import { useState } from "react"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomDatePicker({ open, handleClose }) {
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: new Date(),
      key: 'selection',
      moveRangeOnFirstSelection: false,
      retainEndDateOnFirstSelection: false

    }
  ]);
  return (
    <div>
      <Box bgcolor={"white"}>
        <Dialog
          className='datePicker'
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle >{"Choose Date's"}</DialogTitle>
          <DialogContent>
            <Box display={"flex"} gap={4} >
              <DateRange
                className="DatePicker"
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                maxDate={new Date()}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Select</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}