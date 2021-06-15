import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {NightsStay, WbSunny} from "@material-ui/icons";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1
    },
    icon: {
        color: "white"
    }
}))

interface HeaderProps {
    darkMode: boolean,
    setDarkMode: (darkMode: boolean) => void
}

const Header = (props: HeaderProps) => {
    const classes = useStyles()

    return <AppBar position={"static"}>
        <Toolbar>
            <Typography variant={"h6"} className={classes.title}>
                Blind Test
            </Typography>

            <IconButton onClick={() => props.setDarkMode(!props.darkMode)}>
                {props.darkMode ? <WbSunny className={classes.icon}/> : <NightsStay className={classes.icon}/>}
            </IconButton>
        </Toolbar>
    </AppBar>
}

export default Header
