import {User} from "./User"
import {CurrentMusic} from "./CurrentMusic"

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
     * Create a new Game with the following params
     * @param id The socket ID
     * @param playlist the uri of the playlist
     * @param owner User the creator of the game
     */
    public constructor(id: string, playlist: string, owner: User) {
        this._id = id
        this._playlist = playlist
        this._currentMusic = new CurrentMusic("https://p.scdn.co/mp3-preview/104ad0ea32356b9f3b2e95a8610f504c90b0026b?cid=774b29d4f13844c495f206cafdad9c86", "Muse", "Uprising")
        this._users = []
    }

    /**
     * User in game
     */
    private _users: User[]

    get users(): User[] {
        return this._users
    }

    set users(value: User[]) {
        this._users = value
    }

    /**
     * Current music playing
     */
    private _currentMusic?: CurrentMusic

    get currentMusic(): CurrentMusic {
        return this._currentMusic!
    }

    set currentMusic(value: CurrentMusic) {
        this._currentMusic = value
    }

    get id(): string {
        return this._id
    }
}
