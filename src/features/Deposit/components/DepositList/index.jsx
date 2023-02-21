import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpdateIcon from "@material-ui/icons/Update";
import { depositApi } from "api";
import { removeSelected, selected } from "features/Deposit/depositSlice";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import Create from "../Create";
import Delete from "../Delete";
import Edit from "../Edit";
import Effect from "../Effect";

DepositList.propTypes = {};

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
  },
  {
    title: "VND",
    field: "vnd",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "USD",
    field: "usd",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Online",
    field: "online",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Số sắp xếp",
    field: "sort",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Ngày khởi tạo",
    field: "createdAt",
    render: (row) => <Moment format="DD/MM/YYYY">{row.createdAt}</Moment>,
    cellStyle: { whiteSpace: "nowrap" },
  },
];

function DepositList(props) {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogEffect, setOpenDialogEffect] = useState(false);
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

  const handleOpenDialogEffect = () => {
    setOpenDialogEffect(true);
  };

  const handleCloseDialogEffect = () => {
    setOpenDialogEffect(false);
  };

  const handleCloseDialogEdit = async () => {
    const action = removeSelected();
    await dispatch(action);

    setOpenDialogEdit(false);
  };

  const handleCloseDialogDelete = async () => {
    const action = removeSelected();
    await dispatch(action);

    setOpenDialogDelete(false);
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

  const onRowDelete = async () => {
    if (onSelected?.length >= 2) {
      enqueueSnackbar("Bạn chỉ được chọn 1 dòng.", { variant: "warning" });
    } else {
      const action = selected(onSelected[0]);
      await dispatch(action);
      setOpenDialogDelete(true);
    }
  };

  useEffect(() => {
    const fetchDeposits = async () => {
      const { deposits } = await depositApi.getAll({ _limit: 0 });

      setRowData(
        deposits.map((deposit, index) => ({ ...deposit, stt: index + 1 }))
      );
    };
    fetchDeposits();
  }, [openDialogCreate, openDialogEdit, openDialogDelete]);

  return (
    <>
      <MaterialTable
        title={
          <div className="materialTableTitle">
            <Typography className="materialTableTitle_content" variant="h6">
              Bảng lãi suất tiền gửi
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
            icon: () => <UpdateIcon className="materialTableIconUpdate" />,
            tooltip: "Cập nhật ngày hiệu lực",
            isFreeAction: true,
            onClick: handleOpenDialogEffect,
          },
          {
            icon: () => <DeleteIcon className="materialTableIconDelete" />,
            tooltip: "Xóa biên độ tỷ giá",
            onClick: onRowDelete,
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
        maxWidth="sm"
        fullWidth="sm"
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
        maxWidth="sm"
        fullWidth="sm"
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

      <Dialog
        maxWidth="sm"
        open={openDialogDelete}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogDelete(event, reason);
          }
        }}
      >
        <DialogContent>
          <Delete closeDialog={handleCloseDialogDelete} />
        </DialogContent>

        <DialogActions className="dialogAction">
          <Button
            className="dialogButtonCancel"
            onClick={handleCloseDialogDelete}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth="xs"
        maxWidth="xs"
        open={openDialogEffect}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogEffect(event, reason);
          }
        }}
      >
        <DialogContent>
          <Effect closeDialog={handleCloseDialogEffect} />
        </DialogContent>

        <DialogActions className="dialogAction">
          <Button
            className="dialogButtonCancel"
            onClick={handleCloseDialogEffect}
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DepositList;
