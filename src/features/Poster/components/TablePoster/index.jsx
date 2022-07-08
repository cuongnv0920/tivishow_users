import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import posterApi from "../../../../api/posterApi";
import URL from "../../../../configs/api.conf";
import StorageKeys from "../../../../configs/StorageKeys.conf";
import { removeLocalStoragePoster } from "../../posterSlice";
import PosterFormAdd from "../PosterFormAdd";
import PosterFormEdit from "../PosterFormEdit";

TablePoster.propTypes = {};

function TablePoster(props) {
  const [rowData, setRowData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmitAdd = async (data) => {
    try {
      await posterApi.create(data);
      setOpenAdd(false);

      enqueueSnackbar("Thêm mới thành công.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const hangleSubmitEdit = async (data) => {
    try {
      await posterApi.update(data);

      setOpenEdit(false);
      enqueueSnackbar("Cập nhật thành công.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setRowData(data);
    localStorage.setItem(StorageKeys.POSTER, JSON.stringify(data));
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const cancelDialog = () => {
    const action = removeLocalStoragePoster();
    dispatch(action);

    setOpenEdit(false);
  };

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
      editable: "never",
    },

    {
      title: "Ảnh Poster",
      field: "image",
      cellStyle: { whiteSpace: "nowrap" },
      render: (row) => (
        <img
          style={{ width: "55px", height: "80px" }}
          src={URL.apiUrl + "/" + row.image}
          alt="imgPoster"
        />
      ),
      editable: "never",
    },

    {
      title: "Trạng thái",
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
    const fetchPosters = async () => {
      const posters = await posterApi.getAll();

      setRowData(posters.map((poster, idx) => ({ ...poster, stt: idx + 1 })));
    };
    fetchPosters();
  }, [rowData]);

  return (
    <>
      <MaterialTable
        title={
          <div className="headTable">
            <Typography variant="h6" className="headTable__title">
              DANH SÁCH POSTER
            </Typography>
          </div>
        }
        columns={columns}
        data={rowData}
        actions={[
          {
            icon: () => <AddCircleIcon className="iconAdd" />,
            tooltip: "Create Poster",
            onClick: () => handleOpenAdd(),
            isFreeAction: true,
          },
        ]}
        onSelectionChange={(row) => handleOpenEdit(row)}
        options={{
          showSelectAllCheckbox: false,
          tableLayout: "auto",
          actionsColumnIndex: -1,
          selection: true,
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
      <div>
        <Dialog
          open={openAdd}
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              handleCloseAdd(event, reason);
            }
          }}
        >
          <DialogContent>
            <PosterFormAdd onSubmit={handleSubmitAdd} />
          </DialogContent>

          <DialogActions>
            <Button className="dialog__cancel" onClick={handleCloseAdd}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openEdit}
          onClose={(event, reason) => {
            if (reason !== "backdropClick") {
              handleCloseEdit(event, reason);
            }
          }}
        >
          <DialogContent>
            <PosterFormEdit onSubmit={hangleSubmitEdit} />
          </DialogContent>

          <DialogActions>
            <Button className="dialog__cancel" onClick={cancelDialog}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default TablePoster;
