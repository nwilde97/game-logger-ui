import {Link, RouteComponentProps, useParams} from "@reach/router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {fetchChampList, selectChamps} from "../state/champions";
import {RootState} from "../state/store";
import {ChampCard} from "../components/ChampCard";
import {useAppDispatch} from "../state/hooks";
import React, {useEffect} from "react";
import {fetchAuthorMatchups, selectAuthorMatchupLists} from "../state/matchups";
import {MatchupList} from "../model/matchup";
import {Champ} from "../model/champ";

export interface MatchupListViewProps extends RouteComponentProps {
}

export const MatchupListView = (props: MatchupListViewProps) => {
    const {author, champ} = useParams();
    const champList = useSelector(selectChamps);
    const matchupList = useSelector((state: RootState) => selectAuthorMatchupLists(state, author))?.find(matchup => matchup.key === champ);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(!champList){
            dispatch(fetchChampList());
        }
    }, [dispatch, champList]);
    useEffect(() => {
        if(!matchupList){
            dispatch(fetchAuthorMatchups(author));
        }
    }, [dispatch, matchupList, author]);
    const champion = champList?.find(c => c.key === champ);
    return (
        <Container>
            <Header>
                <h1>Author: {author}</h1>
                <div>Champion: {champion && (<ChampCard champ={champion}></ChampCard>)}</div>
            </Header>
            {matchupList && champList && drawRatings(matchupList, champList, author, champ)}
        </Container>
    )
}

const ratingMap = [
     'Trolling',
     'Trivial',
     'Very Easy',
     'Easy',
     'Easy to Medium',
     'Medium',
     'Medium',
     'Interesting',
     'Hard',
     'Very Hard',
     'Impossible'
]

const drawRatings = ( matchupList: MatchupList, champList: Champ[], author: string, champ: string ) => {
    const ratings = [...matchupList.matchups];
    ratings.sort((a,b) => a.rating-b.rating);
    return (
        <Ratings>
            {ratings &&
            ratings.map(difficulty =>
                <Rating key={difficulty.rating}>
                    Rating: {ratingMap[difficulty.rating]}
                    <Opponents>
                        {difficulty.opponents.map(matchup =>
                            {
                                const opponent = champList.find(c => matchup.key === c.key);
                                return (
                                    opponent &&
                                    <Matchup key={matchup.key}>
                                      <Link to={`/matchup/${author}/${champ}/${opponent.key}`}>
                                        <ChampCard champ={opponent}></ChampCard>
                                      </Link>
                                    </Matchup>
                                )
                            }
                        )}
                    </Opponents>
                </Rating>
            )}
        </Ratings>
    )
}

const Container = styled.div`
    padding: 50px;
`
const Header = styled.div`
    width: 60%;
    margin: auto;
    font-size: 24px;
`
const Ratings = styled.div`
    width: 60%;
    margin: auto;
    padding: 15px;
`
const Rating = styled.div`
    margin-top: 50px;
`
const Opponents = styled.div`
    display: flex;
    gap: 10px;
    flex-flow: wrap;
`
const Matchup = styled.div``

