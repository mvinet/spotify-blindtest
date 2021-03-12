import {Game} from "../classes/Game"
import _ from "lodash";

const games: Game[] = []

/**
 * Return all users in memory
 */
export const getGames = () => {
    return games
}


/**
 * Save a user in the list
 * @param game Game to save
 */
export const save = (game: Game) => {
    if (game) {
        const existingGame = _.find(games, {id: game.id})

        if (existingGame) {
            return
        }

        games.push(game)
    }
}
