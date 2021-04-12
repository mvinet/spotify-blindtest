import express from "express"
import http from "http"
import path from "path"
import axios from "axios"

import socket from "./sockets"
import route from "./routes"

const app = express()
const server = http.createServer(app)

console.debug("Run with")
console.debug("ClientId     = " + process.env.CLIENT_ID)
console.debug("ClientSecret = " + process.env.CLIENT_SECRET)


app.use(express.static(path.join(__dirname, "../client/build")))

app.use(route)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

const formData = new URLSearchParams()
formData.append("grant_type", "client_credentials")


axios.post("https://accounts.spotify.com/api/token", formData, {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64")
    }
}).then(result => console.log(result.data))
    .catch(reason => console.log(reason.response.data))


socket(server)
server.listen(process.env.PORT || 8080, () => console.log("Server listening"))
