import {Server as httpServer} from "http"
import {Server, Socket} from "socket.io"
import game, {GAME_PLAYERS} from "./game"
import {getGame} from "../dao/gameDao"

let io: Server

const timer = (i: number) => {
    setTimeout(() => {
        if (getGame()) {
            io.to(getGame().id).emit("game/music/time", i++)
            if (i <= 30) {
                timer(i)
            }
        }
    }, 1000)
}

const initSocket = (app: httpServer) => {
    io = new Server(app)

    setInterval(() => {
        if (getGame()) {
            getGame().users = getGame().users.map(user => Object.assign(user, {_findMusic: false}))

            io.to(getGame().id).emit(GAME_PLAYERS, getGame().users)

            getGame().findNewMusic().then(url => {
                io.to(getGame().id).emit("game/music", url)
                timer(0)
            })
        }
    }, 35 * 1000)

    io.on("connection", (socket: Socket) => {
        game(socket)
    })

}

export default initSocket
