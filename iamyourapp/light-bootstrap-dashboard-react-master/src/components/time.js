import * as React from "react";

import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicTimePicker() {
  const [strvalue, setStrValue] = React.useState();
  const [endvalue, setEndValue] = React.useState();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        value={strvalue}
        onChange={(newValue) => {
          setStrValue(newValue);
        }}
        id="startTime"
        renderInput={(params) => <TextField {...params} />}
      />
      {/* <TimePicker
        label="Basic example"
        value={endvalue}
        onChange={(newValue) => {
            setEndValue(newValue);
        }}
        id="endTime"
        renderInput={(params) => <TextField {...params} />}
      /> */}
    </LocalizationProvider>
  );
}
