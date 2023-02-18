import { Box, Grid, Paper } from "@mui/material";
import Deposit from "features/Home/components/Deposit";
import ExchangeRate from "features/Home/components/ExchangeRate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductAds from "../../components/ProductAds";
import "./styles.scss";

ListPage.propTypes = {};

function ListPage(props) {
  const autoNextPage = useSelector((state) => state.home);
  const [slideComponent, setSlideComponent] = useState([
    {
      title: "table exchande rate",
      component: <ExchangeRate />,
    },
  ]);

  useEffect(() => {
    if (autoNextPage.component.name === "interest") {
      setSlideComponent([
        {
          title: "table deposit",
          component: <Deposit />,
        },
      ]);
    } else if (autoNextPage.component.name === "exchangeRate") {
      setSlideComponent([
        {
          title: "table exchande rate",
          component: <ExchangeRate />,
        },
      ]);
    }
  }, [autoNextPage]);

  return (
    <Box className="home">
      <Grid container spacing={2} className="home__container">
        <Grid item xs={12} md={8} sm={12} className="home__item">
          <Paper elevation={0} className="home__paper">
            {slideComponent.map((el, idx) => (
              <div className="home__component" key={idx}>
                {el.component}
              </div>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} sm={12} className="home__item">
          <Paper elevation={0} className="home__paper">
            <ProductAds />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ListPage;
