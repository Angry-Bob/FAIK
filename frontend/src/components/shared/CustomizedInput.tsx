import React from "react";
import TextField from "@mui/material/TextField";
type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "Black", fontWeight: 800 } }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          
          width: "400px",
          borderRadius: 5,
          fontSize: 20,
          borderBottom: "1px solid grey",
          color: "black",
        },
      }}
    />
  );
};

export default CustomizedInput;