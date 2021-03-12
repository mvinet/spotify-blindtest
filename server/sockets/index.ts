import {Server as httpServer} from "http";
import {Server, Socket} from "socket.io"
import game from "./game";

let io: Server

const initSocket = (app: httpServer) => {
    io = new Server(app)

    io.on("connection", (socket: Socket) => {
        game(socket)
    })
}

export default initSocket
