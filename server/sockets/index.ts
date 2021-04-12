import {Server as httpServer} from "http"
import {Server, Socket} from "socket.io"
import game, {GAME_PLAYERS} from "./game"
import {getGame} from "../dao/gameDao"
import {CurrentMusic} from "../classes/CurrentMusic"

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

    const music1 = new CurrentMusic("https://p.scdn.co/mp3-preview/104ad0ea32356b9f3b2e95a8610f504c90b0026b?cid=774b29d4f13844c495f206cafdad9c86", "Muse", "Uprising")
    const music2 = new CurrentMusic("https://p.scdn.co/mp3-preview/a03a546e8dfee4c84098a52d3c3f2b4ca524ae59?cid=774b29d4f13844c495f206cafdad9c86", "Foo Fighters", "Learn to Fly")

    setInterval(() => {
        if (getGame()) {
            getGame().users = getGame().users.map(user => Object.assign(user, {_findMusic: false}))

            io.to(getGame().id).emit(GAME_PLAYERS, getGame().users)

            if (getGame().currentMusic === music1) {
                getGame().currentMusic = music2
            } else {
                getGame().currentMusic = music1
            }

            io.to(getGame().id).emit("game/music", getGame().currentMusic.url)
            timer(0)
        }
    }, 35 * 1000)

    io.on("connection", (socket: Socket) => {
        game(socket)
    })

}

export default initSocket
