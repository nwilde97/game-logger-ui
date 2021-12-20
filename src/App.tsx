import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectSessionUser, logout} from "./state/session";
import {
  Box,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography
} from "@mui/material";
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {AccountCircle, Assignment, EmojiEvents, Logout, Person} from "@mui/icons-material";
import {AuthorView} from "./views/AuthorView";
import {MatchupPane} from "./views/MatchupPane";
import {MatchupListView} from "./views/MatchupListView";
import {Link, Router} from "@reach/router";
import {ProfileView} from "./views/ProfileView";
import {UsersView} from "./views/UsersView";
import {selectListenerStatus, setListenerStatus} from "./state/league";
import {GameListener} from "./components/GameListener";
import {fetchChampList} from "./state/champions";
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import {fetchAllUsers} from "./state/users";
import {ChampListView} from "./views/ChampListView";

function App() {
  const user = useSelector(selectSessionUser);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchChampList());
    dispatch(fetchAllUsers());
  },[dispatch]);
  const leave = () => {
    dispatch(logout());
  }
  const listenerStatus = useSelector(selectListenerStatus);
  const toggle = () => {
    dispatch(setListenerStatus(listenerStatus === "active" ? "inactive" : "active"));
  }

  // Functionality for user menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      {listenerStatus === "active" && <GameListener />}
        <Box sx={{display: 'flex'}}>
          <AppBar position="absolute">
            <Toolbar>
              <Typography component="h1" variant="h6" sx={{flexGrow: 1}}>
                Noted.gg
              </Typography>
              {listenerStatus === "active" &&
                <Fragment>
                  (Currently Tracking
                  <OnlinePredictionIcon titleAccess={"Tracking games"} /> )
                </Fragment>
              }
              <Typography component="h1" variant="h6" sx={{pr: 1, pl: 2}}>
                Hello {user!.nickname}!
              </Typography>
              <IconButton onClick={handleClick}>
                <Person></Person>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={true}>
            <Toolbar/>
            <div>
              <ListItem button component={Link} to={`/`}>
                <ListItemIcon>
                  <Assignment/>
                </ListItemIcon>
                <ListItemText primary="My Entries" color={"inherit"}/>
              </ListItem>
              {/*<ListItem button component={Link} to={`/champ/demo-user/23`}>*/}
              {/*  <ListItemIcon>*/}
              {/*    <Assignment/>*/}
              {/*  </ListItemIcon>*/}
              {/*  <ListItemText primary="Tryndamere Matchups"/>*/}
              {/*</ListItem>*/}
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
              <MatchupPane path="/matchup/:author/:champKey/:opponentKey"></MatchupPane>
              <MatchupPane path="/matchup/:author/:champKey"></MatchupPane>
              <MatchupPane path="/matchup/:author"></MatchupPane>
              <MatchupListView path="/champ/:author/:champ"></MatchupListView>
              <AuthorView path="/author/:author"></AuthorView>
              <ProfileView path="/profile"></ProfileView>
              <UsersView path="/users"></UsersView>
              <ChampListView path="/champs"></ChampListView>
            </Router>
          </Box>
        </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to={"/profile"}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={toggle}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          { listenerStatus === "inactive" ? "Track Games" : "Stop Tracking Games" }
        </MenuItem>
        <Divider />
        <MenuItem onClick={leave} >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

export default App;

const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar)(({theme}) => ({
  zIndex: theme.zIndex.drawer + 1
}));

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
