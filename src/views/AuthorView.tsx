import {Link, RouteComponentProps, useParams} from "@reach/router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect} from "react";
import {deleteMatchup, fetchAuthorMatchups, selectMatchups} from "../state/matchups";
import {selectChamps} from "../state/champions";
import {selectSessionUser} from "../state/session";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from "@mui/material";
import {Add, Cancel, Create, Visibility} from "@mui/icons-material";
import {selectAllUsers} from "../state/users";
import {User} from "../model/user";
import {Matchup} from "../model/matchup";

export interface AuthorViewProps extends RouteComponentProps {

}

export const AuthorView = (props: AuthorViewProps) => {
  const params: { author?: string } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectSessionUser);
  const users = useSelector(selectAllUsers);
  const authorId = params?.author || user!.id;
  const author: User | undefined = users?.find(user => user.id === authorId);
  const matchups = useSelector(selectMatchups);
  const champs = useSelector(selectChamps);
  useEffect(() => {
    dispatch(fetchAuthorMatchups(authorId));
  }, [dispatch, authorId]);
  const remove = (matchup: Matchup) => {
    dispatch(deleteMatchup(matchup.id!));
  }
  return (
    <Container maxWidth={"lg"}>
      <Paper elevation={2} sx={{p: 2}}>
        <Toolbar>
          {user!.id === authorId
            ?
            <Fragment>
              <Typography variant={"h6"} sx={{flexGrow: 1}}>Here are your log entries</Typography>
              <Button component={Link} variant={"contained"} to={`/matchup`} endIcon={<Add/>}>Create
                New</Button>
            </Fragment>
            : <Typography variant={"h6"}>{author?.nickname}'s entries</Typography>
          }
        </Toolbar>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Champion</TableCell>
              <TableCell>Opponent</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Tips</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matchups && champs && matchups.map(matchup => {
                const champ = champs.find(c => c.key === matchup.champion);
                const opponent = champs.find(c => c.key === matchup.opponent);
                return (
                  <TableRow key={`${matchup.id}`}>
                    <TableCell>
                      <Button component={Link} to={`/matchup/${matchup.id}`}>
                        {(user!.id === authorId) && <Create/>}
                        {(user!.id !== authorId) && <Visibility/>}
                      </Button>
                      {
                        user!.id === authorId &&
                        <Button onClick={()=>remove(matchup)}>
                          <Cancel />
                        </Button>
                      }
                    </TableCell>
                    <TableCell>{champ?.name}</TableCell>
                    <TableCell>{opponent?.name}</TableCell>
                    <TableCell>{matchup.rating}</TableCell>
                    <TableCell>
                      <Comments>
                        {matchup.comments}
                      </Comments>
                    </TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      </Paper>

    </Container>
  )
}

const Comments = styled.div`
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 5; /* number of lines to show */
   -webkit-box-orient: vertical;
`
