import React, {useEffect, useState} from "react";
import {Container, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {Socket} from "socket.io-client";

interface GamePageProps {
    socket: Socket
}

interface Player {
    id: string,
    username: string
}

const GamePage = (props: GamePageProps) => {
    const [players, setPlayers] = useState<Array<Player>>([])

    useEffect(() => {
        props.socket.emit("game/players")

        props.socket.on("game/players", (users: Player[]) => {
            console.log("Receiving game/players")
            setPlayers(users)
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
                                {players.map(player => <div key={player.id}>{player.username}</div>)}
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
