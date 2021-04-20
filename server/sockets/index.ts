import {Server as httpServer} from "http"
import {Server, Socket} from "socket.io"
import game from "./game"
import {Express} from "express"

let io: Server

const initSocket = (server: httpServer, app: Express) => {
    io = new Server(server)

    app.request.io = io

    io.on("connection", (socket: Socket) => {
        game(socket, io)
    })

}

export default initSocket
