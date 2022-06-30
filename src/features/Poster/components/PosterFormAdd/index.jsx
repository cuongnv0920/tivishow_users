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

PosterFormAdd.propTypes = {
  onSubmit: PropTypes.func,
};

function PosterFormAdd(props) {
  const { register, handleSubmit, formState } = useForm();

  const { isSubmitting } = formState;

  const onSubmit = async (form) => {
    const { onSubmit } = props;

    const formData = new FormData();
    formData.append("image", form.image[0]);
    formData.append("description", form.description);

    if (onSubmit) {
      await onSubmit(formData);
    }
  };

  return (
    <div className="posterForm">
      {isSubmitting && <LinearProgress className="posterForm__progress" />}

      <Avatar className="posterForm__avatar">
        <AddCircleIcon />
      </Avatar>

      <Typography component="h3" variant="h5" className="posterForm__title">
        Thêm Poster
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id="posterUploadAdd"
          {...register("image")}
          type="file"
          style={{ display: "none" }}
        />

        <label htmlFor="posterUploadAdd">
          <Button
            className="posterForm__input"
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
          name="description"
          margin="normal"
          variant="outlined"
          fullWidth
          label="Mô tả"
          className="posterForm__input"
        />

        <Button
          type="submit"
          fullWidth
          size="large"
          className="posterForm__button"
          disabled={isSubmitting}
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default PosterFormAdd;
