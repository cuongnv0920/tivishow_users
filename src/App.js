import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Admin from "./features/Admin";
import Home from "./features/Home";
import Poster from "./features/Poster";

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
        <Route path={requireAuthUser("poster/*")} element={<Poster />} />
      </Routes>
    </div>
  );
}

export default App;
