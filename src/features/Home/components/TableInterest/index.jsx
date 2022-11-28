import {
  Box,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import interestApi from "../../../../api/interestApi";
import "./styles.scss";
import { useSelector } from "react-redux";
import { decrease, increase } from "../../homeSlice";
import { useDispatch } from "react-redux";

TableInterest.propTypes = {};

function TableInterest(props) {
  const dispatch = useDispatch();
  const toogleNextPage = useSelector((state) => state.toogleNextPage);

  const [rowData, setRowData] = useState([]);
  const [valid, setValid] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 8,
    page: 1,
    count: 2,
  });
  const [filter, setFilter] = useState({
    _page: 1,
    count: 2,
  });

  useEffect(() => {
    const fetchInterests = async () => {
      const { interests, paginations } = await interestApi.getAll(filter);

      setRowData(interests);
      setPagination(paginations);
    };
    fetchInterests();
  }, [filter]);

  useEffect(() => {
    const fetchValids = async () => {
      const valids = await interestApi.getAllAdmin();

      setValid(valids);
    };

    fetchValids();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const action = increase({
        count: pagination.count + 1,
        name: "interest",
      });

      dispatch(action);
    }, 10000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      _page: toogleNextPage.page,
    }));

    if (toogleNextPage.page === pagination.count + 1) {
      const action = decrease({
        count: 0,
        name: "exchangeRate",
      });

      dispatch(action);
    }
  }, [toogleNextPage.page]);

  return (
    <Box className="interest">
      <Stack direction="row" spacing={2} className="interest__title">
        <Typography className="interest__typography">
          LÃI SUẤT TIỀN GỬI TIẾT KIỆM
        </Typography>

        <Chip
          className="interest__chip"
          color="success"
          icon={<CheckIcon />}
          variant="outlined"
          label={valid.map(
            (row, index) =>
              index === 0 && (
                <Moment format="DD/MM/YYYY" className="interest__moment">
                  {row.valid}
                </Moment>
              )
          )}
        />
      </Stack>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label="table interest"
          className="interest__table"
        >
          <TableHead className="interest__head headInterest">
            <TableRow className="headInterest__row">
              <TableCell className="headInterest__cell">
                Kỳ hạn<p>Tern</p>
              </TableCell>
              <TableCell className="headInterest__cell">
                USD<p>% Năm</p>
              </TableCell>
              <TableCell className="headInterest__cell">
                VND<p>% Năm</p>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="interest__body bodyInterest">
            {rowData.map(
              (row) =>
                row.status === "enabled" && (
                  <TableRow key={row.currency} className="bodyInterest__row">
                    <TableCell className="bodyInterest__cell">
                      <div className="bodyInterest__term">{row.term}</div>
                    </TableCell>
                    <TableCell className="bodyInterest__cell">
                      {row.usd === 0 ? "%" : row.usd + "%"}
                    </TableCell>
                    <TableCell className="bodyInterest__cell">
                      {row.vnd === 0 ? "%" : row.vnd + "%"}
                    </TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableInterest;
