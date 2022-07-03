import { Route, Routes } from "react-router-dom";
import ListPageInterest from "./pages/index";

Interest.propTypes = {};

function Interest(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPageInterest />} />
      </Routes>
    </div>
  );
}

export default Interest;
