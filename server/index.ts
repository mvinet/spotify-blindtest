import express from "express"
import http from "http"
import path from "path"

import bodyParser from "body-parser"

import socket from "./sockets"
import route from "./routes"
import {Server} from "socket.io"

const app = express()
const server = http.createServer(app)

declare global {
    namespace Express {
        interface Request {
            io: Server
        }
    }
}

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "../client/build")))

app.use(route)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

socket(server, app)
server.listen(process.env.PORT || 8080, () => console.log("Server listening"))
