import React, {Fragment, useEffect} from 'react';
import './App.scss';
import styled from "styled-components";
import {Link, Router} from "@reach/router";
import {MatchupPane} from "./views/MatchupPane";
import {MatchupListView} from "./views/MatchupListView";
import {AuthorView} from "./views/AuthorView";
import {useDispatch, useSelector} from "react-redux";
import {selectSessionUser, setUser, verifyToken} from "./state/session";
import {LandingPage} from "./views/Landing";
import {Login} from "./views/Login";


const AppDiv = styled.div`
    font-family: Arial;
    text-transform: uppercase;
    font-weight: 600;
    
    & > a {
        color: inherit;
        margin: 10px;
    }
`

// const Form = (props: RouteComponentProps) => <GameForm></GameForm>

function App() {
    const user = useSelector(selectSessionUser);
    const dispatch = useDispatch();
    useEffect(()=> {
        if(!user){
            //Check the url params for a token
            const token = window.location.hash?.split("&").find(p => /access_token/.test(p))?.split("=")[1];
            if(token){
                dispatch(verifyToken(token));
            } else {
                const info = window.localStorage.getItem("session");
                if(info){
                    dispatch(setUser(JSON.parse(info)));
                }
            }
        }
    },[user, dispatch]);
    return (
        <AppDiv className="App">
            {
                user ?
                    <Fragment>
                      <Link to={`/matchup/${user.username}`}>Blank Form</Link>
                      <Link to={`/author/${user.username}`}>My User Matchups</Link>
                      <Link to="/author/foggedftw2">Fogged Matchups</Link>
                      <Link to="/champ/foggedftw2/23">Tryndamere Matchups</Link>
                      <Router>
                        <LandingPage default></LandingPage>
                        <MatchupPane path="/matchup/:author/:champKey/:opponentKey"></MatchupPane>
                        <MatchupPane path="/matchup/:author"></MatchupPane>
                        <MatchupListView path="/champ/:author/:champ"></MatchupListView>
                        <AuthorView path="/author/:author"></AuthorView>
                      </Router>
                    </Fragment>
                    :
                    <Login></Login>
            }
        </AppDiv>
    );
}

export default App;
