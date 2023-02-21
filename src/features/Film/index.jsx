import React from "react";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";

Film.propTypes = {};

function Film(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPage />} />
      </Routes>
    </div>
  );
}

export default Film;
