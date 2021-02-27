import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {NightsStay, WbSunny} from "@material-ui/icons";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1
    }
}))

interface HeaderProps {
    darkMode: boolean,
    setDarkMode: (darkMode: boolean) => any
}

const Header = (props: HeaderProps) => {
    const classes = useStyles()

    return <AppBar position={"static"}>
        <Toolbar>
            <Typography variant={"h6"} className={classes.title}>
                Blind Test
            </Typography>

            <IconButton onClick={() => props.setDarkMode(!props.darkMode)}>
                {props.darkMode ? <WbSunny/> : <NightsStay/>}
            </IconButton>
        </Toolbar>
    </AppBar>
}

export default Header
