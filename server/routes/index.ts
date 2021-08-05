import {Router} from "express"
import {createGame, getGame} from "../dao/gameDao"
import {Spotify} from "../spotify"

const router = Router()

router.get("/ping", (req, res) => {
    res.json({
        "pong": new Date()
    })
})

router.get("/check", (req, res) => {
    if (req.query.playlist) {
        const playlistUrl: string = req.query.playlist as string
        const playlistId = playlistUrl.split("/playlist/")[1].split("?si=")[0]

        const spotify = new Spotify()

        spotify.getPlaylist(playlistId).then(result => {
            res.status(200).json({
                available: result.items.filter((item: any) => item.track.preview_url !== null),
                notAvailable: result.items.filter((item: any) => item.track.preview_url == null)
            })
        }).catch(() => {
            res.status(404).json()
        })

    } else {
        res.status(200).json()
    }
})

router.get("/game/:id", (req, res) => {
    const game = getGame(req.params.id)

    if (game) {
        res.json()
    } else {
        res.status(404).json()
    }
})

router.post("/game", (req, res) => {
    try {
        const url: URL = new URL(req.body.url)
        const socketId: string = req.body.socketId

        const playlistId = url.pathname.replace("/playlist/", "")
        const game = createGame(playlistId, socketId)

        req.io.sockets.sockets.get(socketId)!.join(game.id)

        res.json({
            roomId: game.id
        })

    } catch (e) {
        return res.status(400).json()
    }
})

export default router
