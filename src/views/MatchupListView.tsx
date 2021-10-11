import {RouteComponentProps, useParams} from "@reach/router";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {fetchChampList, selectChamps} from "../state/champions";
import {RootState} from "../state/store";
import {ChampCard} from "../components/ChampCard";
import {useAppDispatch} from "../state/hooks";
import {useEffect} from "react";
import {fetchAuthorMatchups, getAuthorMatchups} from "../state/matchups";
import {MatchupList} from "../model/matchup";
import {Champ} from "../services/ddragon.service";

export interface MatchupListViewProps extends RouteComponentProps {
}

export const MatchupListView = (props: MatchupListViewProps) => {
    const {author, champ} = useParams();
    const champList = useSelector(selectChamps);
    const matchupList = useSelector((state: RootState) => getAuthorMatchups(state, author))?.find(matchup => matchup.key === champ);
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
            {author}
            {champion && (<ChampCard champ={champion}></ChampCard>)}
            {matchupList && champList && drawRatings(matchupList, champList)}
        </Container>
    )
}

const drawRatings = ( matchupList: MatchupList, champList: Champ[] ) => {
    const ratings = [...matchupList.matchups];
    ratings.sort((a,b) => a.rating-b.rating);
    return (
        <Ratings>
            {ratings &&
            ratings.map(difficulty =>
                <Rating key={difficulty.rating}>
                    {difficulty.rating}
                    {difficulty.opponents.map(matchup =>
                        {
                            const opponent = champList.find(c => matchup.key === c.key);
                            return (
                                opponent &&
                                <Matchup key={matchup.key}>
                                    {opponent.name}
                                </Matchup>
                            )
                        }
                    )}
                </Rating>
            )}
        </Ratings>
    )
}

const Container = styled.div``
const Ratings = styled.div`
    display: flex;
`
const Rating = styled.div``
const Matchup = styled.div``

