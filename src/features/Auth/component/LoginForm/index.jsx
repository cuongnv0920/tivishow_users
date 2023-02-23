import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, CircularProgress } from "@mui/material";
import { InputField, PasswordField } from "components/inputField";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import * as yup from "yup";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup.object().shape({
    username: yup.string().required("Vui lòng nhập tên đăng nhập."),
    password: yup.string().required("Vui lòng nhập mật khẩu người dùng."),
  });

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
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
    <div className="login">
      <Avatar sx={{ margin: "0 auto", backgroundColor: "#f50057" }}>
        <LockOpenIcon />
      </Avatar>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="username" label="Tên đăng nhập" form={form} />
        <PasswordField name="password" label="Mật khẩu" form={form} />

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress className="login__progress" color="secondary" />
          ) : (
            "Đăng nhập"
          )}
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
