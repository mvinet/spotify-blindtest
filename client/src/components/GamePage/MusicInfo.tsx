import React from "react"
import Music from "../../model/Music"
import {Card, CardActionArea, CardContent, CardMedia, Grid, Link, Tooltip, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {percent} from "csx"

interface Props {
    music: Music
}

const useStyle = makeStyles({
    cover: {
        width: 100
    }
})

const MusicInfo = ({music}: Props) => {
    const classes = useStyle()

    return <Grid container>
        <Tooltip title={"Voir la musique sur Spotify"}>
            <Card style={{width: percent(100)}}>
                <Link target={"_blank"} rel={"noopener"} href={music.link} color={"inherit"} underline={"none"}>
                    <CardActionArea>
                        <Grid container>
                            <Grid item>
                                <CardMedia
                                    className={classes.cover}
                                    component={"img"}
                                    height={100}
                                    title={music.title}
                                    src={music.cover}
                                />
                            </Grid>
                            <Grid item>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {music.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {music.author}
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Grid>

                    </CardActionArea>
                </Link>
            </Card>
        </Tooltip>
    </Grid>
}

export default MusicInfo