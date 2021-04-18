import React, {useState} from "react"
import {Button, Paper} from "@material-ui/core"
import {Socket} from "socket.io-client"
import Game from "../../model/Game"

interface Props {
    socket: Socket
    game: Game
}

const GameInfo = ({game, socket}: Props) => {

    const [showStart, setShowStart] = useState(true)

    const handleStartGame = () => {

        socket.emit("game/start", {
            roomId: game.id
        })

        setShowStart(false)
    }

    return <Paper>
        {socket.id === game.owner && showStart &&
        <Button fullWidth onClick={handleStartGame}>
            Start
        </Button>
        }
    </Paper>
}

export default GameInfo