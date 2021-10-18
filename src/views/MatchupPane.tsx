import React, {Fragment, useEffect} from 'react';
import styled from "styled-components";
import {navigate, RouteComponentProps, useParams} from "@reach/router";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthorMatchups, saveMatchup, selectAuthorMatchups} from "../state/matchups";
import {RootState} from "../state/store";
import {StarRanker} from "../components/StarRanker";
import {fetchChampList, selectChamps} from "../state/champions";
import {ChampPicker} from "../components/ChampPicker";
import {selectSessionUser} from "../state/session";

export interface MatchupPaneProps extends RouteComponentProps {

}

export const MatchupPane = (props: RouteComponentProps) => {
    const {champKey, opponentKey, author}:{champKey: string, opponentKey: string, author: string} = useParams();
    const dispatch = useDispatch();
    const champs = useSelector(selectChamps);
    const user = useSelector(selectSessionUser);
    useEffect(()=> {
        if(!champs) dispatch(fetchChampList())
    }, [dispatch, champs]);
    const matchups = useSelector((state: RootState) => selectAuthorMatchups(state, author));
    useEffect(()=> {
        if(!matchups) dispatch(fetchAuthorMatchups(author))
    }, [dispatch, matchups, author]);
    const matchup = matchups?.find(m => m.champion === champKey && m.opponent === opponentKey);
    const champion = champs?.find(c => c.key === matchup?.champion);
    const opponent = champs?.find(c => c.key === matchup?.opponent);
    const data = {
        comments: matchup?.comments || '',
        rating: matchup?.rating || 0,
        champion: matchup?.champion || '',
        opponent: matchup?.opponent || '',
        author
    }
    const save = async () => {
        if(!data.champion || !data.opponent){
            alert("Please complete the form");
        } else {
            dispatch(saveMatchup(data));
            navigate(`/author/${author}`);
        }
    }
    const cancel = () => {
        navigate("/");
    }
    return (
        <Form>
            <Header>Matchup</Header>
            <Champs>
                {champion ? <Champion src={champion.image}></Champion> : <ChampPicker onChange={(c)=>data.champion = c}></ChampPicker>}
                vs.
                {opponent ? <Champion src={opponent.image}></Champion> : <ChampPicker onChange={(c)=>data.opponent = c}></ChampPicker>}
            </Champs>
            <Question>How difficult was the matchup?</Question>
            <StarRanker rating={data.rating} onChange={(value)=>data.rating = value} readonly={user?.username !== author}></StarRanker>
            <Question>Tips for this matchup</Question>
            {
                user?.username === author ?
                <Fragment>
                  <Tips defaultValue={data.comments} onChange={(e)=>data.comments = e.target.value}></Tips>
                  <Buttons>
                    <button onClick={save}>Save</button>
                      <button onClick={cancel}>Cancel</button>
                  </Buttons>
                </Fragment>
                    :
                    <Comments>{data.comments}</Comments>

            }
        </Form>
    )
}
const Form = styled.div`
    margin: auto;
  margin-top: 100px;
  width: fit-content;
  text-shadow: none;
  -webkit-text-stroke: initial;
`

const Header = styled.h1`
    font-size: 24px;
`

const Champs = styled.div`
    display: flex;
    gap: 10px;
`

const Champion = styled.img`
    
`

const Question = styled.div`
    font-size: 24px;
    margin-top: 15px;
    margin-bottom: 10px;
`

const Tips = styled.textarea`
  height: 200px;
  width: 600px;
  background-color: hsl(51,36%,85%);
  font-family: Helvetica;
  font-size: 15px;
    -webkit-text-stroke: initial;
  text-shadow: none;
`

const Comments = styled.div`
    width: 600px;
    font-size: 15px;
  font-weight: bold;
`

const Buttons = styled.div`
    & > button {
        border-radius: 10px;
        border: solid hsl(36deg 31% 54%) 2px;
        background-color: hsl(36deg 31% 64%);
        margin: 5px;
        font-size: 24px;
        font-family: inherit;
    }
`
