import {Socket} from "socket.io";
import {getUsers, removeUser, save} from "../../dao/userDao"
import {User} from "../../classes/User";

const GAME_PLAYERS = "game/players"

interface GamePlayerJoin {
    username: string
}

const initGame = (socket: Socket) => {
    socket.on("game/join", (gamePlayerJoin: GamePlayerJoin) => {
        const user = new User(socket.id, gamePlayerJoin.username)
        save(user)

        socket.emit("game/connected", user)
        socket.broadcast.emit(GAME_PLAYERS, getUsers())

        socket.on(GAME_PLAYERS, () => socket.emit(GAME_PLAYERS, getUsers()))
    })

    socket.on("disconnect", () => {
        removeUser(socket.id)
        socket.broadcast.emit(GAME_PLAYERS, getUsers())
    })
}

export default initGame
