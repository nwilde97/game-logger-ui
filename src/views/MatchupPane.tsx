import React, {useEffect} from 'react';
import {navigate, RouteComponentProps, useParams} from "@reach/router";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthorMatchups, saveMatchup, selectAuthorMatchups} from "../state/matchups";
import {RootState} from "../state/store";
import {StarRanker} from "../components/StarRanker";
import {fetchChampList, selectChamps} from "../state/champions";
import {ChampPicker} from "../components/ChampPicker";
import {selectSessionUser} from "../state/session";
import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import styled from "styled-components";
import {RunePicker} from "../components/RunePicker";
import {ItemPicker} from "../components/ItemPicker";
import {Item} from "../model/item";
import {SummonerPicker} from "../components/SummonerPicker";

export interface MatchupPaneProps extends RouteComponentProps {

}

export const MatchupPane = (props: RouteComponentProps) => {
  const {champKey, opponentKey, author}: { champKey: string, opponentKey: string, author: string } = useParams();
  const dispatch = useDispatch();
  const champs = useSelector(selectChamps);
  const user = useSelector(selectSessionUser);
  useEffect(() => {
    if (!champs) dispatch(fetchChampList())
  }, [dispatch, champs]);
  const matchups = useSelector((state: RootState) => selectAuthorMatchups(state, author));
  useEffect(() => {
    if (!matchups) dispatch(fetchAuthorMatchups(author))
  }, [dispatch, matchups, author]);
  const matchup = matchups?.find(m => m.champion === champKey && m.opponent === opponentKey);
  const champion = champs?.find(c => c.key === champKey);
  const opponent = champs?.find(c => c.key === opponentKey);
  const data = {
    comments: matchup?.comments || '',
    rating: matchup?.rating || 0,
    champion: matchup?.champion || '',
    opponent: matchup?.opponent || '',
    author: user!.nickname,
    runes: matchup?.runes || {
      primarySelected: {},
      secondarySelected: [],
      modSelected: {}
    },
    items: matchup?.items || [] as Item[]
  }
  const save = async () => {
    if (!data.champion || !data.opponent || !data.comments) {
      alert("Please complete the form");
    } else {
      dispatch(saveMatchup([author, data]));
      navigate(`/author/${author}`);
    }
  }
  const cancel = () => {
    navigate(-1);
  }
  return (
    <Container maxWidth={"lg"}>
      <Paper elevation={2} sx={{p: 2}}>
        <Question>Matchup</Question>
        <Champs>
          {user?.id !== author ? <Champion src={champion?.image}></Champion> :
            <ChampPicker onChange={(c) => data.champion = c} champKey={data.champion}></ChampPicker>}
          vs.
          {user?.id !== author ? <Champion src={opponent?.image}></Champion> :
            <ChampPicker onChange={(c) => data.opponent = c} champKey={data.opponent}></ChampPicker>}
        </Champs>
        <Question>How difficult was the matchup?</Question>
        <StarRanker rating={data.rating} onChange={(value) => data.rating = value}
                    readonly={user?.id !== author}></StarRanker>
        <Question>Tips for this matchup</Question>
        {
          user?.id === author ?
            <>
              <TextField
                label="Tips..."
                placeholder="Tips..."
                multiline
                minRows={10}
                sx={{width: 600}}
                defaultValue={data.comments} onChange={(e) => data.comments = e.target.value}
              />
              <Box sx={{display: "flex", gap: 2, m: 5}}>
                <Button variant={"contained"} onClick={save}>Save</Button>
                <Button variant={"contained"} onClick={cancel}>Cancel</Button>
              </Box>
            </>
            :
            <Comments>{data.comments}</Comments>
        }
        <Question>Runes</Question>
        <RunePicker runes={data.runes} onChange={(runes) => data.runes = runes} readonly={user?.id !== author}></RunePicker>
        <Question>Summoner Spells</Question>
        <SummonerPicker d={matchup?.d} f={matchup?.f} readonly={user?.id !== author}></SummonerPicker>
        <Question>Items</Question>
        <ItemPicker items={data.items} onChange={(items) => data.items = items} readonly={user?.id !== author}></ItemPicker>
      </Paper>
    </Container>
  )
}

const Question = (props: any) => {
  return (<Typography variant={"h6"} sx={{mt: 5, mb: 3}}>{props.children}</Typography>)
}

const Champs = styled.div`
  display: flex;
  gap: 10px;
`

const Champion = styled.img``

const Comments = styled.div`
  width: 600px;
  font-size: 15px;
  font-weight: bold;
`
