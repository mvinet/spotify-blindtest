import {Router} from "express"
import {getGame} from "../dao/gameDao"

const router = Router()

router.get("/ping", (req, res) => {
    res.json({
        "pong": new Date()
    })
})

router.get("/games", (req, res) => {
    res.json(getGame())
})

export default router
