import { Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import URL from "../../../../configs/api.conf";
import amplitudeApi from "../../../../api/amplitudeApi";
import "./styles.scss";

TableAmplitude.propTypes = {};

function TableAmplitude(props) {
  const [rowData, setRowData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const onRowAdd = async (newRow) => {
    try {
      await amplitudeApi.create(newRow);
      setRowData([...rowData, newRow]);

      enqueueSnackbar("Thêm mới thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const onRowUpdate = async (newRow, oldRow) => {
    try {
      const rowUpdate = [...rowData];
      const idx = oldRow.tableData.id;
      rowUpdate[idx] = newRow;

      await amplitudeApi.update(newRow);
      setRowData([...rowUpdate]);
      enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  useEffect(() => {
    const fetchAmplitudes = async () => {
      const amplitudes = await amplitudeApi.getAll();
      setRowData(
        amplitudes.map((amplitude, idx) => ({ ...amplitude, stt: idx + 1 }))
      );
    };
    fetchAmplitudes();
  }, []);

  const options = [
    { title: "Chọn mã...", value: "" },
    { title: "USD", value: "USD" },
    { title: "USD(10-20)", value: "USD(10-20)" },
    { title: "USD(1-2-5)", value: "USD(1-2-5)" },
    { title: "EUR", value: "EUR" },
    { title: "GBP", value: "GBP" },
    { title: "HKD", value: "HKD" },
    { title: "CHF", value: "CHF" },
    { title: "JPY", value: "JPY" },
    { title: "THB", value: "THB" },
    { title: "AUD", value: "AUD" },
    { title: "SGD", value: "SGD" },
    { title: "SEK", value: "SEK" },
    { title: "LAK", value: "LAK" },
    { title: "DKK", value: "DKK" },
    { title: "NOK", value: "NOK" },
    { title: "CNY", value: "CNY" },
    { title: "RUB", value: "RUB" },
    { title: "NZD", value: "NZD" },
    { title: "KRW", value: "KRW" },
  ];

  const menus = options.filter((option) =>
    rowData.every((row) => !row.currency.includes(option.title))
  );

  const columns = [
    {
      title: "STT",
      field: "stt",
      editable: "never",
    },

    {
      title: "Quốc kỳ",
      field: "image",
      editable: "never",
      render: (row) => (
        <img
          src={URL.apiUrl + "/" + row.image}
          alt="ensign"
          className="ensign"
        />
      ),
    },

    {
      title: "Mã ngoại tệ",
      field: "currency",
      cellStyle: { whiteSpace: "nowrap" },
      editComponent: (props) => (
        <FormControl fullWidth variant="standard" className="selectCurrency">
          <NativeSelect
            className="selectCurrency__native"
            defaultValue=""
            labelId="currency"
            onChange={(e) => props.onChange(e.target.value)}
          >
            {menus.map((menu, idx) => (
              <option
                value={menu.value}
                key={idx}
                className="selectCurrency__option"
              >
                {menu.title}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      ),
      validate: (row) => {
        if (row.currency === undefined || row.currency === "") {
          return "Vui lòng chọn mã ngoại tệ.";
        }
        return true;
      },
    },

    {
      title: "Mua tiền mặt (-)",
      field: "buyCash",
      cellStyle: { whiteSpace: "nowrap" },
      validate: (row) => {
        if (row.buyCash === undefined || row.buyCash === "") {
          return "Vui lòng nhập Biên độ mua tiền mặt.";
        }
        return true;
      },
    },

    {
      title: "Mua chuyển khoản (-)",
      field: "buyTransfer",
      cellStyle: { whiteSpace: "nowrap" },
      validate: (row) => {
        if (row.buyTransfer === undefined || row.buyTransfer === "") {
          return "Vui lòng nhập Biên độ mua chuyển khoản.";
        }
        return true;
      },
    },

    {
      title: "Bán (+)",
      field: "selling",
      cellStyle: { whiteSpace: "nowrap" },
      validate: (row) => {
        if (row.selling === undefined || row.selling === "") {
          return "Vui lòng nhập Biên độ Bán.";
        }
        return true;
      },
    },
  ];

  return (
    <>
      <MaterialTable
        title={
          <div className="headTable">
            <Typography className="headTable__title">
              BẢNG ĐIỀU CHỈNH BIÊN ĐỘ
            </Typography>
          </div>
        }
        columns={columns}
        data={rowData}
        editable={{
          onRowAdd: onRowAdd,
          onRowUpdate: onRowUpdate,
        }}
        icons={{
          Add: () => <AddCircleIcon sx={{ color: "#daa520" }} />,
        }}
        options={{
          tableLayout: "auto",
          actionsColumnIndex: -1,
          headerStyle: {
            fontSize: "1rem",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            color: "#1c2e36",
            fontFamily: "'Muli', sans-serif",
          },
          searchFieldStyle: {
            marginRight: "35px",
          },

          rowStyle: {
            fontSize: "0.8rem",
          },
          pageSizeOptions: [10, 20, 30, 50],
          pageSize: 10,
          paging: true,
          addRowPosition: "first",
        }}
      />
    </>
  );
}

export default TableAmplitude;
