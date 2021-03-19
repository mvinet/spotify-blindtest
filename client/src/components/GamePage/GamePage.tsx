import React, {FormEvent, useEffect, useRef, useState} from "react"
import {Chip, Container, Grid, Paper, TextField, Typography} from "@material-ui/core"
import {Socket} from "socket.io-client"
import Player from "../../model/Player"
import Game from "../../model/Game"
import Music from "./Music"
import {percent} from "csx"
import {Face} from "@material-ui/icons"

interface GamePageProps {
    socket: Socket,
    game: Game
}

const GamePage = ({socket, game}: GamePageProps) => {

    const input = useRef<HTMLInputElement>(null)

    const [players, setPlayers] = useState<Player[]>(game._users)
    const [musicUrl, setMusicUrl] = useState<string>()
    const [value, setValue] = useState<string>("")
    const [canEdit, setCanEdit] = useState<boolean>(false)

    useEffect(() => {
        socket.emit("game/players")

        socket.on("game/players", (users: Player[]) => {
            setPlayers(users)
        })

        socket.on("game/music", (music: string) => {
            setMusicUrl(music)
            setValue("")
            setCanEdit(true)
            input.current!.focus()
        })

        socket.on("game/music/try", (result: { success: boolean }) => {
            setCanEdit(!result.success)
        })

    }, [socket])

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {

        socket.emit("game/music/try", {
            game: game._id,
            try: value
        })

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
                                    <Music socket={socket} music={musicUrl}/>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <form method={"GET"} onSubmit={onSubmit}>
                                        <TextField
                                            inputRef={input}
                                            disabled={!canEdit}
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
                        {players.map(player =>
                            <Grid item xs={12} key={player._id}>
                                <Chip
                                    clickable
                                    icon={<Face/>}
                                    label={player._username}
                                    style={{width: percent(100)}}
                                    color={player._findMusic ? "primary" : "default"}
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
