import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import { DateField } from "components/inputField";
import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

EffectForm.propTypes = {
  onSubmit: PropTypes.func,
};

function EffectForm(props) {
  const [effect, setEffect] = useState(new Date());
  const schema = yup.object().shape({
    effect: yup
      .string()
      .required("Vui lòng chọn ngày hiệu lực của bảng lãi suất."),
  });

  const form = useForm({
    defaultValues: {
      effect: effect,
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleEffectChange = (date) => {
    setEffect(date);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="editEffect">
      <div className="editEffect__title dialogTitle">
        <Typography className="dialogTitle_content">
          Ngày hiệu lực bảng lãi suất tiền gửi
        </Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <DateField
          name="effect"
          format="dd/MM/yyyy"
          lable="Ngày hiệu lực"
          value={effect}
          onChange={handleEffectChange}
          form={form}
        />

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
            "Cập nhật"
          )}
        </Button>
      </form>
    </div>
  );
}

export default EffectForm;
