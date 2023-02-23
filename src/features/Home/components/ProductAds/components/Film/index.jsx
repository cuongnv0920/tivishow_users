import { Grid } from "@mui/material";
import { filmApi } from "api";
import api from "configs/api.conf";
import { useEffect, useState } from "react";

Film.propTypes = {};

function Film(props) {
  const [films, setFilms] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 1,
    count: 1,
    page: 1,
  });
  const [filters, setFilters] = useState({
    _page: 1,
    _count: 1,
    _limit: 1,
  });

  const onEnded = () => {
    if (pagination.page < pagination.count) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        _page: pagination.page + 1,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        _page: 1,
      }));
    }
  };

  useEffect(() => {
    const fetchFilms = async () => {
      const { films, paginations } = await filmApi.getAll(filters);
      setFilms(films);
      setPagination(paginations);
    };
    fetchFilms();
  }, [filters]);

  return (
    <Grid item xs={12} md={12} sm={12} sx={{ minHeight: "210px" }}>
      {films.map(
        (film) =>
          film.status === true && (
            <video
              style={{ width: "100%", borderRadius: "4px" }}
              controls
              muted
              autoPlay={true}
              src={api.URL + "/" + film.path}
              onEnded={onEnded}
            />
          )
      )}
    </Grid>
  );
}

export default Film;
