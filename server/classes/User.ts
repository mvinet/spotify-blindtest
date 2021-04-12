export class User {

    /**
     * Socket Id of connected User
     */
    private readonly _id: string

    /**
     * Name of the user
     */
    private readonly _username: string

    /**
     * Create a new User with the following params
     * @param id The socket ID
     * @param username the Name of the user
     */
    constructor(id: string, username: string) {
        this._id = id
        this._username = username
        this._findMusic = false
        this._score = 0
    }

    /**
     * If the user have found the music
     */
    private _findMusic: boolean

    get findMusic(): boolean {
        return this._findMusic
    }

    set findMusic(value: boolean) {
        this._findMusic = value
    }

    /**
     * The score
     */
    private _score: number

    get score(): number {
        return this._score
    }

    set score(value: number) {
        this._score = value
    }

    get id(): string {
        return this._id
    }

    get username(): string {
        return this._username
    }
}
