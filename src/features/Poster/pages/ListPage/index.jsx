import { Box, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./styles.scss";

ListPagePoster.propTypes = {};

function ListPagePoster(props) {
  return (
    <Box className="home">
      <Container>
        <Grid container spacing={2} className="home__row">
          <Grid item xs={6} md={8} className="home__item">
            <Paper elevation={0} className="home__paper">
              <Typography>test1</Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} md={4} className="home__item">
            <Paper elevation={0} className="home__paper">
              <Typography>test1</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPagePoster;
