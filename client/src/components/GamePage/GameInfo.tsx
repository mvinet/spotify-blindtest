import React, {useEffect, useState} from "react"
import {Button, Grid, Paper, Snackbar} from "@material-ui/core"
import {Socket} from "socket.io-client"
import Game from "../../model/Game"
import {em} from "csx"
import {Alert} from "@material-ui/lab"

interface Props {
    socket: Socket
    game: Game
}

interface Number {
    total: number,
    current: number
}

const GameInfo = ({game, socket}: Props) => {

    const [showStart, setShowStart] = useState(true)
    const [number, setNumber] = useState<Number>({total: 0, current: 0})
    const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
        socket.on("game/music/number", (number: Number) => {
            setNumber(number)
        })
    }, [socket])

    const handleStartGame = () => {

        socket.emit("game/start", {
            roomId: game.id
        })

        setShowStart(false)
    }

    const handleCopyRoomId = () => {
        const tempInput = document.createElement("input")
        tempInput.value = document.location.host + "/" + game.id
        document.body.appendChild(tempInput)
        tempInput.select()
        document.execCommand("copy")
        document.body.removeChild(tempInput)

        setOpenAlert(true)
    }

    return <Paper>
        <Grid container justify={"space-between"} style={{padding: em(1)}}>
            {socket.id === game.owner && showStart &&
            <Grid item xs={12}>
                <Button fullWidth onClick={handleStartGame}>
                    Start
                </Button>
            </Grid>
            }
            <Grid item style={{textAlign: "center", cursor: "pointer"}} onClick={handleCopyRoomId}>
                Room : <span>{game.id}</span>
            </Grid>
            <Grid item>
                {number?.current} / {number?.total}
            </Grid>
        </Grid>

        <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
            <Alert onClose={() => setOpenAlert(false)}>Lien copié avec succès !</Alert>
        </Snackbar>

    </Paper>
}

export default GameInfo