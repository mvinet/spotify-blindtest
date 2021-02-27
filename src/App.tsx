import React, {useMemo} from 'react'

import {ThemeProvider} from "@material-ui/styles"
import {useLocalStorage} from "./hook/useLocalStorage";
import {NightsStay, WbSunny} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AppBar, CssBaseline, IconButton, Toolbar, Typography} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1
    }
}))

const App = () => {
    const classes = useStyles()
    const [darkMode, setDarkMode] = useLocalStorage("dark", true)

    const theme = useMemo(() => createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
        }
    }), [darkMode])

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBar position={"static"}>
            <Toolbar>
                <Typography variant={"h6"} className={classes.title}>
                    Blind Test
                </Typography>

                <IconButton onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <WbSunny/> : <NightsStay/>}
                </IconButton>
            </Toolbar>
        </AppBar>

    </ThemeProvider>
}

export default App;
