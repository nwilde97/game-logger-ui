import React from 'react';
import './App.scss';
import styled from "styled-components";
import {Link, RouteComponentProps, Router} from "@reach/router";
import {GameForm} from "./views/GameForm";
import {MatchupPane} from "./views/MatchupPane";
import {MatchupListView} from "./views/MatchupListView";


const AppDiv = styled.div`
    font-family: Arial;
    text-transform: uppercase;
    font-weight: 600;
    
    & > a {
        color: inherit;
        margin: 10px;
    }
`

const Form = (props: RouteComponentProps) => <GameForm></GameForm>
const Matchup = (props: RouteComponentProps) => <MatchupPane></MatchupPane>

function App() {
    return (
        <AppDiv className="App">
            <Link to="">Home</Link>
            <Link to="/matchup">matchup</Link>
            <Link to="/champ/foggedftw2/23">matchup</Link>
            <Router>
                <Form default></Form>
                <Matchup path="/matchup"></Matchup>
                <MatchupListView path="/champ/:author/:champ"></MatchupListView>
            </Router>
        </AppDiv>
    );
}

export default App;
