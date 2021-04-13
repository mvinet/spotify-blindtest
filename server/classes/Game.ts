import {User} from "./User"
import {CurrentMusic} from "./CurrentMusic"
import {Spotify} from "../spotify"

export class Game {

    /**
     * Socket Id of connected User
     */
    private readonly _id: string

    private readonly _spotify: Spotify

    /**
     * Create a new Game with the following params
     * @param id The socket ID
     * @param playlist the uri of the playlist
     * @param owner User the creator of the game
     */
    public constructor(id: string, playlist: string, owner: User) {
        this._id = id
        this._playlist = playlist
        this._users = []

        this._spotify = new Spotify()
    }

    /**
     * Name of the playlist
     */
    private _playlist: string

    get playlist(): string {
        return this._playlist
    }

    set playlist(value: string) {
        this._playlist = value
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

    public findNewMusic() {

        return this._spotify.getPlaylist(this.playlist).then(playlist => {
            let random

            do {
                random = Math.floor(Math.random() * playlist.length)
            } while (!playlist[random].track.preview_url)

            this.currentMusic = Object.assign({
                author: playlist[random].track.artists[0].name,
                title: playlist[random].track.name,
                url: playlist[random].track.preview_url
            })

            return this.currentMusic.url
        })

    }

}
