import axios from "axios"

const token = () => "https://accounts.spotify.com/api/token"
const playlist = (id: string) => "https://api.spotify.com/v1/playlists/" + id + "/tracks"


export class Spotify {

    private static getToken() {
        const formData = new URLSearchParams()
        formData.append("grant_type", "client_credentials")


        return axios.post(token(), formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64")
            }
        }).then(result => result.data.access_token)
    }

    public getPlaylist(id: string): Promise<any[]> {
        return Spotify.getToken().then(token => {
            return this.processAllMusicFromPlaylist(token, id, [], null)
        })
    }

    private processAllMusicFromPlaylist(token: string, id: string, data: any[], nextUrl: string | null): Promise<any[]> {
        return axios.get(nextUrl === null ? playlist(id) : nextUrl, {
            headers: {"Authorization": "Bearer " + token}
        }).then(result => {
            const newData = [...data, ...result.data.items]
            if (result.data.next) {
                return this.processAllMusicFromPlaylist(token, id, newData, result.data.next)
            } else {
                return newData
            }
        })
    }
}