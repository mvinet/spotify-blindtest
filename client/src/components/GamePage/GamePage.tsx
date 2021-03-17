import React, {useEffect, useState} from "react"
import {Container, Grid, Paper, TextField, Typography} from "@material-ui/core"
import {Socket} from "socket.io-client"
import Player from "../../model/Player"
import Game from "../../model/Game"
import CardMusic from "./CardMusic"

interface GamePageProps {
    socket: Socket,
    game: Game
}

const GamePage = (props: GamePageProps) => {
    const [players, setPlayers] = useState<Player[]>(props.game._users)
    const [musicUrl, setMusicUrl] = useState<string>()

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

    return <Grid container justify={"center"}>
        <Grid item xs={12}>
            <Paper>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant={"h6"}>Game</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2} alignItems={"center"} justify={"center"}>
                                <Grid item xs={12} md={4}>
                                    <CardMusic socket={props.socket} music={musicUrl}/>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <TextField label={"Titre et Artiste"} fullWidth/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {players.map(player => <div key={player._id}>{player._username + " "}</div>)}
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
