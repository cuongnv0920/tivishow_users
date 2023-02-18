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
import "./styles.scss";
import { useSelector } from "react-redux";
import { decrease, increase } from "../../homeSlice";
import { useDispatch } from "react-redux";
import { depositApi } from "api";

Deposit.propTypes = {};

function Deposit(props) {
  const dispatch = useDispatch();
  const autoNextPage = useSelector((state) => state.autoNextPage);
  const [deposits, setDeposit] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 8,
    count: 2,
    page: 1,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _count: 2,
  });

  useEffect(() => {
    const fetchDeposit = async () => {
      const { deposits, paginations } = await depositApi.getAll(filters);

      setDeposit(deposits);
      setPagination(paginations);
    };
    fetchDeposit();
  }, [filters]);

  useEffect(() => {
    const timer = setInterval(() => {
      const action = increase({
        count: pagination.count + 1,
        name: "deposit",
      });

      dispatch(action);
    }, 10000);

    return () => clearInterval(timer);
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: autoNextPage.page,
    }));

    if (autoNextPage.page === pagination.count + 1) {
      const action = decrease({
        count: 0,
        name: "exchangeRate",
      });

      dispatch(action);
    }
  }, [autoNextPage]);

  return (
    <Box className="deposit">
      <div className="deposit__title">
        <h2>BẢNG LÃI SUẤT TIỀN GỬI</h2>
        <h5>
          <span>Hiệu lực ngày: </span>
          {deposits.map(
            (deposit, index) =>
              index === 0 && (
                <Moment style={{ color: "#f50057" }} format="DD/MM/YYYY">
                  {deposit.effect}
                </Moment>
              )
          )}
        </h5>
      </div>

      <TableContainer sx={{ maxHeight: 550 }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label="table deposit"
          className="deposit__table"
        >
          <TableHead className="deposit__head headDeposit">
            <TableRow className="headDeposit__row">
              <TableCell
                component="th"
                scope="row"
                className="headDeposit__cell"
              >
                Kỳ hạn<p>Term</p>
              </TableCell>
              <TableCell className="headDeposit__cell">
                VND<p>% Năm</p>
              </TableCell>
              <TableCell className="headDeposit__cell">
                USD<p>% Năm</p>
              </TableCell>
              <TableCell className="headDeposit__cell">
                Online<p>% Năm</p>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="deposit__body bodyDeposit">
            {deposits.map((row) => (
              <TableRow key={row.currency} className="bodyDeposit__row">
                <TableCell className="bodyDeposit__cell">
                  <div className="bodyDeposit__term">{row.term}</div>
                </TableCell>
                <TableCell className="bodyDeposit__cell">
                  {row.vnd === 0 ? "%" : row.vnd + "%"}
                </TableCell>
                <TableCell className="bodyDeposit__cell">
                  {row.usd === 0 ? "%" : row.usd + "%"}
                </TableCell>
                <TableCell className="bodyDeposit__cell">
                  {row.online === 0 ? "%" : row.online + "%"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Deposit;
