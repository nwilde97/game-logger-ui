import {navigate, RouteComponentProps, useParams} from "@reach/router";
import {Box, Card, CardActionArea, CardContent, Container, Paper, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectChamps} from "../state/champions";
import {ChampCard} from "../components/ChampCard";
import {Matchup} from "../model/matchup";
import {Champ} from "../model/champ";
import {StarRanker} from "../components/StarRanker";
import {fetchChampMatchups, selectMatchups} from "../state/matchups";
import {ChampImage} from "../components/ChampImage";

export interface ChampViewProps extends RouteComponentProps {
}

export const ChampView = (props: ChampViewProps) => {
  const dispatch = useDispatch();
  const {champKey}:{champKey: string} = useParams();
  const champs = useSelector(selectChamps);
  useEffect(()=>{
    dispatch(fetchChampMatchups(champKey));
  },[props, dispatch, champKey]);
  const champ = champs?.find(champ => champ.key === champKey);
  const matchups = useSelector(selectMatchups);
  const ratings = matchups.reduce((a,b) => {
    if(a.indexOf(b.rating)<0) a.push(b.rating);
    return a;
  },[] as number[]).sort();
  return (
    <Container maxWidth={"xl"}>
      <Paper elevation={2} sx={{p: 2, display: "flex", flexWrap: "wrap"}}>
        {champ && <ChampCard champ={champ}></ChampCard>}
      </Paper>
      <Box>
        { champs &&
          ratings.map(rating =>
            <Rating key={rating} champs={champs} matchups={matchups.filter(m => m.rating === rating)}></Rating>
          )
        }
      </Box>
    </Container>
  )
}

export const Rating = (props: {matchups: Matchup[], champs: Champ[]}) => {

  return (
    <>
      <StarRanker readonly={true} rating={props.matchups[0].rating}></StarRanker>
      <Box sx={{display: "flex"}}>
        {
          props.matchups.map(matchup =>{
            const champ = props.champs.find(c => c.key === matchup.opponent);
            return (
            <Card sx={{ width: 200, margin: 2 }} key={matchup.opponent}>
              <CardActionArea onClick={()=>navigate(`/matchup/${matchup.id}`)}>
                <ChampImage imageUrl={champ!.image}></ChampImage>
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div">
                    {champ!.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            )
          })
        }
      </Box>
    </>
  )
}
