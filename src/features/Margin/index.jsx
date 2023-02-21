import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
Margin.propTypes = {};

function Margin(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default Margin;
