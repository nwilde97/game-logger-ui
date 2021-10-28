import React from "react";
import {RouteComponentProps} from "@reach/router";
import {useDispatch, useSelector} from "react-redux";
import {saveUser, selectDiscordInfo, selectSessionUser} from "../state/session";
import {Button, Container, Divider, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import {Facebook, Instagram, Tv, Twitter, YouTube} from "@mui/icons-material";
import {User} from "../state/users";

export interface ProfileViewProps extends RouteComponentProps {

}

export const ProfileView = (props:ProfileViewProps) => {
  const user = useSelector(selectSessionUser);
  const discord = useSelector(selectDiscordInfo);
  const data: User = {...user!};
  const dispatch = useDispatch();
  const save = () => {
    dispatch(saveUser(data));
  }
  return (
    <Container maxWidth={"md"}>
      <Paper sx={{m: 3, p: 3, display: "flex", flexDirection: "column", gap: 3}}>
        <Typography variant={"h4"}>{discord!.username}</Typography>
        <Divider />
        {/*<TextField variant={"outlined"} label={"Avatar"} defaultValue={user!.avatar}></TextField>*/}
        <TextField variant={"outlined"} label={"Nickname"} defaultValue={user!.nickname} onChange={(e)=>data.nickname = e.target.value} />
        <TextField variant={"outlined"} label={"Tell us about yourself"} defaultValue={user!.description} multiline rows={5} onChange={(e)=>data.description = e.target.value} />
        <TextField variant={"outlined"} label={"Facebook"} defaultValue={user!.facebook}
                   onChange={(e)=>data.facebook = e.target.value}
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                         <Facebook />
                       </InputAdornment>
                     ),
                   }} />
        <TextField variant={"outlined"} label={"Twitter"} defaultValue={user!.twitter}
                   onChange={(e)=>data.twitter = e.target.value}
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                         <Twitter />
                       </InputAdornment>
                     ),
                   }}/>
        <TextField variant={"outlined"} label={"Instagram"} defaultValue={user!.instagram}
                   onChange={(e)=>data.instagram = e.target.value}
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                         <Instagram />
                       </InputAdornment>
                     ),
                   }}/>
        <TextField variant={"outlined"} label={"Twitch"} defaultValue={user!.twitch}
                   onChange={(e)=>data.twitch = e.target.value}
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                         <Tv />
                       </InputAdornment>
                     ),
                   }}/>
        <TextField variant={"outlined"} label={"YouTube"} defaultValue={user!.youtube}
                   onChange={(e)=>data.youtube = e.target.value}
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start">
                         <YouTube />
                       </InputAdornment>
                     ),
                   }}/>
        <Button variant={"contained"} onClick={save}>Save</Button>
      </Paper>
    </Container>
  );
}
