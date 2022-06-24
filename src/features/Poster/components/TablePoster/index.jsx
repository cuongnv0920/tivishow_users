import { Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useState } from "react";
import posterApi from "../../../../api/posterApi";

TablePoster.propTypes = {};

const columns = [
  {
    title: "STT",
    field: "stt",
    editable: "never",
  },

  {
    title: "Poster",
    field: "image",
    render: (row) => <img src={row.img} alt="poster" />,
    editComponent: () => {
      return <input type="file" name="image" multiple />;
    },
  },

  {
    title: "Mô tả",
    field: "description",
  },
];

function TablePoster(props) {
  const [rowData, setRowData] = useState([]);

  const { enqueueSnackbar } = useSnackbar;

  const onRowAdd = async (newRow) => {
    try {
      await posterApi.create(newRow);

      setRowData([...rowData, newRow]);

      enqueueSnackbar("Thêm mới thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <>
      <MaterialTable
        title={
          <div className="headTable">
            <Typography className="headTable__title">
              DANH SÁCH POSTER QUẢNG CÁO
            </Typography>
          </div>
        }
        columns={columns}
        data={rowData}
        editable={{
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

export default TablePoster;
