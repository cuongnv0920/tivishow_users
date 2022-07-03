import { Container, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import TableInterest from "../components/TableInterest";
import "./styles.scss";

ListPageInterest.propTypes = {};

function ListPageInterest(props) {
  return (
    <Box className="interestAdmin">
      <Container>
        <Grid container spacing={2} className="interestAdmin__row">
          <Grid item className="interestAdmin__item">
            <Paper elevation={0} className="interestAdmin__paper">
              <TableInterest />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPageInterest;
