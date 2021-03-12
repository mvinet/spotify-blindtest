import {User} from "./User";

export class Game {

    /**
     * Socket Id of connected User
     */
    private readonly _id: string

    /**
     * Name of the user
     */
    private readonly _playlist: string

    /**
     * User in game
     */
    private readonly _users: User[]

    /**
     * Create a new Game with the following params
     * @param id The socket ID
     * @param playlist the uri of the playlist
     */
    constructor(id: string, playlist: string) {
        this._id = id
        this._playlist = playlist
        this._users = []
    }


    get id(): string {
        return this._id;
    }

    get playlist(): string {
        return this._playlist;
    }

    get users(): User[] {
        return this._users;
    }

}
