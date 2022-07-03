import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { setting } from "../../userSlice";
import SettingForm from "../SettingForm";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

Setting.propTypes = {
  closeDialog: PropTypes.func,
};

function Setting(props) {
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) => state.user.current);
  const userId = loggedInUser._id;

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const data = values;
      data.id = userId;

      const action = setting(data);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      // close dialog
      const { closeDialog } = props;
      if (closeDialog) {
        closeDialog();
      }

      enqueueSnackbar("Đổi mật khẩu thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <SettingForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Setting;
