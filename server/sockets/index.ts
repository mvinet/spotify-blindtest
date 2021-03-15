import {Server as httpServer} from "http"
import {Server, Socket} from "socket.io"
import game from "./game"
import {getGame} from "../dao/gameDao"

let io: Server

const initSocket = (app: httpServer) => {
    io = new Server(app)

    setInterval(() => {
        if (getGame()) {
            io.to(getGame().id).emit("game/music", getGame().currentMusic)
        }
    }, 35 * 1000)

    io.on("connection", (socket: Socket) => {
        game(socket)
    })

}

export default initSocket
