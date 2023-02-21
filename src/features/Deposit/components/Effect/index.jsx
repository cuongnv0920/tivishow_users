import { unwrapResult } from "@reduxjs/toolkit";
import { effect } from "features/Deposit/depositSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import EffectForm from "../EffectForm";

Effect.propTypes = {
  closeDialog: PropTypes.func,
};

function Effect(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      const action = effect(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const { closeDialog } = props; // close dialog
      if (closeDialog) {
        closeDialog();
      }
      enqueueSnackbar("Cập nhật thành công.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <EffectForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Effect;
