import React, {useEffect, useState} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import AlbumIcon from '@material-ui/icons/Album'
import {Socket} from "socket.io-client"

interface CardMusicProps {
    socket: Socket
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        fabProgress: {
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
    }),
)

const CardMusic = (props: CardMusicProps) => {
    const classes = useStyles()
    const [time, setTime] = useState(0)

    useEffect(() => {
        props.socket.on("game/music/time", (i: number) => {
            console.log(i)
            setTime(i)
        })
    }, [props.socket])

    const percentage = time >= 30 ? 100 : Math.floor((time / 30) * 100)

    return <div className={classes.root}>
        <div className={classes.wrapper}>
            <Fab aria-label="save" color="primary">
                <AlbumIcon/>
            </Fab>
            <CircularProgress size={68} variant={"determinate"} className={classes.fabProgress} value={percentage}/>
        </div>

    </div>

}

export default CardMusic