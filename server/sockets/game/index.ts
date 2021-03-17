import {Socket} from "socket.io"
import {User} from "../../classes/User"
import {addPlayerInGame, createGame, getGame, removeGame, removePlayerInGame} from "../../dao/gameDao"

const GAME_PLAYERS = "game/players"

interface GamePlayerJoin {
    username: string
}

export default (socket: Socket) => {

    socket.on("game/join", (gamePlayerJoin: GamePlayerJoin) => {
        joinGame(socket, gamePlayerJoin)
    })

    socket.on("disconnect", () => {
        removePlayer(socket)
    })
}

const removePlayer = (socket: Socket) => {
    removePlayerInGame(socket.id)
    if (getGame()) {
        socket.broadcast.emit(GAME_PLAYERS, getGame().users)

        if (getGame().users.length === 0) {
            removeGame()
        }
    }
}

const joinGame = (socket: Socket, gamePlayerJoin: GamePlayerJoin) => {
    const user = new User(socket.id, gamePlayerJoin.username)

    if (!getGame()) {
        createGame(user)
    }

    socket.join(getGame().id)

    addPlayerInGame(user)

    socket.emit("game/connected", getGame())
    socket.broadcast.emit(GAME_PLAYERS, getGame().users)

    socket.on(GAME_PLAYERS, () => socket.emit(GAME_PLAYERS, getGame().users))

}