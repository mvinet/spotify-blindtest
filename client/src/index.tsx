import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {io, Socket} from "socket.io-client";

const socket: Socket = io()

ReactDOM.render(
    <React.StrictMode>
        <App socket={socket}/>
    </React.StrictMode>,
    document.getElementById('root')
)
