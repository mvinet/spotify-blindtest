import axios from "axios"

const token = () => "https://accounts.spotify.com/api/token"
const playlist = (id: string) => "https://api.spotify.com/v1/playlists/" + id + "?fields=tracks(items(track(artists(name)%2C%20name%2C%20preview_url)))"

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

    public getPlaylist(id: string) {
        return Spotify.getToken().then(token => {
            return axios.get(playlist(id), {
                headers: {"Authorization": "Bearer " + token}
            }).then(result => result.data.tracks.items)
        })
    }

}