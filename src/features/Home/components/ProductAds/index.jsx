import FitScreenIcon from "@mui/icons-material/FitScreen";
import { Button, Divider, Grid, Stack, Switch } from "@mui/material";
import { Box } from "@mui/system";
import Cookies from "js-cookie";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-slideshow-image/dist/styles.css";
import screenfull from "screenfull";
import Calendar from "./components/Calendar";
import Film from "./components/Film";
import Poster from "./components/Poster";

ProductAds.propTypes = {};

function ProductAds(props) {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const getCookie = Cookies.get("Deposit");
  const cookied = !getCookie;
  const [checked, setChecked] = useState(!!cookied ? true : false);

  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  const handleChangeSwitchDeposit = (event) => {
    setChecked(event.target.checked);

    if (checked) {
      Cookies.set("Deposit", "toggle-table-deposit", {
        expires: 365,
        path: "/",
      });
    } else {
      Cookies.remove("Deposit", { path: "/" });
    }
  };

  return (
    <Box sx={{ borderRadius: "4px" }}>
      <Grid container>
        <Grid item>
          <Film />
        </Grid>
      </Grid>

      <Grid container sx={{ margin: "16px" }}>
        <Grid item direction="row" sx={{ display: "flex" }}>
          <Button
            sx={{ flexFlow: 1 }}
            onClick={handleFullScreen}
            title="Toàn màn hình"
          >
            <FitScreenIcon sx={{ color: "#f50057" }} />
          </Button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ marginLeft: "20px" }}
          >
            <h5 style={{ margin: 0, fontSize: "0.9rem" }}>Tắt</h5>
            <Switch
              onChange={handleChangeSwitchDeposit}
              {...label}
              checked={checked}
              title="Tắt/ Mở bảng lãi suất."
            />
            <h5 style={{ margin: 0, fontSize: "0.9rem" }}>Mở</h5>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={7} md={7}>
          <Poster />
        </Grid>

        <Grid item xs={5} md={5}>
          <Calendar />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductAds;
