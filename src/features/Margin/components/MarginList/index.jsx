import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import { marginApi } from "api";
import { removeSelected, selected } from "features/Margin/marginSlice";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import Create from "../Create";
import Edit from "../Edit";

MarginList.propTypes = {};

const columns = [
  {
    title: "STT",
    field: "stt",
    editable: "never",
  },
  {
    title: "Mã ngoại tệ",
    field: "currency",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Mua tiền mặt (-)",
    field: "buyCash",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Mua chuyển khoản (-)",
    field: "buyTransfer",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Bán (+)",
    field: "selling",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Số sắp xếp",
    field: "sort",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Trạng thái",
    field: "status",
    cellStyle: { whiteSpace: "nowrap" },
    render: (row) => (
      <div style={{ color: row.status === true ? "#4caf50" : "#f50057" }}>
        {row.status === true ? "Enabled" : "Disabled"}
      </div>
    ),
  },
  {
    title: "Ngày khởi tạo",
    field: "createdAt",
    render: (row) => <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>,
    cellStyle: { whiteSpace: "nowrap" },
  },
];

function MarginList(props) {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [onSelected, setOnSelected] = useState();
  const [rowData, setRowData] = useState([]);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleCloseDialogCreate = () => {
    setOpenDialogCreate(false);
  };

  const handleOpenDialogCreate = () => {
    setOpenDialogCreate(true);
  };

  const handleCloseDialogEdit = async () => {
    const action = removeSelected();
    await dispatch(action);

    setOpenDialogEdit(false);
  };
  const onRowUpdate = async () => {
    if (onSelected?.length >= 2) {
      enqueueSnackbar("Bạn chỉ được chọn 1 dòng.", { variant: "warning" });
    } else {
      const action = selected(onSelected[0]);
      await dispatch(action);

      setOpenDialogEdit(true);
    }
  };

  useEffect(() => {
    const fetchMargins = async () => {
      const margins = await marginApi.getAll();
      setRowData(
        margins.map((margin, index) => ({ ...margin, stt: index + 1 }))
      );
    };
    fetchMargins();
  }, [openDialogCreate, openDialogEdit]);

  return (
    <>
      <MaterialTable
        title={
          <div className="materialTableTitle">
            <Typography className="materialTableTitle_content" variant="h6">
              Biên độ tỷ giá ngoại tệ
            </Typography>
          </div>
        }
        columns={columns}
        data={rowData}
        onSelectionChange={(row) => setOnSelected(row)}
        actions={[
          {
            icon: () => <AddCircleIcon className="materialTableIconAdd" />,
            tooltip: "Thêm biên độ tỷ giá",
            isFreeAction: true,
            onClick: handleOpenDialogCreate,
          },
          {
            icon: () => <EditIcon className="materialTableIconEdit" />,
            tooltip: "Sửa biên độ tỷ giá",
            onClick: onRowUpdate,
          },
        ]}
        options={{
          tableLayout: "auto",
          headerStyle: {
            fontSize: "0.8rem",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            color: "#1c2e36",
            fontFamily: "'Muli', sans-serif",
          },

          rowStyle: {
            fontSize: "0.8rem",
          },
          selection: true,
          pageSizeOptions: [10, 20, 30, 50],
          pageSize: 10,
          paging: true,
          addRowPosition: "first",
          showSelectAllCheckbox: false,
          maxBodyHeight: 580,
        }}
      />

      <Dialog
        maxWidth="xs"
        fullWidth="xs"
        open={openDialogCreate}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogCreate(event, reason);
          }
        }}
      >
        <DialogContent>
          <Create closeDialog={handleCloseDialogCreate} />
        </DialogContent>

        <DialogActions className="dialogAction">
          <Button
            className="dialogButtonCancel"
            onClick={handleCloseDialogCreate}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="xs"
        fullWidth="xs"
        open={openDialogEdit}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogEdit(event, reason);
          }
        }}
      >
        <DialogContent>
          <Edit closeDialog={handleCloseDialogEdit} />
        </DialogContent>

        <DialogActions className="dialogAction">
          <Button
            className="dialogButtonCancel"
            onClick={handleCloseDialogEdit}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MarginList;
