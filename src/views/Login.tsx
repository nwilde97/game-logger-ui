import React, {Fragment} from "react";
import styled from "styled-components";

export const Login = () => {
    const callback = encodeURIComponent(`${window.location.protocol}//${window.location.host}/login`);
    const url = `https://discord.com/api/oauth2/authorize?client_id=897642271082680361&redirect_uri=${callback}&response_type=token&scope=identify&prompt=none`;
    return (
        <Fragment>
            <Frame>
                <Welcome>Welcome to Notes.gg!</Welcome>
                <Welcome>Please sign in below</Welcome>
            </Frame>
            <Link href={url}>Sign in</Link>
            <Instructions>This will redirect you to Discord's website for logging in.</Instructions>
        </Fragment>
    )
}

const Frame = styled.div`
    position: relative;
    margin: auto;
    margin-top: 5%;
    width: fit-content;
    padding: 50px;
    border-radius: 25px;
    box-shadow: rgba(0,0,0,0.6) 0px 0px 10px;
`
const Welcome = styled.div`
  color: #333;
  font-size: 56px;
  -webkit-text-stroke: 1px #282828;
  text-shadow: 0px 4px 4px #282828;
  font-family: 'Kalam', cursive;
`

const Link = styled.a`
    margin: auto;
  display: block;
  width: fit-content;
  margin-top: 50px;
  padding: 25px;
  border-radius: 10px;
  border: solid hsl(36deg 31% 54%) 3px;
  background-color: hsl(36deg 31% 64%);
  color: #fff !important;
    font-size: 47px;
    -webkit-text-stroke: 2px #000;
    text-decoration: none;
    font-weight: bold;
`

const Instructions = styled.div`
    width: fit-content;
    margin: auto;
`
