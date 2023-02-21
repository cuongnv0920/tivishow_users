import { Box } from "@mui/system";
import { posterApi } from "api";
import api from "configs/api.conf";
import { useEffect, useState } from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./styles.scss";

Poster.propTypes = {};

function Poster(props) {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const fetchPosters = async () => {
      const posters = await posterApi.getAll();
      setPosters(posters);
    };
    fetchPosters();
  });

  return (
    <div className="poster">
      <Zoom scale={0.4}>
        {posters.map((poster) => (
          <img
            className="poster__image"
            key={poster.path}
            src={api.URL + "/" + poster.path}
            alt="slide show"
          />
        ))}
      </Zoom>
    </div>
  );
}

export default Poster;
