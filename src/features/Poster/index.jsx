import { Route, Routes } from "react-router-dom";
import ListPagePoster from "./pages/ListPage";

Poster.propTypes = {};

function Poster(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPagePoster />} />
      </Routes>
    </div>
  );
}

export default Poster;
