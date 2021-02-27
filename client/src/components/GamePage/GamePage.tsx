import React from "react";
import {Container, Grid, Paper, TextField, Typography} from "@material-ui/core";

const GamePage = () => {
    return <Grid container justify={"center"}>
        <Grid item xs={12}>
            <Paper>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"}>Game</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={3}>
                                    Song
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <TextField
                                        label={"Titre et Artiste"}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>

                            </Grid>
                        </Grid>

                    </Grid>
                </Container>
            </Paper>
            &nbsp;
        </Grid>
    </Grid>
}

export default GamePage
