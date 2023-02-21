import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Typography } from "@mui/material";
import { InputField, UploadField } from "components/inputField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

CreateForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CreateForm(props) {
  const schema = yup.object().shape({
    upload: yup.mixed().required("Vui lòng chọn tệp tin video cần tải lên."),
  });

  const form = useForm({
    defaultValues: {
      description: "",
      upload: "",
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="createFilm">
      <div className="createFilm__title dialogTitle">
        <Typography className="dialogTitle_content">Thêm video</Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="description" label="Mô tả" form={form} />
        <UploadField name="upload" label="Chọn tệp tin video" form={form} />
        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress className="createFilm__progress" />
          ) : (
            "Lưu"
          )}
        </Button>
      </form>
    </div>
  );
}

export default CreateForm;
