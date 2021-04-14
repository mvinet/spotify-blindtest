import {User} from "./User"
import {Music} from "./Music"
import {Spotify} from "../spotify"

export class Game {

    /**
     * Socket Id of connected User
     */
    private readonly _id: string

    private readonly _spotify: Spotify

    private _tracks: Music[]

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
        this._tracks = []

        this._spotify = new Spotify()

        this.fetchMusic()

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
    private _currentMusic?: Music

    get currentMusic(): Music {
        return this._currentMusic!
    }

    get id(): string {
        return this._id
    }

    public findNewMusic() {
        const random = Math.floor(Math.random() * this._tracks.length)
        this._currentMusic = this._tracks[random]

        return this._tracks.splice(random, 1)[0]
    }

    private fetchMusic = () => {
        this._spotify.getPlaylist(this.playlist).then(playlist => {

            playlist.items.forEach((item: any) => {
                if (item.track.preview_url) {


                    let name = item.track.name

                    //Supression des accents
                    name.normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")

                    name = name.split("(")[0]
                    name = name.split("-")[0]

                    this._tracks.push(Object.assign({
                        author: item.track.artists[0].name,
                        title: name,
                        url: item.track.preview_url
                    }))
                }
            })

        })
    }

}
