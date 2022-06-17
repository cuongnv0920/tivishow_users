import React from "react";
import { Typography } from "@mui/material";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import userApi from "../../../../api/userApi";
import "./styles.scss";

TableUsers.propTypes = {};

const columns = [
  {
    title: "STT",
    field: "stt",
    editable: "never",
  },
  {
    title: "Tên đăng nhập",
    field: "username",
    cellStyle: { whiteSpace: "nowrap" },
    editable: "never",
  },
  {
    title: "Email",
    field: "email",
    cellStyle: { whiteSpace: "nowrap" },
    editable: "never",
  },
  { title: "Phòng/ Ban", field: "room", cellStyle: { whiteSpace: "nowrap" } },
  {
    title: "Trạng thai",
    field: "status",
    cellStyle: { whiteSpace: "nowrap" },
    lookup: { 0: "disabled", 1: "enabled" },
  },
  {
    title: "Quyền truy cập",
    field: "role",
    cellStyle: { whiteSpace: "nowrap" },
    lookup: { user: "user", admin: "admin" },
  },
];

function TableUsers(props) {
  const [rowData, setRowData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const onRowUpdate = async (newRow, oldRow) => {
    try {
      const rowUpdate = [...rowData];
      const idx = oldRow.tableData.id;
      rowUpdate[idx] = newRow;

      await userApi.update(newRow);
      setRowData([...rowUpdate]);

      enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userApi.getAll();

      setRowData(users.map((user, idx) => ({ ...user, stt: idx + 1 })));
    };
    fetchUsers();
  }, []);
  return (
    <div className="root">
      <MaterialTable
        className="table"
        title={
          <Typography variant="h5" className="table__title">
            Danh sách user
          </Typography>
        }
        columns={columns}
        data={rowData}
        editable={{
          onRowUpdate: onRowUpdate,
        }}
        options={{
          tableLayout: "auto",
          actionsColumnIndex: -1,
          headerStyle: {
            fontSize: "15px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            color: "#1c2e36",
          },
        }}
      />
    </div>
  );
}

export default TableUsers;
