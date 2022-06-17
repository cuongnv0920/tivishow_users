import { Route, Routes } from "react-router-dom";
import ListPageAdmin from "./pages/ListPape";

Admin.propTypes = {};

function Admin(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPageAdmin />} />
      </Routes>
    </div>
  );
}

export default Admin;
