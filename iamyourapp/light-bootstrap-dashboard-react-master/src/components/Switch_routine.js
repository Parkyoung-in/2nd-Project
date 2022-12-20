import * as React from "react";
import Switch from "@mui/material/Switch";

function ControlledSwitches() {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
    console.log(event.target.checked);
    setChecked(event.target.checked);
  };
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}
export default ControlledSwitches;
