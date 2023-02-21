import { Box, Container, Grid, Paper } from "@material-ui/core";
import MarginList from "features/Margin/components/MarginList";
import React from "react";
import "./styles.scss";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box>
      <Container className="pageMargin">
        <Grid container className="pageMargin__grid">
          <Grid item xs={12} md={12} className="pageMargin__item">
            <Paper elevation={0} className="pageMargin__paper">
              <MarginList className="pageMargin__table" />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
