import {Socket} from "socket.io"
import {User} from "../../classes/User"
import {addPlayerInGame, createGame, getGame, removeGame, removePlayerInGame} from "../../dao/gameDao"
import _ from "lodash"

export const GAME_PLAYERS = "game/players"

interface GamePlayerJoin {
    username: string
}

interface GameMusicTry {
    game: string,
    try: string
}

export default (socket: Socket) => {

    socket.on("game/join", (gamePlayerJoin: GamePlayerJoin) => {
        joinGame(socket, gamePlayerJoin)
    })

    socket.on("game/music/try", findMusic(socket))

    socket.on("disconnect", () => {
        removePlayer(socket)
    })
}

const findMusic = (socket: Socket) => {
    return (gameMusicTry: GameMusicTry) => {
        const {title, author} = getGame().currentMusic
        const musicTry = gameMusicTry.try.toLowerCase()

        let find = false
        if (musicTry.search(title.toLowerCase()) !== -1 || musicTry.search(author.toLowerCase()) !== -1) {
            find = true
        }

        if (find) {
            let users = getGame().users

            users = _.map(users, user => user.id !== socket.id ? user : Object.assign(user, {
                _findMusic: true,
                _score: user.score + 1
            }))

            getGame().users = users
            socket.emit(GAME_PLAYERS, getGame().users)
            socket.broadcast.emit(GAME_PLAYERS, getGame().users)
            socket.emit("game/music/try", {
                success: true
            })
        } else {
            socket.emit("game/music/try", {
                success: false
            })
        }
    }
}

const removePlayer = (socket: Socket) => {
    removePlayerInGame(socket.id)
    if (getGame()) {
        socket.broadcast.emit(GAME_PLAYERS, getGame().users)

        if (getGame().users.length === 0) {
            removeGame()
        }
    }
}

const joinGame = (socket: Socket, gamePlayerJoin: GamePlayerJoin) => {
    const user = new User(socket.id, gamePlayerJoin.username)

    if (!getGame()) {
        createGame(user)
    }

    socket.join(getGame().id)

    addPlayerInGame(user)

    socket.emit("game/connected", getGame())
    socket.broadcast.emit(GAME_PLAYERS, getGame().users)
    socket.on(GAME_PLAYERS, () => socket.emit(GAME_PLAYERS, getGame().users))
}