import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { filmApi } from "api";
import api from "configs/api.conf";
import { removeSelected, selected } from "features/Film/filmSlice";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import Create from "../Create";
import Delete from "../Delete";
import Edit from "../Edit";

FilmList.propTypes = {};

const columns = [
  {
    title: "STT",
    field: "stt",
    editable: "never",
  },
  {
    title: "Mô tả",
    field: "description",
    cellStyle: { whiteSpace: "nowrap" },
  },
  {
    title: "Video",
    field: "path",
    cellStyle: { whiteSpace: "nowrap" },

    render: (row) => (
      <video
        controls
        muted
        autoPlay={true}
        style={{ maxWidth: "150px", borderRadius: "4px" }}
      >
        <source src={api.URL + "/" + row.path} alt="video" />
      </video>
    ),
    editable: "never",
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

function FilmList(props) {
  const [openDialogCreate, setOpenDialogCreate] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
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
    const fetchFilms = async () => {
      const { films } = await filmApi.getAll({ _limit: 0 });
      setRowData(films.map((film, index) => ({ ...film, stt: index + 1 })));
    };
    fetchFilms();
  }, [openDialogCreate, openDialogEdit, openDialogDelete]);

  return (
    <>
      <MaterialTable
        title={
          <div className="materialTableTitle">
            <Typography className="materialTableTitle_content" variant="h6">
              Danh sách Video
            </Typography>
          </div>
        }
        columns={columns}
        data={rowData}
        onSelectionChange={(row) => setOnSelected(row)}
        actions={[
          {
            icon: () => <AddCircleIcon className="materialTableIconAdd" />,
            tooltip: "Thêm video",
            isFreeAction: true,
            onClick: handleOpenDialogCreate,
          },

          {
            icon: () => <DeleteIcon className="materialTableIconDelete" />,
            tooltip: "Xóa video",
            onClick: onRowDelete,
          },

          {
            icon: () => <EditIcon className="materialTableIconEdit" />,
            tooltip: "Sửa video",
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
        fullWidth="xs"
        maxWidth="xs"
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
        fullWidth="xs"
        maxWidth="xs"
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
    </>
  );
}

export default FilmList;
