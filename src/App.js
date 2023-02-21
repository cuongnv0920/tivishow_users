import { Box, Container, Grid } from "@mui/material";
import { Header } from "components/common";
import Deposit from "features/Deposit";
import Film from "features/Film";
import Home from "features/Home";
import Margin from "features/Margin";
import Poster from "features/Poster";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

function App() {
  const loggedInUser = useSelector((state) => state.auth.current);

  const routes = [
    {
      path: "/*",
      element: <Home />,
      role: "user",
    },
    {
      path: "film/*",
      element: <Film />,
      role: "admin",
    },
    {
      path: "poster/*",
      element: <Poster />,
      role: "admin",
    },
    {
      path: "margin/*",
      element: <Margin />,
      role: "admin",
    },
    {
      path: "deposit/*",
      element: <Deposit />,
      role: "admin",
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
    <div className="App" style={{ height: "100vh" }}>
      <Header />
      <Box className="main">
        <Container>
          <Routes>
            {requireAuth(routes).map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Container>
      </Box>
    </div>
  );
}

export default App;
