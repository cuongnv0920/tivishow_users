import { Route, Routes } from "react-router-dom";
import ListPageSource from "./pages/ListPage";

Source.propTypes = {};

function Source(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPageSource />} />
      </Routes>
    </div>
  );
}

export default Source;
