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
import React, { useEffect, useState } from "react";
import exchangeRateApi from "../../../../api/exchangeRateApi";
import interestApi from "../../../../api/interestApi";
import amplitudeApi from "../../../../api/amplitudeApi";
import URL from "../../../../configs/api.conf";
import "./styles.scss";

TableExchangeRate.propTypes = {};

function TableExchangeRate(props) {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [amplitudes, setAmplitudes] = useState([]);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const exchangeRates = await exchangeRateApi.getAll();

      setExchangeRates(exchangeRates);
    };
    fetchExchangeRate();
  }, [exchangeRates]);

  useEffect(() => {
    const fetchAmplitude = async () => {
      const amplitudes = await amplitudeApi.getAll();

      setAmplitudes(amplitudes);
    };
    fetchAmplitude();
  }, []);

  useEffect(() => {
    const fetchInterest = async () => {
      const interests = await interestApi.getAll();

      setInterests(interests);
    };
    fetchInterest();
  }, [interests]);

  const result = exchangeRates.map(function (el) {
    const amplitude = amplitudes.filter(function (row) {
      return el.currency === row.currency;
    })[0];

    return {
      image: el.image,
      currency: el?.currency,
      buyCash: el?.buyCash - amplitude?.buyCash || 0,
      buyTransfer: el?.buyTransfer - amplitude?.buyTransfer || 0,
      selling: el?.selling + amplitude?.selling || 0,
      status: el.status,
    };
  });

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
            {result.map(
              (row, idx) =>
                row.status === "enabled" && (
                  <TableRow key={idx} className="bodyExchangeRate__row">
                    <TableCell
                      component="th"
                      scope="row"
                      className="bodyExchangeRate__cell"
                    >
                      <div className="bodyExchangeRate__currency">
                        <img
                          src={URL.apiUrl + "/" + row.image}
                          className="bodyExchangeRate__ensign"
                          alt="flag"
                        />
                        <div>{row.currency}</div>
                      </div>
                    </TableCell>
                    <TableCell className="bodyExchangeRate__cell">
                      {row.buyCash.toLocaleString()}
                    </TableCell>
                    <TableCell className="bodyExchangeRate__cell">
                      {row.buyTransfer.toLocaleString()}
                    </TableCell>
                    <TableCell className="bodyExchangeRate__cell">
                      {row.selling.toLocaleString()}
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

export default TableExchangeRate;
