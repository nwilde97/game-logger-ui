import {Link, RouteComponentProps, useParams} from "@reach/router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect} from "react";
import {fetchAuthorMatchups, selectAuthorMatchups} from "../state/matchups";
import {RootState} from "../state/store";
import {fetchChampList, selectChamps} from "../state/champions";
import {EyeIcon, PencilIcon,} from "@primer/octicons-react";
import {selectSessionUser} from "../state/session";

export interface AuthorViewProps extends RouteComponentProps {

}

export const AuthorView = (props: AuthorViewProps) => {
    const params: {author?: string} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectSessionUser);
    const author = params?.author || user!.username;
    const matchups = useSelector((state: RootState)=> selectAuthorMatchups(state, author));
    const champs = useSelector(selectChamps);
    useEffect(()=> {
        if(!matchups) dispatch(fetchAuthorMatchups(author));
    }, [dispatch, matchups, author, user]);
    useEffect(()=> {
        if(!champs) dispatch(fetchChampList());
    }, [dispatch, champs]);
    return (
        <Container>
            {user!.username === author
                ?
                <Header>
                    <Link to={`/matchup/${user!.username}`}>Create New</Link>
                    <div>Here are your log entries</div>
                </Header>
                : <div>{author}'s entries</div>
            }
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
                            {(user!.username === author) && <PencilIcon size={24} />}
                            {(user!.username !== author) && <EyeIcon size={24} />}
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
    width: 60%;
    margin: auto;
    font-size: 30px;
    margin-top: 75px;
`

const Header = styled.div`
    & > a {
        float: right;
        padding: 5px 25px;
        border-radius: 10px;
        border: solid hsl(36deg 31% 54%) 2px;
        background-color: hsl(36deg 31% 64%);
        margin: 5px;
        text-decoration: none;
    }
`

const Matchups = styled.div`
    clear: both;
    border: solid black thin;
    color: #111;
    text-shadow: none;
    font-family: Helvetica;
    -webkit-text-stroke: initial;
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
