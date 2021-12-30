import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Box, ListItem, ListItemIcon, ListItemText, styled, Toolbar} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import {Assignment, EmojiEvents} from "@mui/icons-material";
import {AuthorView} from "./views/AuthorView";
import {MatchupPane} from "./views/MatchupPane";
import {Link, Router} from "@reach/router";
import {ProfileView} from "./views/ProfileView";
import {UsersView} from "./views/UsersView";
import {fetchChampList} from "./state/champions";
import {fetchAllUsers} from "./state/users";
import {ChampListView} from "./views/ChampListView";
import {fetchRuneList} from "./state/runes";
import {fetchItemList} from "./state/items";
import {ChampView} from "./views/ChampView";
import {Header} from "./components/Header";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChampList());
    dispatch(fetchAllUsers());
    dispatch(fetchRuneList());
    dispatch(fetchItemList());
  }, [dispatch]);

  return (
    <Box sx={{display: 'flex'}}>
      <Header></Header>
      <Drawer variant="permanent" open={true}>
        <Toolbar/>
        <div>
          <ListItem button component={Link} to={`/`}>
            <ListItemIcon>
              <Assignment/>
            </ListItemIcon>
            <ListItemText primary="My Entries" color={"inherit"}/>
          </ListItem>
          <ListItem button component={Link} to={`/users`}>
            <ListItemIcon>
              <Assignment/>
            </ListItemIcon>
            <ListItemText primary="All Users"/>
          </ListItem>
          <ListItem button component={Link} to={`/champs`}>
            <ListItemIcon>
              <EmojiEvents/>
            </ListItemIcon>
            <ListItemText primary="Champions"/>
          </ListItem>
        </div>
      </Drawer>
      <Box component="main" sx={{
        backgroundColor: theme => theme.palette.grey[100],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
        <Toolbar sx={{mb: 5}}/>
        <Router primary={false}>
          <AuthorView default></AuthorView>
          <MatchupPane path="/matchup/:id"></MatchupPane>
          <MatchupPane path="/matchup"></MatchupPane>
          <AuthorView path="/author/:author"></AuthorView>
          <ProfileView path="/profile"></ProfileView>
          <UsersView path="/users"></UsersView>
          <ChampListView path="/champs"></ChampListView>
          <ChampView path="/champ/:champKey"></ChampView>
        </Router>
      </Box>
    </Box>
  );
}

export default App;

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer)(
  ({theme}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  }),
);
