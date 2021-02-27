import React, {useEffect, useMemo} from 'react'
import {ThemeProvider} from "@material-ui/styles"
import {useLocalStorage} from "../hook/useLocalStorage"
import {Container, CssBaseline, Grid} from "@material-ui/core"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {DARK_MODE} from "../constantes/localStorage"
import Header from "./Header";
import GamePage from "./GamePage/GamePage";
import {io} from "socket.io-client"

const App = () => {
    const [darkMode, setDarkMode] = useLocalStorage(DARK_MODE, true)

    const theme = useMemo(() => createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
        }
    }), [darkMode])

    useEffect(() => {
        io()
    }, [])

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Grid container spacing={4} style={{overflowX: "hidden"}}>
            <Grid item xs={12}>
                <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
            </Grid>
            <Grid item xs={12}>
                <Container>
                    <GamePage/>
                </Container>
            </Grid>
        </Grid>

    </ThemeProvider>
}

export default App;
