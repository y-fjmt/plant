import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const FormPropsTextFields = ({ label }: { label: string }) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label={label} // 外部から渡されたlabelを使用する
          defaultValue=""
        />
      </div>
    </Box>
  );
};

export default FormPropsTextFields;
