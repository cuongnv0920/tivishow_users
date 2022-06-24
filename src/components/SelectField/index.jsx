import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

SelectField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function SelectField(props) {
  const { form, name, label } = props;
  const { control } = form;

  return (
    <Controller
      id={name}
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error, disabled },
      }) => (
        <FormControl
          error={invalid}
          fullWidth
          margin="normal"
          variant="outlined"
        >
          <InputLabel id={name} htmlFor={name}>
            {label}
          </InputLabel>
          <Select
            labelId={name}
            fullWidth
            label={label}
            name={name}
            error={error}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            value={value}
          />

          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    ></Controller>
  );
}

export default SelectField;
