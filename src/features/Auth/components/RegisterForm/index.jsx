import { yupResolver } from "@hookform/resolvers/yup";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  LinearProgress,
  MenuItem,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/InputField";
import PasswordField from "../../../../components/PasswordField";
import roomApi from "../../../../api/roomApi";
import "./styles.scss";
import SelectField from "../../../../components/SelectField";

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const [roomData, setRoomDate] = useState([]);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập địa chỉ email.")
      .email("Địa chỉ email không hợp lệ."),
    room: yup.string().required("Vui lòng chọn Phòng/ Ban."),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu người dùng.")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
    retypePassword: yup
      .string()
      .required("Vui lòng xác nhận lại mật khẩu.")
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không đúng."),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      room: "",
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

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await roomApi.getAll();

      setRoomDate(rooms);
    };
    fetchRooms();
  }, []);

  return (
    <div className="register">
      {isSubmitting && <LinearProgress className="register__progress" />}

      <Avatar className="register__avatar">
        <LockOutlined />
      </Avatar>
      <Typography className="register__title" component="h3" variant="h5">
        Đăng ký
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="email" label="Địa chỉ email" form={form} />

        <SelectField name="room" value="room" label="Chọn Phòng" form={form}>
          {roomData.map((option) => (
            <MenuItem value={option.code} key={option.code}>
              {option.name}
            </MenuItem>
          ))}
        </SelectField>

        <PasswordField name="password" label="Mật khẩu" form={form} />
        <PasswordField
          name="retypePassword"
          label="Xác nhận mật khẩu"
          form={form}
        />

        <Button
          type="submit"
          className="register__button"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
