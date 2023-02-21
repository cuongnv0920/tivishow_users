import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Radio,
  Typography,
} from "@mui/material";
import { InputField, RadioField, SelectField } from "components/inputField";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

EditForm.propTypes = {
  onSubmit: PropTypes.func,
};

const currencys = [
  "USD",
  "USD(10-20)",
  "USD(1-2-5)",
  "EUR",
  "GBP",
  "HKD",
  "CHF",
  "JPY",
  "THB",
  "AUD",
  "CAD",
  "SGD",
  "SEK",
  "LAK",
  "DKK",
  "NOK",
  "CNY",
  "RUB",
  "NZD",
  "KRW",
];

function EditForm(props) {
  const selected = useSelector((state) => state.margin);
  const [status, setStatus] = useState(selected.status);

  const schema = yup.object().shape({
    currency: yup.string().required("Vui lòng chọn mã ngoại tệ."),
    buyCash: yup.string().required("Vui lòng nhập biên độ mua tiền mặt."),
    buyTransfer: yup
      .string()
      .required("Vui lòng nhập biên độ mua chuyển khoản."),
    selling: yup.string().required("Vui lòng nhập biên độ giá bán."),
    sort: yup.string().required("Vui lòng nhập Số sắp xếp."),
  });

  const form = useForm({
    defaultValues: {
      currency: selected.currency,
      buyCash: selected.buyCash,
      buyTransfer: selected.buyTransfer,
      selling: selected.selling,
      status: status,
      sort: selected.sort,
      id: selected.id,
    },

    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className="editMargin">
      <div className="editMargin__title dialogTitle">
        <Typography className="dialogTitle_content">
          Sửa biên độ tỷ giá
        </Typography>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <SelectField name="currency" label="Mã ngoại thệ" form={form}>
          {currencys.map((currency, _) => (
            <MenuItem value={currency}>{currency}</MenuItem>
          ))}
        </SelectField>
        <InputField
          name="buyCash"
          type="number"
          label="Mua tiền mặt (-)"
          form={form}
        />
        <InputField
          name="buyTransfer"
          type="number"
          label="Mua chuyển khoản (-)"
          form={form}
        />
        <InputField name="selling" type="number" label="Bán (+)" form={form} />
        <InputField name="sort" type="number" label="Số sắp xếp" form={form} />
        <div style={{ marginTop: "16px" }}>
          <RadioField
            name="status"
            label="Trạng thái"
            form={form}
            onChange={handleChangeStatus}
            value={status}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Enabled"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Disabled"
            />
          </RadioField>
        </div>

        <Button
          className="dialogButtonSave"
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress className="editMargin__progress" />
          ) : (
            "Lưu"
          )}
        </Button>
      </form>
    </div>
  );
}

export default EditForm;
