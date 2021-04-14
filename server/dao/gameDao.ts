import {Game} from "../classes/Game"
import {User} from "../classes/User"
import _ from "lodash"
import {SocketId} from "socket.io-adapter"

const games: Game[] = []

export const createGame = (owner: User) => {
    games.push(new Game("id", "3gDtZDbEwVxy5LaUG9G6rr", owner))
}

/**
 * Add User in a game
 * @param user User
 */
export const addPlayerInGame = (user: User) => games[0].users.push(user)

/**
 * Remove User in a game
 * @param id SocketId
 */
export const removePlayerInGame = (id: SocketId) => getGame() && _.remove(games[0].users, {id: id})

/**
 * Return the current game
 */
export const getGame = () => {
    return games[0]
}

export const removeGame = () => {
    games.pop()
}
