import React, {useEffect, useMemo, useState} from 'react'
import {ThemeProvider} from "@material-ui/styles"
import useLocalStorage from "../hook/useLocalStorage"
import {Container, CssBaseline, Grid} from "@material-ui/core"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {DARK_MODE} from "../constantes/localStorage"
import Header from "./Header"
import LoginPage from "./LoginPage"
import {Socket} from "socket.io-client"
import GamePage from "./GamePage/GamePage"
import Game from "../model/Game"

interface AppProps {
    socket: Socket
}

const App = (props: AppProps) => {
    const [darkMode, setDarkMode] = useLocalStorage(DARK_MODE, true)
    const [gameConnected, setConnectedGame] = useState<Game>()

    const theme = useMemo(() => createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
        }
    }), [darkMode])

    useEffect(() => {
        props.socket.on("game/connected", (game: Game) => {
            setConnectedGame(game)
        })
    }, [props.socket])

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Grid container spacing={4} style={{overflowX: "hidden"}}>
            <Grid item xs={12}>
                <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
            </Grid>
            <Grid item xs={12}>
                <Container>
                    {
                        !gameConnected ?
                            <LoginPage socket={props.socket}/>
                            :
                            <GamePage socket={props.socket} game={gameConnected}/>
                    }
                </Container>
            </Grid>
        </Grid>

    </ThemeProvider>
}

export default App
