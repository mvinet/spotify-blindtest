import {Server, Socket} from "socket.io"
import {User} from "../../classes/User"
import {getGame, getGamesForUser, removeGame, removePlayerInGame} from "../../dao/gameDao"
import _ from "lodash"
import {Game} from "../../classes/Game"

export const GAME_PLAYERS = "game/players"

const intervalInGame: { room: string, interval: NodeJS.Timeout }[] = []

interface GamePlayerJoin {
    username: string
    roomId: string
}

interface GameMusicTry {
    game: string,
    try: string
}


export default (socket: Socket, io: Server) => {
    socket.on("game/join", joinGame(socket))
    socket.on("game/start", start(socket, io))
    socket.on("game/music/try", findMusic(socket))
    socket.on("disconnect", removePlayer(socket))
}

const start = (socket: Socket, io: Server) => ({roomId}: { roomId: string }) => {
    const game = getGame(roomId)

    const timer = (i: number) => {
        setTimeout(() => {
            if (game) {
                io.to(game.id).emit("game/music/time", i++)
                if (i <= 30) {
                    timer(i)
                }
            }
        }, 1000)
    }

    const runMusic = () => {
        if (game) {

            game.users = game.users.map(user => Object.assign(user, {_findMusic: false}))

            io.to(game.id).emit(GAME_PLAYERS, game.users)
            io.to(game.id).emit("game/music/old", game.currentMusic)

            const newMusic = game.findNewMusic()
            io.to(game.id).emit("game/music", newMusic.url)
            io.to(game.id).emit("game/music/number", {
                total: game.totalTrack,
                current: game.totalTrack - game.tracks.length
            })
            timer(0)
        }

    }

    if (game && game.owner === socket.id) {
        runMusic()
        let interval = setInterval(() => {
            runMusic()
        }, 35 * 1000)

        intervalInGame.push({
            interval: interval,
            room: game.id
        })

    }
}

const findMusic = (socket: Socket) => (gameMusicTry: GameMusicTry) => {

    const game = getGame(gameMusicTry.game)!

    const {title, author} = game.currentMusic
    const musicTry = gameMusicTry.try.toLowerCase()

    let find = false
    if (musicTry.trim() === title.toLowerCase() || musicTry.trim() === author.toLowerCase()) {
        find = true
    }

    if (find) {
        let users = game.users

        users = _.map(users, user => user.id !== socket.id ? user : Object.assign(user, {
            _findMusic: true,
            _score: user.score + 1
        }))

        game.users = users
        socket.emit(GAME_PLAYERS, game.users)
        socket.broadcast.emit(GAME_PLAYERS, game.users)
        socket.emit("game/music/try", {
            success: true
        })
    } else {
        socket.emit("game/music/try", {
            success: false
        })
    }
}

const removePlayer = (socket: Socket) => () => {
    const games: Game[] = getGamesForUser(socket.id)
    removePlayerInGame(socket.id)

    games.forEach((game: Game) => {
        socket.broadcast.emit(GAME_PLAYERS, game.users)

        if (game.users.length === 0) {

            clearInterval(_.find(intervalInGame, {room: game.id})!.interval)
            _.remove(intervalInGame, {room: game.id})

            removeGame(game.id)

        }
    })

}

const joinGame = (socket: Socket) => (gamePlayerJoin: GamePlayerJoin) => {
    const user = new User(socket.id, gamePlayerJoin.username)

    const game = getGame(gamePlayerJoin.roomId)

    if (game) {
        socket.join(gamePlayerJoin.roomId)

        game.users.push(user)

        socket.emit("game/connected", {
            id: game.id,
            users: game.users,
            owner: game.owner
        })
        socket.broadcast.emit(GAME_PLAYERS, game!.users)
        socket.on(GAME_PLAYERS, () => socket.emit(GAME_PLAYERS, game!.users))
    }
}