import {Router} from "express"
import {createGame, getGame, getGames} from "../dao/gameDao"

const router = Router()

router.get("/ping", (req, res) => {
    res.json({
        "pong": new Date()
    })
})

router.get("/games", (req, res) => {
    res.json(getGames())
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
