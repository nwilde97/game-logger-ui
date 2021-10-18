import React, {Fragment, useEffect} from 'react';
import './App.scss';
import styled from "styled-components";
import {Link, Router} from "@reach/router";
import {MatchupPane} from "./views/MatchupPane";
import {MatchupListView} from "./views/MatchupListView";
import {AuthorView} from "./views/AuthorView";
import {useDispatch, useSelector} from "react-redux";
import {selectSessionUser, setUser, verifyToken} from "./state/session";
import {Login} from "./views/Login";

function App() {
    const user = useSelector(selectSessionUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            //Check the url params for a token
            const token = window.location.hash?.split("&").find(p => /access_token/.test(p))?.split("=")[1];
            if (token) {
                dispatch(verifyToken(token));
            } else {
                const info = window.localStorage.getItem("session");
                if (info) {
                    dispatch(setUser(JSON.parse(info)));
                }
            }
        }
    }, [user, dispatch]);
    return (
        user ?
            <AppDiv className="App">

                <Fragment>
                    <Header>
                        <User>Hello {user.username}!</User>
                        <Logo>Notes.gg</Logo>
                        <Links>
                            <Link to={`/author/${user.username}`}>My Stuff</Link>
                            <Link to="/author/foggedftw2">Fogged Matchups</Link>
                            <Link to="/champ/foggedftw2/23">Tryndamere Matchups</Link>
                        </Links>
                    </Header>
                    <Router primary={false}>
                        <AuthorView default></AuthorView>
                        <MatchupPane path="/matchup/:author/:champKey/:opponentKey"></MatchupPane>
                        <MatchupPane path="/matchup/:author"></MatchupPane>
                        <MatchupListView path="/champ/:author/:champ"></MatchupListView>
                        <AuthorView path="/author/:author"></AuthorView>
                    </Router>
                </Fragment>
            </AppDiv>

            :
            <Login></Login>
    );
}

export default App;

const AppDiv = styled.div`
  -webkit-text-stroke: 1px hsl(51,36%,10%);
  text-shadow: 0px 4px 4px #282828;
  font-family: 'Kalam', cursive;
  position: relative;
`
const Header = styled.div`
    position: fixed;
    top: 0px;
    height: 55px;
    left: 0px;
    right: 0px;
    background: linear-gradient(to right, hsl(51,36%,39%) 0%, hsl(51,36%,60%) 10% ,hsl(51,36%,60%) 90%,hsl(51,36%,39%) 100%);
`

const Links = styled.div`
    display: flex;
    gap: 15px;
    margin: auto;
    width: fit-content;
    line-height: 55px;
`

const User = styled.div`
    float: right;
    font-size: 24px;
    padding: 15px;
`
const Logo = styled.div`
    font-size: 24px;
    padding: 15px;
    float: left;
`
