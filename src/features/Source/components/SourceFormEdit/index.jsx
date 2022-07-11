import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StorageKeys from "../../../../configs/StorageKeys.conf";
import "./styles.scss";

SourceFormEdit.propTypes = {
  onSubmit: PropTypes.func,
};

function SourceFormEdit(props) {
  const [checked, setChecked] = useState("enabled");
  const [value, setValue] = useState();

  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const rowData = JSON.parse(localStorage.getItem(StorageKeys.SOURCE)) || [];

  const onSubmit = async (form) => {
    const { onSubmit } = props;

    const formData = new FormData();
    formData.append("id", rowData[0].id);
    formData.append("source", form.source[0]);
    formData.append("status", form.status);
    formData.append("description", form.description);

    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  const handleChangeChecked = (event) => {
    setChecked(event.target.value);
  };

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="sourceFormEdit">
      {isSubmitting && <LinearProgress className="sourceFormEdit__progress" />}

      <Avatar className="sourceFormEdit__avatar">
        <EditIcon />
      </Avatar>

      <Typography component="h3" variant="h5" className="sourceFormEdit__title">
        Sửa Video
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="sourceUploadEdit"
          {...register("source")}
          type="file"
          style={{ display: "none" }}
        />

        <label htmlFor="sourceUploadEdit">
          <Button
            className="sourceFormEdit__input"
            fullWidth
            variant="outlined"
            margin="normal"
            component="span"
            style={{ padding: "12px 0px" }}
          >
            File upload
          </Button>
        </label>

        <FormControl margin="normal">
          <FormLabel className="sourceFormEdit__label">Trạng Thái</FormLabel>
          <RadioGroup
            row
            {...register("status")}
            onChange={handleChangeChecked}
          >
            <FormControlLabel
              className="sourceFormEdit__radio"
              value="enabled"
              control={<Radio />}
              label="enabled"
            />
            <FormControlLabel
              className="sourceFormEdit__radio"
              value="disabled"
              control={<Radio />}
              label="disabled"
            />
          </RadioGroup>
        </FormControl>

        {rowData.map((el) => (
          <TextField
            {...register("description")}
            margin="normal"
            variant="outlined"
            fullWidth
            label="Mô tả"
            className="sourceFormEdit__input"
            defaultValue={el.description}
            value={value}
            onChange={handleChangeValue}
          />
        ))}

        <Button
          type="submit"
          fullWidth
          size="large"
          className="posterFormEdit__button"
          disabled={isSubmitting}
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default SourceFormEdit;
