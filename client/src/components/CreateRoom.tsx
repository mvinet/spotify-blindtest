import React, {ChangeEvent, useState} from "react"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core"
import axios from "axios"
import {Socket} from "socket.io-client"

interface Props {
    socket: Socket
    username: string
    open: boolean
    onClose: () => void
    setConnected: (roomId: string) => void
}

interface Check {
    available: any[]
    notAvailable: any[]
}

const CreateRoom = ({socket, username, open, onClose, setConnected}: Props) => {

    const [url, setUrl] = useState("")
    const [error, setError] = useState(false)
    const [check, setCheck] = useState<Check>()

    const handleChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value)
    }

    const handleCreateRoom = () => {
        axios.post("/game", {
            url: url,
            socketId: socket.id,
            username: username
        }).then(res => {
            setConnected(res.data.roomId)
        }).catch(() => {
            setError(true)
        })
    }

    const handleCheckMusic = () => {
        if (url) {
            axios.get(`/check?playlist=${url}`).then(res => {
                setCheck(res.data)
            })
        }
    }

    return <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Création d'une room</DialogTitle>
        <DialogContent>
            <TextField
                fullWidth
                margin={"dense"}
                label={"Spotify URL"}
                type={"url"}
                value={url}
                onChange={handleChangeUrl}
                error={error}
                helperText={error && "Mauvaise URL"}
            />
        </DialogContent>
        <DialogContent hidden={!check}>
            {check && <span>{check.available.length}/{check.available.length + check.notAvailable.length} musiques disponible</span>}
        </DialogContent>
        <DialogContent hidden={!check}>
            {check && check.notAvailable.length > 0 && check.notAvailable.map(item => <div key={item.track.id}>
                {item.track.name} by {item.track.artists[0].name}
            </div>)}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Annuler</Button>
            <Button onClick={handleCheckMusic} disabled={!url}>Vérifier les musiques</Button>
            <Button onClick={handleCreateRoom}>Valider</Button>
        </DialogActions>
    </Dialog>
}

export default CreateRoom