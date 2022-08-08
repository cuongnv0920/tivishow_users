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

TableInterest.propTypes = {};

function TableInterest(props) {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      const interests = await interestApi.getAll();

      setRowData(interests);
    };
    fetchInterests();

    const intervalInterest = setInterval(() => {
      fetchInterests();
    }, 1000 * 60 * 5);

    return () => clearInterval(intervalInterest);
  }, []);

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
          label={rowData.map(
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
