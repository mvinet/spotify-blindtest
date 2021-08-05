import React from "react"
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core"
import {Face} from "@material-ui/icons"
import Player from "../../model/Player"
import {makeStyles} from "@material-ui/core/styles"

interface Props {
    player: Player
}

const useStyle = makeStyles({
    score: {
        textAlign: "end"
    }
})

const PlayerItem = ({player}: Props) => {
    const classes = useStyle()

    return <ListItem button>
        <ListItemIcon>
            <Face/>
        </ListItemIcon>
        <ListItemText secondary={player._username}/>
        <ListItemText className={classes.score} primary={player._score}/>
    </ListItem>

}

export default PlayerItem