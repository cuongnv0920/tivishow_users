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
import calendarApi from "../../../../api/calendarApi";
import Clock from "../../../../components/Clock";
import URL from "../../../../configs/api.conf";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import screenfull from "screenfull";
import "./styles.scss";

ProductAds.propTypes = {};

function ProductAds(props) {
  const [images, setImages] = useState([]);
  const [source, setSource] = useState([]);
  const [countSource, setCountSource] = useState(0);
  const [calendars, setCalendars] = useState([]);
  const [next, setNext] = useState(0);

  useEffect(() => {
    // get api image poster
    const fetchPosters = async () => {
      const posters = await posterApi.getAll();

      setImages(posters);
    };
    fetchPosters();
  }, []);

  useEffect(() => {
    // get api source video
    const fetchSource = async () => {
      const { sources, count } = await sourceApi.getAll();

      setSource([sources[next]]);
      setCountSource(count);
    };
    fetchSource();
  }, [next]);

  useEffect(() => {
    // get api calendar
    const fetchCalendar = async () => {
      const calendars = await calendarApi.getAll();

      setCalendars(calendars);
    };
    fetchCalendar();
  }, []);

  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  const onEnded = () => {
    if (next < countSource - 1) {
      setNext(next + 1);
    } else {
      setNext(0);
    }
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={12}>
          {source.map(
            (source, _) =>
              source.status === "enabled" && (
                <video
                  controls
                  muted
                  autoPlay={true}
                  onEnded={onEnded}
                  className="video"
                  src={URL.apiUrl + "/" + source.video}
                />
              )
          )}
        </Grid>
      </Grid>

      <Grid container sx={{ margin: "6px 16px" }}>
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
          {calendars.map((calendar) => (
            <div className="calendar">
              <div className="calendar__today">
                <FiberManualRecordIcon className="calendar__icon" />

                <Typography className="calendar__typography">
                  {calendar.today}
                </Typography>

                <FiberManualRecordIcon className="calendar__icon" />
              </div>

              <div className="calendar__box">
                <div className="calendar__dd">
                  <Moment format="DD">{calendar.date}</Moment>
                </div>

                <div className="calendar__mm">
                  <span>THÁNG</span>&nbsp;
                  <Moment format="MM">{calendar.date}</Moment>
                </div>
              </div>
            </div>
          ))}

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
