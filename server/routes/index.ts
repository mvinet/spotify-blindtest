import {Router} from "express"
import {getUsers} from "../dao/userDao";
import {getGames} from "../dao/gameDao";

const router = Router()

router.get("/ping", (req, res) => {
    res.json({
        "pong": new Date()
    })
})

router.get("/users", (req, res) => {
    res.json(getUsers())
})

router.get("/games", (req, res) => {
    res.json(getGames())
})

export default router
