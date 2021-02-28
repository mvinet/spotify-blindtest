import express from "express"
import http from "http"
import path from "path"

import socket from "./sockets"
import route from "./routes"

const app = express()
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, "../client/build")))

app.use(route)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

socket(server)
server.listen(process.env.PORT || 8080, () => console.log("Server listening"))
