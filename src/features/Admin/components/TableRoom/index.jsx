import { Typography } from "@mui/material";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import roomApi from "../../../../api/roomApi";

TableRooms.propTypes = {};

const columns = [
  {
    title: "STT",
    field: "stt",
    editable: "never",
  },
  {
    title: "Mã Phòng",
    field: "code",
    cellStyle: { whiteSpace: "nowrap" },
    validate: (row) => row.code !== "",
  },
  {
    title: "Tên Phòng",
    field: "name",
    cellStyle: { whiteSpace: "nowrap" },
    validate: (row) => row.name !== "",
  },
];

function TableRooms(props) {
  const [rowData, setRowData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const onRowAdd = async (newRow) => {
    try {
      await roomApi.create(newRow);

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

      await roomApi.update(newRow);
      setRowData([...rowUpdate]);

      enqueueSnackbar("Cập nhật thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await roomApi.getAll();

      setRowData(rooms.map((room, idx) => ({ ...room, stt: idx + 1 })));
    };
    fetchRooms();
  }, []);

  return (
    <>
      <div className="headTable">
        <Typography variant="h6" className="headTable__title">
          Danh sách phòng/ ban
        </Typography>
      </div>

      <MaterialTable
        className="table"
        title=""
        columns={columns}
        data={rowData}
        editable={{
          onRowUpdate: onRowUpdate,
          onRowAdd: onRowAdd,
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

export default TableRooms;
