import { Box, Container, Grid, Paper } from "@material-ui/core";
import PosterList from "features/Poster/components/PosterList";
import React from "react";

ListPage.propTypes = {};

function ListPage(props) {
  return (
    <Box>
      <Container>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Paper elevation={0}>
              <PosterList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
