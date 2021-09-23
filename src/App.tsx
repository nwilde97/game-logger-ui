import React from 'react';
import './App.css';
import styled from 'styled-components';

const ChampName = styled.div `
    padding: 5px;
`

function App() {
  return (
    <div className="App">
      List of Champs
        <ChampName>Hello</ChampName>
    </div>
  );
}

export default App;
