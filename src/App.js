import { Box, Container, Grid } from "@mui/material";
import { Header } from "components/common";
import Home from "features/Home";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

function App() {
  // const loggedInUser = useSelector((state) => state.user.current);

  const routes = [
    {
      path: "/*",
      element: <Home />,
      role: "user",
    },
  ];

  // const requireAuth = (routes) => {
  //   if (loggedInUser.role === "admin") {
  //     return routes;
  //   } else if (loggedInUser.role === "user") {
  //     return routes.filter((route) => route.role === loggedInUser.role);
  //   } else if (!!loggedInUser.role === false) {
  //     return routes.filter((route) => route.path === "/*");
  //   }
  // };

  return (
    <div className="App" style={{ height: "100vh" }}>
      <Header />
      <Box className="main">
        <Container>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Container>
      </Box>
    </div>
  );
}

export default App;
