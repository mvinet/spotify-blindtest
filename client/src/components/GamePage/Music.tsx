import React, {useEffect, useState} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import {Socket} from "socket.io-client"
import {Grid, Slider} from "@material-ui/core"
import {Album, VolumeDown, VolumeUp} from "@material-ui/icons"

interface CardMusicProps {
    socket: Socket
    music?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        wrapper: {
            margin: theme.spacing(1),
            position: "relative",
        },
        fabProgress: {
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
        },
    }),
)

const Music = (props: CardMusicProps) => {
    const classes = useStyles()

    const [audio, setAudio] = useState<HTMLAudioElement>()
    const [time, setTime] = useState<number>(0)
    const [volume, setVolume] = useState<number>(100)

    useEffect(() => {
        props.socket.on("game/music/time", (i: number) => {
            setTime(i)
        })
    }, [props.socket])

    useEffect(() => {
        if (time === 1) {
            const audio = new Audio(props.music)
            audio.play().then(() => console.debug("Playing " + props.music))
            setAudio(audio)
        }
    }, [props.music, time])

    useEffect(() => {
        if (audio) {
            audio.volume = volume / 10000
        }
    }, [volume, audio])

    const changeVolume = (event: any, newValue: number | number[]) => {
        setVolume(newValue as number)
    }

    const percentage = time >= 30 ? 100 : Math.floor((time / 30) * 100)

    return <Grid container>
        <Grid item xs={12} className={classes.root}>
            <div className={classes.wrapper}>
                <Fab aria-label="audio" color="primary">
                    <Album/>
                </Fab>
                <CircularProgress size={68} variant={"determinate"} color={"secondary"} className={classes.fabProgress} value={percentage}/>
            </div>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item>
                    <VolumeDown/>
                </Grid>
                <Grid item xs>
                    <Slider value={volume} onChange={changeVolume} aria-labelledby="continuous-slider"/>
                </Grid>
                <Grid item>
                    <VolumeUp/>
                </Grid>
            </Grid>
        </Grid>
    </Grid>

}

export default Music