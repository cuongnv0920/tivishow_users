import { Grid, Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import TableUsers from "../../components/TableUsers";
import "./styles.scss";

ListPageAdmin.propTypes = {};

function ListPageAdmin(props) {
  return (
    <Box className="admin">
      <Container>
        <Grid container spacing={2} className="admin__row">
          <Grid item xs={6} md={8} className="admin_item">
            <Paper elevation={0} className="admin__paper">
              <TableUsers />
            </Paper>
          </Grid>

          <Grid item xs={6} md={4} className="admin_item">
            <Paper elevation={0} className="admin__paper">
              danh sách phòng ban
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPageAdmin;