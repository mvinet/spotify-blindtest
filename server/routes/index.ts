import {Router} from "express"
import {getUsers} from "../dao/userDao";

const router = Router()

router.get("/ping", (req, res) => {
    res.json({
        "pong": new Date()
    })
})

router.get("/users", (req, res) => {
    res.json(getUsers())
})

export default router
