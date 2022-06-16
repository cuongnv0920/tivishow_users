import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import USD from "../../../../images/USD.svg";
import "./styles.scss";

TableExchangeRate.propTypes = {};

function createData(currency, cash, transfering, selling) {
  return { currency, cash, transfering, selling };
}

const rows = [
  createData("USD", 23.058, 23.058, 23.338),
  createData("GBP", 23.058, 23.058, 23.338),
  createData("HKD", 23.058, 23.058, 23.338),
  createData("CHF", 23.058, 23.058, 23.338),
  createData("JPG", 23.058, 23.058, 23.338),
  createData("AUD", 23.058, 23.058, 23.338),
  createData("CAD", 23.058, 23.058, 23.338),
  createData("EUR", 23.058, 23.058, 23.338),
];

function TableExchangeRate(props) {
  return (
    <Box>
      <div className="title">
        <Typography className="title__table">
          TỶ GIÁ NGOẠI TỆ - EXCHANGE RATES
        </Typography>
      </div>

      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="table exchange rate"
          className="table"
        >
          <TableHead className="table__head head">
            <TableRow className="head__row">
              <TableCell className="head__cell">
                Mã ngoại tệ<p>Currency</p>
              </TableCell>
              <TableCell className="head__cell">
                Mua tiền mặt<p>Buy cash</p>
              </TableCell>
              <TableCell className="head__cell">
                Mua chuyển khoản<p>Buy transfer</p>
              </TableCell>
              <TableCell className="head__cell">
                Bán<p>Selling</p>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="table__body">
            {rows.map((row) => (
              <TableRow key={row.currency} className="table__row body">
                <TableCell component="th" scope="row" className="body__cell">
                  <div className="body__currency">
                    <img src={USD} className="body__image" alt="flag" />
                    <div>{row.currency}</div>
                  </div>
                </TableCell>
                <TableCell className="body__cell">{row.cash}</TableCell>
                <TableCell className="body__cell">{row.transfering}</TableCell>
                <TableCell className="body__cell">{row.selling}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableExchangeRate;
