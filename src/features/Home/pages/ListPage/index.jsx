import { Box, Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import ProductAds from "../../components/ProductAds";
import TableExchangeRate from "../../components/TableExchangeRate";
import TableInterest from "../../components/TableInterest";
import "./styles.scss";
import { useSelector } from "react-redux";

ListPage.propTypes = {};

function ListPage(props) {
  const [slideComponent, setSlideComponent] = useState([
    {
      title: "table exchande rate",
      component: <TableExchangeRate />,
    },
  ]);
  const toogleNextPage = useSelector((state) => state.toogleNextPage);

  useEffect(() => {
    if (toogleNextPage.component.name === "interest") {
      setSlideComponent([
        {
          title: "table interest",
          component: <TableInterest />,
        },
      ]);
    } else if (toogleNextPage.component.name === "exchangeRate") {
      setSlideComponent([
        {
          title: "table exchande rate",
          component: <TableExchangeRate />,
        },
      ]);
    }
  }, [toogleNextPage]);

  return (
    <Box className="home">
      <Container>
        <Grid container spacing={2} className="home__row">
          <Grid item xs={6} md={8} className="home__item">
            <Paper elevation={0} className="home__paper">
              {slideComponent.map((el, idx) => (
                <div className="home__component" key={idx}>
                  {el.component}
                </div>
              ))}
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
