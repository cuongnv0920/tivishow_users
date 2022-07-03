import { yupResolver } from "@hookform/resolvers/yup";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Button, LinearProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import PasswordField from "../../../../components/PasswordField";
import "./styles.scss";

SettingForm.propTypes = {
  onSubmit: PropTypes.func,
};

function SettingForm(props) {
  const schema = yup.object().shape({
    oldPassword: yup.string().required("Vui lòng nhập mật khẩu cũ."),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu mới.")
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự."),
    retypePassword: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu.")
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không đúng."),
  });

  const form = useForm({
    defaultValues: {
      id: "",
      oldPassword: "",
      password: "",
      retypePassword: "",
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
    <div className="setting">
      {isSubmitting && <LinearProgress className="setting__progress" />}

      <Avatar className="setting__avatar">
        <SettingsIcon />
      </Avatar>
      <Typography className="setting__title" component="h3" variant="h5">
        Đổi mật khẩu
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <PasswordField
          className="setting__input"
          name="oldPassword"
          label="Mật khẩu cũ"
          form={form}
        />

        <PasswordField
          className="setting__input"
          name="password"
          label="Mật khẩu mới"
          form={form}
        />
        <PasswordField
          className="setting__input"
          name="retypePassword"
          label="Xác nhận lại mật khẩu"
          form={form}
        />

        <Button
          type="submit"
          className="setting__button"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Lưu
        </Button>
      </form>
    </div>
  );
}

export default SettingForm;
