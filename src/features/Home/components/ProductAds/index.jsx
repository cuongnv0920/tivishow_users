import { Chip } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Moment from "react-moment";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Clock from "../../../../components/Clock";
import Slide1 from "../../../../images/slide1.jpg";
import Slide2 from "../../../../images/slide2.png";
import Slide3 from "../../../../images/slide3.jpg";
import "./styles.scss";

ProductAds.propTypes = {};

const images = [
  { url: Slide1, caption: "Slide 1" },
  { url: Slide2, caption: "Slide 2" },
  { url: Slide3, caption: "Slide 3" },
];

function ProductAds(props) {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

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
            {images.map((image, index) => (
              <img
                key={index}
                className="poster__image"
                src={image.url}
                alt="slide show"
              />
            ))}
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
