import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { InputField, RadioField, UploadField } from "components/inputField";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

EditForm.propTypes = {
  onSubmit: PropTypes.func,
};

function EditForm(props) {
  const selected = useSelector((state) => state.poster);
  const [status, setStatus] = useState(selected.status);

  const schema = yup.object().shape({});

  const form = useForm({
    defaultValues: {
      id: selected.id,
      description: selected.description,
      status: status,
    },

    resolver: yupResolver(schema),
  });

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="editPoster">
      <div className="editPoster__title dialogTitle">
        <Typography className="dialogTitle_content">Sửa poster</Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="description" label="Mô tả" form={form} />
        <UploadField name="upload" label="Chọn tệp tin ảnh" form={form} />
        <RadioField
          name="status"
          label="Trạng thái"
          onChange={handleChangeStatus}
          value={status}
          form={form}
        >
          <FormControlLabel value={true} label="Enabled" control={<Radio />} />
          <FormControlLabel
            value={false}
            label="Disabled"
            control={<Radio />}
          />
        </RadioField>

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress className="editPoster__progress" />
          ) : (
            "Lưu"
          )}
        </Button>
      </form>
    </div>
  );
}

export default EditForm;
