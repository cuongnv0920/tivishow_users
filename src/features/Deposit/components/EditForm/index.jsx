import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Typography } from "@mui/material";
import { InputField } from "components/inputField";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

EditForm.propTypes = {
  onSubmit: PropTypes.func,
};

function EditForm(props) {
  const selected = useSelector((state) => state.deposit);

  const schema = yup.object().shape({
    term: yup.string().required("Vui lòng nhập Kỳ hạn lãi suất."),
    vnd: yup.string().required("Vui lòng nhập Lãi suất VND."),
    usd: yup.string().required("Vui lòng nhập Lãi suất USD."),
    online: yup.string().required("Vui lòng nhập Lãi suất Online."),
    sort: yup.string().required("Vui lòng nhập Số sắp xếp."),
  });

  const form = useForm({
    defaultValues: {
      term: selected.term,
      vnd: selected.vnd,
      usd: selected.usd,
      online: selected.online,
      sort: selected.sort,
      id: selected.id,
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
    <div className="editdeposit">
      <div className="editdeposit__title dialogTitle">
        <Typography className="dialogTitle_content">
          Sửa Kỳ hạn lãi suất tiền gửi
        </Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="term" label="Kỳ hạn lãi suất" form={form} />
        <InputField name="vnd" type="number" label="VND" form={form} />
        <InputField name="usd" type="number" label="USD" form={form} />
        <InputField name="online" type="number" label="Online" form={form} />
        <InputField name="sort" type="number" label="Số sắp xếp" form={form} />

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress className="editdeposit__progress" />
          ) : (
            "Lưu"
          )}
        </Button>
      </form>
    </div>
  );
}

export default EditForm;
