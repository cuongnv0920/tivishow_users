import FitScreenIcon from "@mui/icons-material/FitScreen";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import "react-calendar/dist/Calendar.css";
import "react-slideshow-image/dist/styles.css";
import screenfull from "screenfull";
import Calendar from "./components/Calendar";
import Film from "./components/Film";
import Poster from "./components/Poster";

ProductAds.propTypes = {};

function ProductAds(props) {
  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  return (
    <Box sx={{ borderRadius: "4px" }}>
      <Grid container>
        <Film />
      </Grid>

      <Grid container sx={{ margin: "16px" }}>
        <Grid item xs={12} md={12} sm={12}>
          <Button onClick={handleFullScreen} title="Toàn màn hình">
            <FitScreenIcon sx={{ color: "#f50057" }} />
          </Button>
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
