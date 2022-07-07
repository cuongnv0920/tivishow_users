import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Admin from "./features/Admin";
import Amplitude from "./features/Amplitude";
import Home from "./features/Home";
import Interest from "./features/Interest";
import Poster from "./features/Poster";
import Source from "./features/Source";

function App() {
  const loggedInUser = useSelector((state) => state.user.current);

  const requireAuthUser = (path) =>
    loggedInUser.role === "user" ? path : "/*";

  const requireAuthAdmin = (path) =>
    loggedInUser.role === "admin" ? path : "/*";

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path={requireAuthAdmin("admin/*")} element={<Admin />} />
        <Route path={requireAuthAdmin("amplitude/*")} element={<Amplitude />} />
        <Route path={requireAuthAdmin("interest/*")} element={<Interest />} />
        <Route path={requireAuthUser("poster/*")} element={<Poster />} />
        <Route path={requireAuthUser("source/*")} element={<Source />} />
      </Routes>
    </div>
  );
}

export default App;
