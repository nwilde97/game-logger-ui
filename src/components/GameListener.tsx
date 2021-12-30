import {useSelector} from "react-redux";
import {selectListenerStatus} from "../state/league";
import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {selectSessionUser} from "../state/session";
import {selectChamps} from "../state/champions";
import {navigate} from "@reach/router";

export const GameListener = () => {
  const listenerStatus = useSelector(selectListenerStatus);
  const [gameStatus, setGameStatus] = useState("inactive");
  const author = useSelector(selectSessionUser);
  const champions = useSelector(selectChamps);
  const [activeChamp, setActiveChamp] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const yes = () => {
    setOpen(false);
    navigate(`/matchup`);
  }

  useEffect(() => {
    const checkForGame = async () => {
      try {
        const response = await fetch(`https://localhost:2999/liveclientdata/gamestats`, {
          mode: 'cors'
        });
        const game = await response.json();
        const summonerName = game.activePlayer.summonerName;
        const champInfo = game.allPlayers.find((info:any) => info.summonerName === summonerName);
        const champion = champions!.find(champ => champ.name.toLowerCase() === champInfo.championName.toLowerCase());
        setGameStatus("active");
        setActiveChamp(champion!.key);
      } catch (e:any) {
        if (gameStatus === "active") {
          setGameStatus("inactive");
          setOpen(true);
        }
      }
    }

    // Anything in here is fired on component mount.
    const timer = setInterval(async () => {
      if (listenerStatus === "active") {
        await checkForGame()
      }
      // console.log("Tick");
    }, 2_000);
    return () => {
      clearInterval(timer);
    }
  }, [listenerStatus, champions, gameStatus]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"A Game Just Ended"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to record an entry based on the game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={yes} autoFocus variant={"contained"}>Yes</Button>
          <Button onClick={handleClose} variant={"contained"}> No </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
