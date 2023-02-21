import { Button, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./styles.scss";

DeleteForm.propTypes = {
  onSubmit: PropTypes.func,
};

function DeleteForm(props) {
  const selected = useSelector((state) => state.deposit);

  const form = useForm({
    defaultValues: {
      id: selected.id,
    },
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="deleteDeposit">
      <div className="deleteDeposit__title dialogTitle">
        <Typography className="dialogTitle_content">
          Xóa Kỳ hạn lãi suất tiền gửi
        </Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="deleteDeposit__content">
          <p>{`Bạn có chắc chắn muốn xóa Kỳ hạn lãi suất: "${selected.term}"`}</p>
        </div>

        <Button
          className="dialogButtonDelete"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress className="deleteDeposit__progress" />
          ) : (
            "Xóa"
          )}
        </Button>
      </form>
    </div>
  );
}

export default DeleteForm;
