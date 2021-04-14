import React from "react"
import Music from "../../model/Music"
import {Grid, Typography} from "@material-ui/core"

interface Props {
    music: Music
}


const MusicInfo = ({music}: Props) => {

    return <Grid container spacing={2}>
        <Grid item xs={1}>
            <img src={music.cover} alt={"cover"} width={"100%"}/>
        </Grid>
        <Grid item>
            <Typography variant={"h6"} component={"h6"}>{music.title}</Typography>
            <Typography>{music.author}</Typography>
        </Grid>

    </Grid>
}

export default MusicInfo