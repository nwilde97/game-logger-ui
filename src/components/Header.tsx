import {Divider, IconButton, ListItemIcon, Menu, MenuItem, styled, Toolbar, Typography} from "@mui/material";
import {Link} from "@reach/router";
import {AccountCircle, Logout, Person} from "@mui/icons-material";
import React, {Fragment} from "react";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import {useDispatch, useSelector} from "react-redux";
import {selectListenerStatus, setListenerStatus} from "../state/league";
import {GameListener} from "./GameListener";
import {logout, selectSessionUser} from "../state/session";
import MuiAppBar from "@mui/material/AppBar";

export const Header = () => {
  const user = useSelector(selectSessionUser);
  const dispatch = useDispatch();
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
  const leave = () => {
    dispatch(logout());
  }
  return(
  <>
    {listenerStatus === "active" && <GameListener />}
    <AppBar position="absolute">
      <Toolbar>
        <Typography component="h1" variant="h6" sx={{flexGrow: 1}}>
          Noted.gg
        </Typography>
        {listenerStatus === "active" &&
        <Fragment>
          (Currently Tracking
          <OnlinePredictionIcon titleAccess={"Tracking games"}/> )
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
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
    >
      <MenuItem component={Link} to={"/profile"}>
        <ListItemIcon>
          <AccountCircle/>
        </ListItemIcon>
        Profile
      </MenuItem>
      <MenuItem onClick={toggle}>
        <ListItemIcon>
          <AccountCircle/>
        </ListItemIcon>
        {listenerStatus === "inactive" ? "Track Games" : "Stop Tracking Games"}
      </MenuItem>
      <Divider/>
      <MenuItem onClick={leave}>
        <ListItemIcon>
          <Logout fontSize="small"/>
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  </>
  )
}

const AppBar = styled(MuiAppBar)(({theme}) => ({
  zIndex: theme.zIndex.drawer + 1
}));

