import React from "react"
import Music from "../../model/Music"
import {Grid, Link, Typography} from "@material-ui/core"

interface Props {
    music: Music
}


const MusicInfo = ({music}: Props) => {

    return <Grid container spacing={2}>
        <Grid item xs={1}>
            <Link target="_blank" rel="noopener" href={music.link} color={"inherit"} underline={"none"}>
                <img src={music.cover} alt={"cover"} width={"100%"}/>
            </Link>
        </Grid>
        <Grid item>
            <Link target="_blank" rel="noopener" href={music.link} color={"inherit"} underline={"none"}>
                <Typography variant={"h6"} component={"h6"}>{music.title}</Typography>
            </Link>
            <Link target="_blank" rel="noopener" href={music.link} color={"inherit"} underline={"none"}>
                <Typography>{music.author}</Typography>
            </Link>
        </Grid>

    </Grid>
}

export default MusicInfo