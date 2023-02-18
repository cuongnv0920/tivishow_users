import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { exchangeRateApi, marginApi } from "api";
import api from "configs/api.conf";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "../../homeSlice";
import "./styles.scss";

ExchangeRate.propTypes = {};

function ExchangeRate(props) {
  const dispatch = useDispatch();
  const autoNextPage = useSelector((state) => state.home);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [margins, setMargins] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 8,
    count: 3,
    page: 1,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _count: 3,
  });

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const { exchangeRates, paginations } = await exchangeRateApi.getAll(
        filters
      );

      setExchangeRates(exchangeRates);
      setPagination(paginations);
    };
    fetchExchangeRate();
  }, [filters]);

  useEffect(() => {
    const fetchMargin = async () => {
      const margins = await marginApi.getAll();

      setMargins(margins);
    };
    fetchMargin();
  }, []);

  const rows = exchangeRates.map(function (exchangeRate) {
    const margin = margins.filter(function (margin) {
      return exchangeRate.currency === margin.currency;
    })[0];

    return {
      ensign: exchangeRate.ensign,
      currency: exchangeRate?.currency,
      buyCash: exchangeRate?.buyCash - margin?.buyCash || 0,
      buyTransfer: exchangeRate?.buyTransfer - margin?.buyTransfer || 0,
      selling: exchangeRate?.selling + margin?.selling || 0,
      status: margin?.status,
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      _page: autoNextPage.page,
    }));

    if (autoNextPage.page === pagination.count + 1) {
      const action = decrease({
        count: 0,
        name: "deposit",
      });

      dispatch(action);
    }
  }, [autoNextPage]);

  return (
    <div className="exchangeRate">
      <div className="exchangeRate__title">
        <h2>TỶ GIÁ NGOẠI TỆ - EXCHANGE RATES</h2>
        {exchangeRates.map(
          (notification, index) =>
            index === 0 && (
              <h5>
                {`Thời điểm thông báo: ${notification.notificationHourd} 
                - ${notification.notificationDate} 
                - Lần thông báo thứ: `}
                <span>{notification.notificationNumber}</span>
              </h5>
            )
        )}
      </div>

      <TableContainer sx={{ maxHeight: 550 }}>
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
            {rows.map(
              (row, idx) =>
                row.status === true && (
                  <TableRow key={idx} className="bodyExchangeRate__row">
                    <TableCell
                      component="th"
                      scope="row"
                      className="bodyExchangeRate__cell"
                    >
                      <div className="bodyExchangeRate__currency">
                        <img
                          src={api.URL + "/" + row.ensign}
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
    </div>
  );
}

export default ExchangeRate;
