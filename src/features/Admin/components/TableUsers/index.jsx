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
  // { title: "Phòng/ Ban", field: "room", cellStyle: { whiteSpace: "nowrap" } },
  {
    title: "Trạng thai",
    field: "status",
    cellStyle: { whiteSpace: "nowrap" },
    lookup: { true: "enabled", false: "disabled" },
    render: (row) => (
      <div className={row.status ? "enabled" : "disabled"}>
        {row.status ? "enabled" : "disabled"}
      </div>
    ),
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

  const onRowUpdate = (newRow, oldRow) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const rowUpdate = [...rowData];
          const idx = oldRow.tableData.id;
          rowUpdate[idx] = newRow;

          userApi.update(newRow);
          setRowData([...rowUpdate]);

          enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
          resolve();
        } catch (error) {
          enqueueSnackbar(error.message, { variant: "error" });
        }
      }, 1000);
    });

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

          pageSizeOptions: false,
        }}
      />
    </>
  );
}

export default TableUsers;
