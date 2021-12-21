import React from "react";
import styled from "styled-components";
import {garen, items, summonerSpells} from "../constants";
import {StarRanker} from "../components/StarRanker";
import {ImagePicker} from "../components/ImagePicker";
import {ItemPicker} from "../components/ItemPicker";
import {SkillPicker} from "../components/SkillPicker";
import {RouteComponentProps} from "@reach/router";
import {Paper, Typography} from "@mui/material";

export interface GameFormProps extends RouteComponentProps {

}

export const GameForm = () => {
    return (
        <Paper elevation={2}>
            <Typography variant={"h6"}>Matchup</Typography>
            <Champs>
                <Champion src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/86.png'></Champion>
                <Champion src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/92.png'></Champion>
            </Champs>
            <Question>How difficult was the matchup?</Question>
            <StarRanker onChange={(num)=> console.log(num)}></StarRanker>
            <Question>Summoner Spells?</Question>
            <Summs>
                <ImagePicker images={summonerSpells}></ImagePicker>
                <ImagePicker images={summonerSpells}></ImagePicker>
            </Summs>
            <Question>Runes?</Question>
            <Runes>
            </Runes>
            <Question>What item progression is best for this matchup?</Question>
            <Items>
            </Items>
            <Question>What combos are most effective for this matchup?</Question>
            <SkillPicker skills={garen.skills}></SkillPicker>
            <Question>Tips for this matchup</Question>
            <Tips></Tips>
        </Paper>
    )
}

const Champs = styled.div`
    display: flex;
    gap: 10px;
`

const Champion = styled.img`

`

const Question = styled.div`
    color: #e0e0e0;
    font-size: 24px;
    margin-top: 15px;
    margin-bottom: 10px;
`

const Tips = styled.textarea`
  height: 200px;
  width: 600px;
  background-color: #4E616C;
  color: #fff;
  font-family: inherit;
  font-size: 20px;
  font-weight: bold;
`

const Summs = styled.div`
    height: 100px;
    display: flex;
    gap: 10px;
`

const Runes = styled.div`
    display: flex;
    gap: 10px;
`

const Items = styled.div`
    display: flex;
    gap: 10px;
`
