import {User} from "./User"

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
     * @param owner User the creator of the game
     */
    public constructor(id: string, playlist: string, owner: User) {
        this._id = id
        this._playlist = playlist
        this._currentMusic = "https://p.scdn.co/mp3-preview/104ad0ea32356b9f3b2e95a8610f504c90b0026b?cid=774b29d4f13844c495f206cafdad9c86"
        this._users = []
    }

    /**
     * Current music playing
     */
    private _currentMusic: string

    get currentMusic(): string {
        return this._currentMusic
    }

    set currentMusic(value: string) {
        this._currentMusic = value
    }

    get id(): string {
        return this._id
    }

    get playlist(): string {
        return this._playlist
    }

    get users(): User[] {
        return this._users
    }
}
