import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Container, Grid, Paper } from "@mui/material";
import TableAmplitude from "../components/TableAmplitude";
import "./styles.scss";

ListPageAmplitude.propTypes = {};

function ListPageAmplitude(props) {
  return (
    <Box className="amplitude">
      <Container>
        <Grid container spacing={2} className="amplitude__row">
          <Grid item className="amplitude__item">
            <Paper elevation={0} className="amplitude__paper">
              <TableAmplitude />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPageAmplitude;
