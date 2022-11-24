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
import sourceApi from "../../../../api/sourceApi";
import { useDispatch } from "react-redux";
import URL from "../../../../configs/api.conf";
import StorageKeys from "../../../../configs/StorageKeys.conf";
import { removeLocalStorageSource } from "../../sourceSlice";
import SourceFormAdd from "../SourceFormAdd";
import SourceFormEdit from "../SourceFormEdit";

TableSource.propTypes = {};

function TableSource(props) {
  const [rowData, setRowData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleSubmitAdd = async (data) => {
    try {
      await sourceApi.create(data);
      setOpenAdd(false);

      enqueueSnackbar("Thêm mới thành công.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const hangleSubmitEdit = async (data) => {
    try {
      await sourceApi.update(data);

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
    localStorage.setItem(StorageKeys.SOURCE, JSON.stringify(data));
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const cancelDialog = () => {
    const action = removeLocalStorageSource();
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
      title: "Video",
      field: "video",
      cellStyle: { whiteSpace: "nowrap" },
      render: (row) => (
        <video
          controls
          muted
          autoPlay={true}
          style={{ maxWidth: "150px", borderRadius: "4px" }}
        >
          <source src={URL.apiUrl + "/" + row.video} alt="source" />
        </video>
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
    const fetchSources = async () => {
      const { sources, count } = await sourceApi.getAll();

      setRowData(sources.map((source, idx) => ({ ...source, stt: idx + 1 })));
    };
    fetchSources();
  }, [rowData]);

  return (
    <>
      <MaterialTable
        title={
          <div className="headTable">
            <Typography variant="h6" className="headTable__title">
              DANH SÁCH VIDEO
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

          pageSizeOptions: [10, 20, 30, 50],
          pageSize: 10,
          paging: true,
          addRowPosition: "first",
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
            <SourceFormAdd onSubmit={handleSubmitAdd} />
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
            <SourceFormEdit onSubmit={hangleSubmitEdit} />
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

export default TableSource;
