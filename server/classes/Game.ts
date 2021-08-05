import {User} from "./User"
import {Music} from "./Music"
import {Spotify} from "../spotify"

export class Game {

    private readonly _id: string
    private readonly _spotify: Spotify
    private readonly _owner: string
    private readonly _tracks: Music[]
    private readonly _playlist: string

    /**
     * Create a new Game with the following params
     * @param id The socket ID
     * @param playlist the uri of the playlist
     * @param owner Owner of the game
     */
    public constructor(id: string, playlist: string, owner: string) {
        this._id = id
        this._playlist = playlist
        this._users = []
        this._tracks = []
        this._owner = owner
        this._totalTrack = 0

        this._spotify = new Spotify()

        this.fetchMusic()

    }

    private _totalTrack: number

    get totalTrack(): number {
        return this._totalTrack
    }


    get tracks(): Music[] {
        return this._tracks
    }

    get playlist(): string {
        return this._playlist
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

    get owner(): string {
        return this._owner
    }

    public findNewMusic() {
        const random = Math.floor(Math.random() * this._tracks.length)
        this._currentMusic = this._tracks[random]

        return this._tracks.splice(random, 1)[0]
    }

    private fetchMusic = () => {
        this._spotify.getPlaylist(this.playlist).then(playlist => {

            playlist.forEach((item: any) => {
                if (item.track.preview_url) {

                    let name = item.track.name

                    name.normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")

                    name = name.split("(")[0]
                    name = name.split("-")[0]

                    this._tracks.push(Object.assign({
                        author: item.track.artists[0].name,
                        title: name.trim(),
                        url: item.track.preview_url,
                        link: item.track.external_urls.spotify,
                        cover: item.track.album.images[0].url
                    }))
                }
            })

            this._totalTrack = this._tracks.length
        })
    }

}
