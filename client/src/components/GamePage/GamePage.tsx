import React, {FormEvent, useEffect, useState} from "react"
import {Chip, Container, Grid, Paper, TextField, Typography} from "@material-ui/core"
import {Socket} from "socket.io-client"
import Player from "../../model/Player"
import Game from "../../model/Game"
import Music from "./Music"
import {percent} from "csx"

interface GamePageProps {
    socket: Socket,
    game: Game
}

const GamePage = (props: GamePageProps) => {
    const [players, setPlayers] = useState<Player[]>(props.game._users)
    const [musicUrl, setMusicUrl] = useState<string>()
    const [value, setValue] = useState<string>("")

    useEffect(() => {
        props.socket.emit("game/players")

        props.socket.on("game/players", (users: Player[]) => {
            console.log("Receiving game/players")
            setPlayers(users)
        })

        props.socket.on("game/music", (music: string) => {
            setMusicUrl(music)
        })

    }, [props.socket])

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        console.log(value)
        event.preventDefault()
    }

    return <Grid container justify={"center"} spacing={2}>
        <Grid item xs={12} md={9}>
            <Paper>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"}>Game</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} alignItems={"center"} justify={"center"}>
                                <Grid item xs={12} md={4}>
                                    <Music socket={props.socket} music={musicUrl}/>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <form method={"GET"} onSubmit={onSubmit}>
                                        <TextField
                                            label={"Titre ou Artiste"}
                                            fullWidth
                                            value={value}
                                            onChange={event => setValue(event.target.value)}
                                        />
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            &nbsp;
        </Grid>
        <Grid item xs={12} md={3}>
            <Paper>
                <Container>
                    <Grid container spacing={2}>
                        {players.map(player => <Grid item xs={12} key={player._id}>
                            <Chip
                                label={player._username}
                                style={{width: percent(100)}}
                            />
                        </Grid>)}
                    </Grid>
                </Container>
            </Paper>
            &nbsp;
        </Grid>
    </Grid>
}

export default GamePage
