import {Game} from "../classes/Game"
import _ from "lodash"
import {SocketId} from "socket.io-adapter"

const games: Game[] = []

export const createGame = (playlist: string, owner: string) => {

    const newGame = new Game(Math.random().toString(36).substr(2, 9), playlist, owner)
    games.push(newGame)

    return newGame
}


/**
 * Remove User in a game
 * @param id SocketId
 */
export const removePlayerInGame = (id: SocketId) => {
    games.forEach(game => {
        _.remove(game.users, {id: id})
    })
}

/**
 * Return the current game
 */
export const getGame = (id: string) => {
    return _.find(games, {id: id})
}


export const getGamesForUser = (id: string): Game[] => games.filter(game => _.find(game.users, {id: id}))

export const removeGame = (id: string) => {
    _.remove(games, {id: id})
}


export const getGames = () => games