import React, {useCallback, useEffect} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import {useDispatch} from "react-redux";
import {useSeaSelector} from "./store";
import img2 from '../Images/wallpaperflare.com_wallpaper (1).jpg'
import styled from "styled-components";
import {initializedSeaApp, seaStatusTypes} from './SeaAppReducer';
import Error from "../Components/Error";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import SeaLogin from "../Features/SeaLogin/SeaLogin";
import {Route, Routes} from 'react-router-dom';
import SeaMain from "../Features/Todolists/SeaMain";
import {seaLoginOutTC} from "../Features/SeaLogin/SeaAuthReducer";

export const App = () => {
    const seaStatus = useSeaSelector<seaStatusTypes>(state => state.app.seaStatus)
    const isInitializedApp = useSeaSelector<boolean>(state => state.app.isInitialized)
    const isLoginIn = useSeaSelector<boolean>(state => state.auth.isLoginIn)


    const dispatch = useDispatch()
    const logout = useCallback(() => {
        dispatch(seaLoginOutTC())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializedSeaApp())
    }, [dispatch])

    if (!isInitializedApp) {
        return <AppCase
            style={{width: '100%', height: '100vh', display: 'flex', justifyContent: "center", alignItems: 'center'}}
        >
            <CircularProgress style={{color: 'hotpink'}} size={150} thickness={6}/>
        </AppCase>
    }
    return (
        <AppCase>
            <AppBarCase>
                <ToolbarCase>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        SEA_TODOLIST
                    </Typography>
                    {isLoginIn ? <Button color="inherit" style={{color: 'hotpink'}}
                                         onClick={logout}>sea_OUT</Button>
                        : <></>}
                </ToolbarCase>
            </AppBarCase>
            {seaStatus === 'loading' && <LinearProgress color="inherit" style={{color: 'hotpink', height: '7px'}}/>}
            <Container fixed>
                <Routes>
                    <Route path={'/login'} element={<SeaLogin/>}/>
                    <Route path={'/SeaTodolist'} element={<SeaMain/>}/>
                </Routes>
            </Container>
            <Error/>
        </AppCase>
    );
}

export const AppCase = styled.div`
  background: url('${img2}') no-repeat center/cover;
  height: 100vh;
  overflow: auto
`
export const AppBarCase = styled.div`
  opacity: 0.65;
  background-color: #071421;
  color: #F3D9D4
`
export const ToolbarCase = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

