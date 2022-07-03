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
  }, [rowData]);

  return (
    <Box className="interest">
      <div className="interest__title">
        <Typography className="interest__typography">
          BẢNG LÃI SUẤT NIÊM YẾT
        </Typography>
      </div>

      <TableContainer>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="table interest"
          className="interest__table"
        >
          <TableHead className="interest__head headInterest">
            <TableRow className="headInterest__row">
              <TableCell className="headInterest__cell">Kỳ hạn</TableCell>
              <TableCell className="headInterest__cell">USD</TableCell>
              <TableCell className="headInterest__cell">VND</TableCell>
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
