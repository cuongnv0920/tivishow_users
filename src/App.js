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

  const routes = [
    {
      path: "/*",
      element: <Home />,
      role: "user",
    },
    {
      path: "admin/*",
      element: <Admin />,
      role: "admin",
    },
    {
      path: "amplitude/*",
      element: <Amplitude />,
      role: "admin",
    },
    {
      path: "interest/*",
      element: <Interest />,
      role: "admin",
    },
    {
      path: "poster/*",
      element: <Poster />,
      role: "user",
    },
    {
      path: "source/*",
      element: <Source />,
      role: "user",
    },
  ];

  const requireAuth = (routes) => {
    if (loggedInUser.role === "admin") {
      return routes;
    } else if (loggedInUser.role === "user") {
      return routes.filter((route) => route.role === loggedInUser.role);
    } else if (!!loggedInUser.role === false) {
      return routes.filter((route) => route.path === "/*");
    }
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        {requireAuth(routes).map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
