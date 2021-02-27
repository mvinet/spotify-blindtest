import React from "react";
import {Button, Container, Grid, InputAdornment, Paper, TextField, Typography} from "@material-ui/core";
import {Gamepad, Person} from "@material-ui/icons";

const LoginPage = () => {
    return <Grid container justify={"center"}>
        <Grid item xs={12} md={6}>
            <Paper>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"}>Connexion</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Nom"}
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position={"start"}>
                                        <Person/>
                                    </InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Room"}
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position={"start"}>
                                        <Gamepad/>
                                    </InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color={"primary"} variant={"contained"} fullWidth>
                                Connection
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            &nbsp;
        </Grid>
    </Grid>
}

export default LoginPage
