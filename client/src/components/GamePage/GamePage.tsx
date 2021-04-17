import React, {FormEvent, useEffect, useRef, useState} from "react"
import {
    Button,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField,
    Typography
} from "@material-ui/core"
import {Socket} from "socket.io-client"
import Player from "../../model/Player"
import Game from "../../model/Game"
import MusicPlayer from "./MusicPlayer"
import {Face} from "@material-ui/icons"
import _ from "lodash"
import Music from "../../model/Music"
import MusicInfo from "./MusicInfo"
import {percent} from "csx"

import {useParams} from "react-router-dom"

interface GamePageProps {
    socket: Socket,
    game: Game
}

const GamePage = ({socket, game}: GamePageProps) => {

    const {id} = useParams<{ id: string }>()

    const input = useRef<HTMLInputElement>(null)

    const [players, setPlayers] = useState<Player[]>(game.users)
    const [oldTracks, setOldTracks] = useState<Music[]>([])
    const [musicUrl, setMusicUrl] = useState<string>()
    const [value, setValue] = useState<string>("")
    const [canEdit, setCanEdit] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        socket.emit("game/connected", {roomId: id})

        socket.on("game/players", (users: Player[]) => {
            setPlayers(_.orderBy(users, "_score", "desc"))
        })

        socket.on("game/music", (music: string) => {
            setMusicUrl(music)
            setValue("")
            setCanEdit(true)
            setError(false)
            input.current!.focus()
        })

        socket.on("game/music/try", (result: { success: boolean }) => {
            setCanEdit(!result.success)
            setError(!result.success)
        })

        socket.on("game/music/old", (music: Music) => {
            if (music) {
                setOldTracks(prevState => [music, ...prevState])
            }
        })

    }, [socket, id])


    const onSubmit = (event: FormEvent<HTMLFormElement>) => {

        socket.emit("game/music/try", {
            game: game.id,
            try: value
        })

        event.preventDefault()
    }

    const handleStartGame = () => {
        socket.emit("game/start", {
            roomId: game.id
        })
    }

    return <Grid container spacing={2}>
        {socket.id === game.owner &&
        <Grid item xs={12}>
            <Paper>
                <Button fullWidth onClick={handleStartGame}>
                    Start
                </Button>
            </Paper>
        </Grid>
        }
        <Grid item xs={12} md={3}>
            <Paper>
                <Container>
                    <Grid container spacing={2}>
                        <List style={{width: percent(100)}}>
                            {players.map(player =>
                                <div key={player._id}>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <Face/>
                                        </ListItemIcon>
                                        <ListItemText primary={player._username}/>
                                    </ListItem>
                                </div>
                            )}
                        </List>
                    </Grid>
                </Container>
            </Paper>
            &nbsp;
        </Grid>
        <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <Grid container spacing={2}>
                            <Grid item xs={2} style={{textAlign: "center"}}>
                                <Typography variant={"h6"}>Game</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2} alignItems={"center"} justify={"center"}>
                                    <Grid item xs={12} md={4}>
                                        <MusicPlayer socket={socket} music={musicUrl}/>
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
                                                error={error}
                                                helperText={error ? "Mauvaise réponse" : ""}
                                            />
                                        </form>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    &nbsp;
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Container>
                            <Grid container spacing={1}>
                                {oldTracks.length > 0 && <>
                                    <Grid item xs={12}>
                                        <Typography variant={"h4"} component={"h4"}>Dernières musiques</Typography>
                                    </Grid>

                                    {oldTracks.map((item, i) =>
                                        <Grid item xs={12} key={i}>
                                            <MusicInfo music={item}/>
                                        </Grid>
                                    )}
                                </>}
                            </Grid>
                        </Container>
                    </Paper>
                    &nbsp;
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}

export default GamePage
