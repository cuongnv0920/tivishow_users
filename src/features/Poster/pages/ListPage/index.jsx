import { Box, Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import TablePoster from "../../components/TablePoster";
import "./styles.scss";

ListPagePoster.propTypes = {};

function ListPagePoster(props) {
  return (
    <Box className="home">
      <Container>
        <Grid container spacing={2} className="home__row">
          <Grid item xs={12} md={12} className="home__item">
            <Paper elevation={0} className="home__paper">
              <TablePoster />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPagePoster;
