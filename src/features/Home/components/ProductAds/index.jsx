import { Chip } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Moment from "react-moment";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import posterApi from "../../../../api/posterApi";
import Clock from "../../../../components/Clock";
import URL from "../../../../configs/api.conf";
import "./styles.scss";

ProductAds.propTypes = {};

function ProductAds(props) {
  const [date, setDate] = useState(new Date());
  const [images, setImages] = useState([]);

  const onChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
    const fetchPosters = async () => {
      const posters = await posterApi.getAll();

      setImages(posters);
    };
    fetchPosters();
  }, [images]);

  return (
    <Box>
      <div className="calendar">
        <div className="calendar__detail">
          <div className="calendar__month">
            <Moment format="MM">{date}</Moment>
          </div>

          <div className="calendar__day">
            <Moment format="DD">{date}</Moment>
          </div>

          <div className="calendar__year">
            <Moment format="YYYY">{date}</Moment>
          </div>
        </div>
        <Calendar onChange={onChange} value={date} />
      </div>

      <div className="poster">
        <div className="poster__slide">
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

        <div className="poster__clock">
          <Chip className="poster__chip" variant="outlined" label={<Clock />} />
        </div>
      </div>
    </Box>
  );
}

export default ProductAds;
