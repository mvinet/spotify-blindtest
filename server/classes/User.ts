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
    }

    get id(): string {
        return this._id
    }

    get username(): string {
        return this._username
    }
}
