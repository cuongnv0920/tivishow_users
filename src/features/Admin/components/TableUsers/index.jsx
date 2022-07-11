import { TextField, Typography } from "@mui/material";
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
  {
    title: "Reset mật khẩu",
    field: "password",
    cellStyle: { whiteSpace: "nowrap" },
    render: () => <div>&#x272E;&#x272E;&#x272E;&#x272E;&#x272E;&#x272E;</div>,
    editComponent: (props) => (
      <input
        type="password"
        size="small"
        className="editComponentPassword"
        variant="filled"
        onChange={(e) => props.onChange(e.target.value)}
      />
    ),
  },
  {
    title: "Trạng thai",
    field: "status",
    cellStyle: { whiteSpace: "nowrap" },
    lookup: { enabled: "enabled", disabled: "disabled" },
    render: (row) => (
      <div style={{ color: row.status === "enabled" ? "#2196f3" : "#f50057" }}>
        {row.status === "enabled" ? "enabled" : "disabled"}
      </div>
    ),
  },
  {
    title: "Quyền truy cập",
    field: "role",
    cellStyle: { whiteSpace: "nowrap" },
    lookup: { user: "user", admin: "admin" },
    render: (row) => (
      <div style={{ color: row.role === "admin" ? "#f50057" : "#2196f3" }}>
        {row.role}
      </div>
    ),
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
    <>
      <div className="headTable">
        <Typography variant="h6" className="headTable__title">
          Danh sách người dùng
        </Typography>
      </div>

      <MaterialTable
        className="table"
        title=""
        columns={columns}
        data={rowData}
        editable={{
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
          rowStyle: {
            fontSize: "0.8rem",
          },

          pageSizeOptions: [],
        }}
      />
    </>
  );
}

export default TableUsers;
