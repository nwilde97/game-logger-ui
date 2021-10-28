import React, {Fragment, useEffect} from "react";
import {Login} from "../views/Login";
import {useDispatch, useSelector} from "react-redux";
import {selectDiscordInfo, selectSessionUser, setDiscordInfo, updateLoggedInUser, verifyToken} from "../state/session";
import {Box, Container, LinearProgress} from "@mui/material";

export const Security = (props: any) => {
  const discord = useSelector(selectDiscordInfo);
  const user = useSelector(selectSessionUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!discord) {
      //Check the url params for a token
      const token = window.location.hash?.split("&").find(p => /access_token/.test(p))?.split("=")[1];
      if (token) {
        dispatch(verifyToken(token))
      } else {
        const info = window.localStorage.getItem("session");
        if (info) {
          dispatch(setDiscordInfo(JSON.parse(info)));
        }
      }
    } else {
      //Session info was udpated, need to fetch user details
      dispatch(updateLoggedInUser(discord));
    }
  }, [discord, dispatch]);
  return (
    <Fragment>
      {
        discord && !user ? <Loading />
      : user ? props.children : <Login/>
      }
    </Fragment>
  );
}

export const Loading = () => {
  return (
  <Container maxWidth={"sm"} sx={{marginTop: "20%"}}>
    Please wait while the app loads...
    <LinearProgress />
  </Container>
  );
}
