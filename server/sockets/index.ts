import {Server as httpServer} from "http"
import {Server, Socket} from "socket.io"
import game from "./game"
import {getGame} from "../dao/gameDao"

let io: Server

const timer = (i: number) => {
    console.log(i)
    setTimeout(() => {
        io.to(getGame().id).emit("game/music/time", i++)
        if (i <= 30) {
            timer(i)
        }
    }, 1000)
}

const initSocket = (app: httpServer) => {
    io = new Server(app)

    setInterval(() => {
        if (getGame()) {
            io.to(getGame().id).emit("game/music", getGame().currentMusic)

            timer(0)

        }
    }, 35 * 1000)

    io.on("connection", (socket: Socket) => {
        game(socket)
    })

}

export default initSocket
