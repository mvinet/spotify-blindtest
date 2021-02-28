export class User {

    /**
     * Socket Id of connected User
     */
    id: string

    /**
     * Name of the user
     */
    username: string

    /**
     * Create a new User with the following params
     * @param id The socket ID
     * @param username the Name of the user
     */
    constructor(id: string, username: string) {
        this.id = id
        this.username = username
    }
}
