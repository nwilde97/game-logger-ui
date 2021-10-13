import {Link, RouteComponentProps, useParams} from "@reach/router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {fetchAuthorMatchups, selectAuthorMatchups} from "../state/matchups";
import {RootState} from "../state/store";
import {fetchChampList, selectChamps} from "../state/champions";
import {PencilIcon} from "@primer/octicons-react";

export interface AuthorViewProps extends RouteComponentProps {

}

export const AuthorView = (props: AuthorViewProps) => {
    const {author}: {author: string} = useParams();
    const dispatch = useDispatch();
    const matchups = useSelector((state: RootState)=> selectAuthorMatchups(state, author));
    const champs = useSelector(selectChamps);
    useEffect(()=> {
        if(!matchups) dispatch(fetchAuthorMatchups(author));
    }, [dispatch, matchups, author]);
    useEffect(()=> {
        if(!champs) dispatch(fetchChampList());
    }, [dispatch, champs]);
    return (
        <Container>
            <Matchups>
                <Matchup>
                    <Cell></Cell>
                    <Cell>Champion</Cell>
                    <Cell>Opponent</Cell>
                    <Cell>Difficulty</Cell>
                    <Cell>Tips</Cell>
                </Matchup>
            {matchups && champs && matchups.map(matchup =>{
                const champ = champs.find(c => c.key === matchup.champion);
                const opponent = champs.find(c => c.key === matchup.opponent);
                return (
                <Matchup key={`${matchup.champion}o${matchup.opponent}`}>
                    <Cell>
                        <Link to={`/matchup/${author}/${matchup.champion}/${matchup.opponent}`}>
                            <PencilIcon size={24} />
                        </Link>
                    </Cell>
                    <Cell>{champ?.name}</Cell>
                    <Cell>{opponent?.name}</Cell>
                    <Cell>{matchup.rating}</Cell>
                    <Cell>
                        <Comments>
                        {matchup.comments}
                        </Comments>
                    </Cell>
                </Matchup>
                )
            }

            )}
            </Matchups>
        </Container>
    )
}

const Container = styled.div`
    padding: 50px;
`

const Matchups = styled.div`
    border: solid black thin;
    width: 60%;
    margin: auto;
    color: #111;
    & > div:nth-child(even) {
        background-color: #eee;
    }
    & > div:nth-child(odd) {
        background-color: #ddd;
    }
`

const Matchup = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 1.5fr 8fr;
`
const Cell = styled.div`
    font-size: 13px;
    padding: 10px;
`
const Comments = styled.div`
    overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 5; /* number of lines to show */
   -webkit-box-orient: vertical;
`
