import React, {ChangeEvent, useState} from "react";
import {Button, Container, Grid, InputAdornment, Paper, TextField, Typography} from "@material-ui/core";
import {Gamepad, Person} from "@material-ui/icons";
import {Socket} from "socket.io-client";

interface LoginPageProps {
    socket: Socket
}

const LoginPage = (props: LoginPageProps) => {

    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handleChangeRoom = (event: ChangeEvent<HTMLInputElement>) => {
        setRoom(event.target.value)
    }

    const handleLogin = () => {
        props.socket.emit("game/join", {username, room})
    }

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
                                value={username}
                                onChange={handleChangeUsername}
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
                                value={room}
                                disabled
                                onChange={handleChangeRoom}
                                InputProps={{
                                    startAdornment: <InputAdornment position={"start"}>
                                        <Gamepad/>
                                    </InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                color={"primary"}
                                variant={"contained"}
                                onClick={handleLogin}
                                fullWidth
                            >
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
