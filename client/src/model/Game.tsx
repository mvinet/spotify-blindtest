import Player from "./Player"

interface Game {
    id: string
    users: Player[]
    owner: string
}

export default Game