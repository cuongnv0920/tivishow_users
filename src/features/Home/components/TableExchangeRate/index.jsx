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
    <Box className="exchangeRate">
      <div className="exchangeRate__title">
        <Typography className="exchangeRate__typography">
          TỶ GIÁ NGOẠI TỆ - EXCHANGE RATES
        </Typography>
      </div>

      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="table exchange rate"
          className="exchangeRate__table"
        >
          <TableHead className="exchangeRate__head headExchangeRate">
            <TableRow className="headExchangeRate__row">
              <TableCell className="headExchangeRate__cell">
                Mã ngoại tệ<p>Currency</p>
              </TableCell>
              <TableCell className="headExchangeRate__cell">
                Mua tiền mặt<p>Buy cash</p>
              </TableCell>
              <TableCell className="headExchangeRate__cell">
                Mua chuyển khoản<p>Buy transfer</p>
              </TableCell>
              <TableCell className="headExchangeRate__cell">
                Bán<p>Selling</p>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className="exchangeRate__body bodyExchangeRate">
            {rows.map((row) => (
              <TableRow key={row.currency} className="bodyExchangeRate__row">
                <TableCell
                  component="th"
                  scope="row"
                  className="bodyExchangeRate__cell"
                >
                  <div className="bodyExchangeRate__currency">
                    <img
                      src={USD}
                      className="bodyExchangeRate__image"
                      alt="flag"
                    />
                    <div>{row.currency}</div>
                  </div>
                </TableCell>
                <TableCell className="bodyExchangeRate__cell">
                  {row.cash}
                </TableCell>
                <TableCell className="bodyExchangeRate__cell">
                  {row.transfering}
                </TableCell>
                <TableCell className="bodyExchangeRate__cell">
                  {row.selling}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableExchangeRate;
