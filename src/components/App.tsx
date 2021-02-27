import React, {useMemo} from 'react'

import {ThemeProvider} from "@material-ui/styles"
import {useLocalStorage} from "../hook/useLocalStorage"
import {CssBaseline} from "@material-ui/core"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import Header from "./Header"
import {DARK_MODE} from "../constantes/localStorage"


const App = () => {
    const [darkMode, setDarkMode] = useLocalStorage(DARK_MODE, true)

    const theme = useMemo(() => createMuiTheme({
        palette: {
            type: darkMode ? "dark" : "light",
        }
    }), [darkMode])

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>

        <div style={{height: "100%", width: "100%"}}>

        </div>

    </ThemeProvider>
}

export default App;
