import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Button, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import Moment from "react-moment";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import posterApi from "../../../../api/posterApi";
import sourceApi from "../../../../api/sourceApi";
import Clock from "../../../../components/Clock";
import URL from "../../../../configs/api.conf";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import screenfull from "screenfull";
import "./styles.scss";

ProductAds.propTypes = {};

function ProductAds(props) {
  const date = new Date();
  const [images, setImages] = useState([]);
  const [sources, setSources] = useState([]);

  const today = (date) => {
    switch (date.getDay()) {
      case 0:
        return "Chủ nhật";
      case 1:
        return "Thứ hai";
      case 2:
        return "Thứ ba";
      case 3:
        return "Thứ tư";
      case 4:
        return "Thứ năm";
      case 5:
        return "Thứ sáu";
      case 6:
        return "Thứ bảy";
    }
  };

  useEffect(() => {
    const fetchPosters = async () => {
      const posters = await posterApi.getAll();

      setImages(posters);
    };
    fetchPosters();
  }, [images]);

  useEffect(() => {
    const fetchSource = async () => {
      const sources = await sourceApi.getAll();

      setSources(sources);
    };
    fetchSource();
  }, [sources]);

  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={12}>
          <video controls loop muted autoPlay={true} className="video">
            {sources.map(
              (source, idx) =>
                source.status === "enabled" && (
                  <source
                    key={idx}
                    className="video__source"
                    src={URL.apiUrl + "/" + source.video}
                    type={source.type}
                  />
                )
            )}
          </video>
        </Grid>
      </Grid>

      <Grid container sx={{ margin: "8px 16px" }}>
        <Grid item xs={12} md={12}>
          <Button onClick={handleFullScreen} title="Toàn màn hình">
            <FitScreenIcon sx={{ color: "#f50057" }} />
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={7} md={7}>
          <div className="poster">
            <Zoom scale={0.4}>
              {images.map(
                (el, index) =>
                  el.status === "enabled" && (
                    <img
                      key={index}
                      className="poster__image"
                      src={URL.apiUrl + "/" + el.image}
                      alt="slide show"
                    />
                  )
              )}
            </Zoom>
          </div>
        </Grid>

        <Grid item xs={5} md={5}>
          <div className="calendar">
            <div className="calendar__today">
              <FiberManualRecordIcon className="calendar__icon" />
              <Typography className="calendar__typography">
                {today(new Date())}
              </Typography>
              <FiberManualRecordIcon className="calendar__icon" />
            </div>
            <div className="calendar__box">
              <div className="calendar__dd">
                <Moment format="DD">{date}</Moment>
              </div>

              <div className="calendar__mm">
                <span>THÁNG</span>&nbsp;
                <Moment format="MM">{date}</Moment>
              </div>
            </div>
          </div>

          <div className="clock">
            <Chip
              className="clock__chip"
              label={<Clock />}
              variant="outlined"
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductAds;
