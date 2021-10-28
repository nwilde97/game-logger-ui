import React from "react";
import {Box, Button, Container, Paper, styled, Typography} from "@mui/material";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'my-login': any;
    }
  }
}

export const Login = () => {
  const callback = encodeURIComponent(`${window.location.protocol}//${window.location.host}/login`);
  const url = `https://discord.com/api/oauth2/authorize?client_id=897642271082680361&redirect_uri=${callback}&response_type=token&scope=identify&prompt=none`;

  return (
    <Box sx={{p:25, textAlign: 'center', backgroundColor: theme => theme.palette.grey[100], height: "100vh"}}>
      <Container maxWidth={"md"}>
        <Paper elevation={5}>
          <Welcome variant={"h1"}>Welcome to Noted.gg!</Welcome>
          <Box sx={{p:2, gap: 3, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Typography component="h3" variant={"h3"}>Please sign in using the link below</Typography>
            <Button component={"a"} variant={"contained"} href={url}>
              <Typography component={"h5"} variant={"h5"}>Sign in</Typography>
            </Button>
            <Typography variant={"body1"}>This will redirect you to Discord's website for logging in.</Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

const Welcome = styled(Typography, {
  shouldForwardProp: (prop) => true
})(({theme}) => ({
  background: theme.palette.primary.dark,
  padding: theme.spacing(3),
  WebkitTextStroke: "1px #282828",
  textShadow: "0px 4px 4px #282828",
}))
