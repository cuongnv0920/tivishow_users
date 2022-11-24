import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, LinearProgress, TextField, Typography } from "@mui/material";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import interestApi from "../../../../api/interestApi";
import "./styles.scss";

TableInterest.propTypes = {};

function TableInterest(props) {
  const [rowData, setRowData] = useState([]);
  const [value, setValue] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      await interestApi.updateValid(data);

      enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleChange = (newDate) => {
    setValue(newDate);
  };

  const onRowAdd = async (newRow) => {
    try {
      await interestApi.create(newRow);
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

      await interestApi.update(newRow);
      setRowData([...rowUpdate]);
      enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const columns = [
    {
      title: "STT",
      field: "stt",
      editable: "never",
    },

    {
      title: "Kỳ hạn",
      field: "term",
      cellStyle: { whiteSpace: "nowrap" },
      validate: (row) => {
        if (row.term === undefined || row.term === "") {
          return "Vui lòng nhập kỳ hạn.";
        }
        return true;
      },
    },

    {
      title: "USD (%)",
      field: "usd",
      cellStyle: { whiteSpace: "nowrap" },
    },

    {
      title: "VND (%)",
      field: "vnd",
      cellStyle: { whiteSpace: "nowrap" },
      validate: (row) => {
        if (row.vnd === undefined || row.vnd === "") {
          return "Vui lòng nhập lãi suất VND.";
        }
        return true;
      },
    },

    {
      title: "Trạng thai",
      field: "status",
      cellStyle: { whiteSpace: "nowrap" },
      lookup: { enabled: "enabled", disabled: "disabled" },
      render: (row) => (
        <div
          style={{ color: row.status === "enabled" ? "#2196f3" : "#f50057" }}
        >
          {row.status === "enabled" ? "enabled" : "disabled"}
        </div>
      ),

      validate: (row) => {
        if (row.status === undefined || row.status === "") {
          return "Vui lòng chọn trạng thái.";
        }
        return true;
      },
    },
  ];

  useEffect(() => {
    const fetchInterests = async () => {
      const interests = await interestApi.getAllAdmin();

      setRowData(
        interests.map((interest, idx) => ({ ...interest, stt: idx + 1 }))
      );
    };
    fetchInterests();
  }, []);

  return (
    <>
      <div className="headTableInterest">
        <Typography variant="h6" className="headTableInterest__title">
          Bảng lãi suất tiền gửi
        </Typography>

        <form
          className="headTableInterest__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isSubmitting && (
            <LinearProgress className="headTableInterest__progress" />
          )}

          <TextField
            id="date"
            variant="outlined"
            size="small"
            label="Ngày hiệu lực"
            defaultValue={value}
            onChange={handleChange}
            {...register("valid")}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button className="headTableInterest__button" type="submit">
            Lưu
          </Button>
        </form>
      </div>

      <MaterialTable
        title=""
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

export default TableInterest;
