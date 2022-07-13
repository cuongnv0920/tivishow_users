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
    <div className="posterFormAdd">
      {isSubmitting && <LinearProgress className="posterFormAdd__progress" />}

      <Avatar className="posterFormAdd__avatar">
        <AddCircleIcon />
      </Avatar>

      <Typography component="h3" variant="h5" className="posterFormAdd__title">
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
            className="posterFormAdd__input"
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
          name="description"
          margin="normal"
          variant="outlined"
          fullWidth
          label="Mô tả"
          className="posterFormAdd__input"
        />

        <Button
          type="submit"
          fullWidth
          size="large"
          className="posterFormAdd__button"
          disabled={isSubmitting}
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default PosterFormAdd;
