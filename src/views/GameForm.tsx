import React from "react";
import styled from "styled-components";
import {garen, items, runes, summonerSpells} from "../constants";
import {StarRanker} from "../components/StarRanker";
import {ImagePicker} from "../components/ImagePicker";
import {RunePicker} from "../components/RunePicker";
import {ItemPicker} from "../components/ItemPicker";
import {SkillPicker} from "../components/SkillPicker";

export const GameForm = () => {
    return (
        <Form>
            <Header>Matchup</Header>
            <Champs>
                <Champion src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/86.png'></Champion>
                <Champion src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/92.png'></Champion>
            </Champs>
            <Question>How difficult was the matchup?</Question>
            <StarRanker></StarRanker>
            <Question>Summoner Spells?</Question>
            <Summs>
                <ImagePicker images={summonerSpells}></ImagePicker>
                <ImagePicker images={summonerSpells}></ImagePicker>
            </Summs>
            <Question>Runes?</Question>
            <Runes>
                <RunePicker rune={runes[0]}></RunePicker>
                <RunePicker rune={runes[1]} secondary={true}></RunePicker>
            </Runes>
            <Question>What item progression is best for this matchup?</Question>
            <Items>
                <ItemPicker eqList={items}></ItemPicker>
            </Items>
            <Question>What combos are most effective for this matchup?</Question>
            <SkillPicker skills={garen.skills}></SkillPicker>
            <Question>Tips for this matchup</Question>
            <Tips></Tips>
        </Form>
    )
}
const Form = styled.div`
  margin: 50px;
`

const Header = styled.h1`
    color: #e0e0e0;
    font-size: 24px;
`

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
