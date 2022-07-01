import { Route, Routes } from "react-router-dom";
import ListPageAmplitude from "./pages";

Amplitude.propTypes = {};

function Amplitude(props) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<ListPageAmplitude />} />
      </Routes>
    </div>
  );
}

export default Amplitude;
