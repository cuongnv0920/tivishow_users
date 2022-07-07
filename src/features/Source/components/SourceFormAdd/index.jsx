import {
  Avatar,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import "./styles.scss";

SourceFormAdd.propTypes = {
  onSubmit: PropTypes.func,
};

function SourceFormAdd(props) {
  const { register, handleSubmit, formState } = useForm();

  const { isSubmitting } = formState;

  const onSubmit = async (form) => {
    const { onSubmit } = props;

    const formData = new FormData();
    formData.append("source", form.source[0]);
    formData.append("description", form.description);

    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  return (
    <div className="sourceForm">
      {isSubmitting && <LinearProgress className="sourceForm__progress" />}

      <Avatar className="sourceForm__avatar">
        <AddCircleIcon />
      </Avatar>

      <Typography component="h3" variant="h5" className="sourceForm__title">
        Thêm Video
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="sourceUploadAdd"
          {...register("source")}
          type="file"
          style={{ display: "none" }}
        />

        <label htmlFor="sourceUploadAdd">
          <Button
            className="sourceForm__input"
            fullWidth
            variant="outlined"
            margin="normal"
            component="span"
            style={{ padding: "12px 0px" }}
          >
            File upload
          </Button>
        </label>

        <TextField
          {...register("description")}
          margin="normal"
          variant="outlined"
          fullWidth
          label="Mô tả"
          className="sourceForm__input"
        />

        <Button
          type="submit"
          fullWidth
          size="large"
          className="sourceForm__button"
          disabled={isSubmitting}
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default SourceFormAdd;
