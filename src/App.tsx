import React from 'react';
import './App.css';
import {ChampionList} from "./components/champion-list";
import styled from "styled-components";
import {Router, Link} from "@reach/router";


const AppDiv = styled.div`
    font-family: Arial;
    text-transform: uppercase;
    font-weight: 600;
`

function App() {
    return (
        <AppDiv className="App">
            <Link to="/champs">Champs</Link>
            <Router>
                <ChampionList path="/champs"></ChampionList>
            </Router>
        </AppDiv>
    );
}

export default App;
