import { Button, CircularProgress, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "./styles.scss";

DeleteForm.propTypes = {
  onSubmit: PropTypes.func,
};

function DeleteForm(props) {
  const selected = useSelector((state) => state.poster);

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
    <div className="deletePoster">
      <div className="deletePoster__title dialogTitle">
        <Typography className="dialogTitle_content">Xóa poster</Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="deletePoster__content">
          <p>{`Bạn có chắc chắn muốn xóa poster: "${selected?.description}"`}</p>
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
            <CircularProgress className="deletePoster__progress" />
          ) : (
            "Xóa"
          )}
        </Button>
      </form>
    </div>
  );
}

export default DeleteForm;
