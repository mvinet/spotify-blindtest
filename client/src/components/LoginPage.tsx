import React, {ChangeEvent, useState} from "react"
import {Button, Container, Grid, InputAdornment, Paper, TextField, Typography} from "@material-ui/core"
import {Gamepad, Person} from "@material-ui/icons"
import {Socket} from "socket.io-client"
import useLocalStorage from "../hook/useLocalStorage"
import {USERNAME} from "../constantes/localStorage"
import CreateRoom from "./CreateRoom"

import {useLocation} from "react-router-dom"

interface LoginPageProps {
    socket: Socket
}

const LoginPage = (props: LoginPageProps) => {
    const location = useLocation()

    const [username, setUsername] = useLocalStorage(USERNAME, "")
    const [room, setRoom] = useState(location.pathname.replace("/", ""))
    const [error, setError] = useState(false)
    const [createRoom, setCreateRoom] = useState(false)

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 0) {
            setError(false)
        }
        setUsername(event.target.value)
    }

    const handleChangeRoom = (event: ChangeEvent<HTMLInputElement>) => {
        setRoom(event.target.value)
    }

    const handleLogin = () => {
        if (username.length > 0) {
            props.socket.emit("game/join", {username, roomId: room})
        } else {
            setError(true)
        }
    }

    const handleCreateRoom = (roomId: string) => {
        if (username.length > 0) {
            props.socket.emit("game/join", {username, roomId})
        } else {
            setError(true)
        }
    }

    const handleOpenModal = (open: boolean) => {
        setCreateRoom(open)
    }


    return <Grid container justify={"center"}>
        <CreateRoom
            socket={props.socket}
            username={username}
            open={createRoom}
            onClose={() => handleOpenModal(false)}
            setConnected={handleCreateRoom}
        />
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
                                error={error}
                                helperText={error && "Le nom d'utilisateur doit contenir plus de 0 charactère"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Room"}
                                fullWidth
                                value={room}
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
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <Button fullWidth onClick={() => handleOpenModal(true)}>
                                Créer une partie
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
