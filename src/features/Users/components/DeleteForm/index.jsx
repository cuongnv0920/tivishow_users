import { Button, LinearProgress, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./styles.scss";

DeleteForm.propTypes = {
  onSubmit: PropTypes.func,
};

function DeleteForm(props) {
  const selected = useSelector((state) => state.user);

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
    <div className="deleteUser">
      {isSubmitting && <LinearProgress className="deleteUser__progress" />}

      <div className="deleteUser__title dialogTitle">
        <Typography className="dialogTitle_content">Xóa người dùng</Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="deleteUser__content">
          <p>{`Bạn có chắc chắn muốn xóa Người dùng: "${selected.email}"`}</p>
        </div>

        <Button
          className="dialogButtonDelete"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Xóa
        </Button>
      </form>
    </div>
  );
}

export default DeleteForm;
