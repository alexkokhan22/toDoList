import React, { useEffect } from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializedAppTC, logoutTC, RequestStatusType} from './app-reducer'
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import {Login} from "../features/login/login";
import { CircularProgress } from '@material-ui/core'
import { useCallback } from 'react'

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType>(st => st.app.isInitialized)
    const isLogin = useSelector<AppRootStateType>(st => st.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    const logOutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <HashRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6"></Typography>
                        {isLogin && <Button color="inherit" onClick={logOutHandler}>Log Out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color="secondary"/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={'/'} render={() =>  <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>} />
                </Container>
            </div>
        </HashRouter>
    )
}

export default App
