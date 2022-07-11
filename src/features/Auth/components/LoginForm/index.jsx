import { yupResolver } from "@hookform/resolvers/yup";
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import PasswordField from "../../../../components/PasswordField";
import "./styles.scss";

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup.object().shape({
    username: yup.string().required("Vui lòng điền tên đăng nhập."),
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
      {isSubmitting && <LinearProgress className="login__progress" />}

      <Avatar className="login__avatar">
        <LockOutlined />
      </Avatar>
      <Typography className="login__title" component="h3" variant="h5">
        Đăng nhập
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="username" label="Tên đăng nhập/ email" form={form} />
        <PasswordField name="password" label="Mật khẩu" form={form} />
        <Button
          type="submit"
          className="login__button"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
