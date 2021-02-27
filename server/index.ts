import express from "express"
import {Server, Socket} from "socket.io"
import http from "http"
import path from "path"

const app = express()

app.use(express.static(path.join(__dirname, "../client/build")))

app.get("/ping", (req, res) => {
    res.json({pong: new Date()})
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

const server = http.createServer(app)
const io = new Server(server)

io.on("connection", (socket: Socket) => {
    console.log(socket.id + " is now connected")
    socket.on("disconnect", () => {
        console.log(socket.id + "is now disconnected")
    })
})

server.listen(8080, () => console.log("Server listening"))
