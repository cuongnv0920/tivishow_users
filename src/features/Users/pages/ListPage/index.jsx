import { Box, Container, Grid, Paper } from "@material-ui/core";
import UserList from "features/Users/components/UserList";
import "./styles.scss";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box>
      <Container className="pageRoom">
        <Grid container className="pageRoom__grid">
          <Grid item xs={12} md={12} className="pageRoom__item">
            <Paper elevation={0} className="pageRoom__paper">
              <UserList className="pageRoom__table" />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
