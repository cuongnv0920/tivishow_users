import { Box, Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import ProductAds from "../../components/ProductAds";
import TableExchangeRate from "../../components/TableExchangeRate";
import "./styles.scss";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box className="home">
      <Container>
        <Grid container spacing={2} className="home__row">
          <Grid item xs={6} md={8} className="home__item">
            <Paper elevation={0} className="home__paper">
              <TableExchangeRate />
            </Paper>
          </Grid>

          <Grid item xs={6} md={4} className="home__item">
            <Paper elevation={0} className="home__paper">
              <ProductAds />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
