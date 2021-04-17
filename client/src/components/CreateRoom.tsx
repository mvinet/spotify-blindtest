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

const CreateRoom = ({socket, username, open, onClose, setConnected}: Props) => {

    const [url, setUrl] = useState("")
    const [error, setError] = useState(false)

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
        <DialogActions>
            <Button onClick={onClose}>Annuler</Button>
            <Button onClick={handleCreateRoom}>Valider</Button>
        </DialogActions>
    </Dialog>
}

export default CreateRoom