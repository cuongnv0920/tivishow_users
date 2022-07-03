import { Typography } from "@mui/material";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import interestApi from "../../../../api/interestApi";
import "./styles.scss";

TableInterest.propTypes = {};

function TableInterest(props) {
  const [rowData, setRowData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

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
    },
  ];

  useEffect(() => {
    const fetchInterests = async () => {
      const interests = await interestApi.getAll();

      setRowData(
        interests.map((interest, idx) => ({ ...interest, stt: idx + 1 }))
      );
    };
    fetchInterests();
  }, []);

  return (
    <>
      <MaterialTable
        title={
          <div className="headTable">
            <Typography className="headTable__title">
              BẢNG LÃI SUẤT NIÊM YẾT TẠI QUẦY
            </Typography>
          </div>
        }
        columns={columns}
        data={rowData}
        editable={{
          onRowAdd: onRowAdd,
          onRowUpdate: onRowUpdate,
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
          pageSizeOptions: [],
        }}
      />
    </>
  );
}

export default TableInterest;
