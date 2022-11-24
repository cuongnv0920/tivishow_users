import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import amplitudeApi from "../../../../api/amplitudeApi";
import exchangeRateApi from "../../../../api/exchangeRateApi";
import URL from "../../../../configs/api.conf";
import { decrease, increase } from "../../homeSlice";
import "./styles.scss";

TableExchangeRate.propTypes = {};

function TableExchangeRate(props) {
  const dispatch = useDispatch();
  const toogleNextPage = useSelector((state) => state.toogleNextPage);

  const [exchangeRates, setExchangeRates] = useState([]);
  const [amplitudes, setAmplitudes] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 8,
    page: 1,
    count: 3,
  });
  const [filter, setFilter] = useState({
    _page: 1,
    _count: 3,
  });

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const { exchangeRates, paginations } = await exchangeRateApi.getAll(
        filter
      );

      setExchangeRates(exchangeRates);
      setPagination(paginations);
    };
    fetchExchangeRate();
  }, [filter]);

  useEffect(() => {
    const fetchAmplitude = async () => {
      const amplitudes = await amplitudeApi.getAll();

      setAmplitudes(amplitudes);
    };
    fetchAmplitude();
  }, []);

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

  useEffect(() => {
    const timer = setInterval(() => {
      const action = increase({
        count: pagination.count + 1,
        name: "exchangeRate",
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
        name: "interest",
      });

      dispatch(action);
    }
  }, [toogleNextPage]);

  return (
    <Box className="exchangeRate">
      <div className="exchangeRate__title">
        <Typography className="exchangeRate__typography">
          TỶ GIÁ NGOẠI TỆ - EXCHANGE RATES
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          className="exchangeRate__notification notification"
        >
          {exchangeRates.map(
            (notification, index) =>
              index === 0 && (
                <>
                  <Typography className="notification__hourd">
                    {"(Thời điểm thông báo: " + notification.notificationHourd}
                  </Typography>

                  <Typography className="notification__date">
                    {"– " + notification.notificationDate + " –"}
                  </Typography>

                  <Typography className="notification__number">
                    Lần thông báo thứ:
                    <span style={{ color: "#f50057", fontWeight: 600 }}>
                      {" " + notification.notificationNumber}
                    </span>
                    <span>{")"}</span>
                  </Typography>
                </>
              )
          )}
        </Stack>
      </div>

      <TableContainer sx={{ maxHeight: 500 }}>
        <Table
          stickyHeader
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
