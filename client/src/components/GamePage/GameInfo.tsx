import React, {useEffect, useState} from "react"
import {Button, Grid, Paper} from "@material-ui/core"
import {Socket} from "socket.io-client"
import Game from "../../model/Game"
import {em} from "csx"

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

    return <Paper>
        <Grid container justify={"space-between"} style={{padding: em(1)}}>
            {socket.id === game.owner && showStart &&
            <Grid item xs={12}>
                <Button fullWidth onClick={handleStartGame}>
                    Start
                </Button>
            </Grid>
            }
            <Grid item style={{textAlign: "center"}}>
                Room : <span>{game.id}</span>
            </Grid>
            <Grid item>
                {number?.current} / {number?.total}
            </Grid>
        </Grid>

    </Paper>
}

export default GameInfo