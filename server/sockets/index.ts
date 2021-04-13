import {Server as httpServer} from "http"
import {Server, Socket} from "socket.io"
import game, {GAME_PLAYERS} from "./game"
import {getGame} from "../dao/gameDao"
import {Spotify} from "../spotify"

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

            new Spotify().getPlaylist(getGame().playlist).then(playlist => {
                getGame().currentMusic = Object.assign({
                    author: playlist[0].track.artists[0].name,
                    title: playlist[0].track.name,
                    url: playlist[0].track.preview_url
                })

                io.to(getGame().id).emit("game/music", getGame().currentMusic.url)

                timer(0)
            })
        }
    }, 35 * 1000)

    io.on("connection", (socket: Socket) => {
        game(socket)
    })

}

export default initSocket
