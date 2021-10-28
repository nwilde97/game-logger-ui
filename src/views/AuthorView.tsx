import {Link, RouteComponentProps, useParams} from "@reach/router";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import React, {Fragment, useEffect} from "react";
import {fetchAuthorMatchups, selectAuthorMatchups} from "../state/matchups";
import {RootState} from "../state/store";
import {fetchChampList, selectChamps} from "../state/champions";
import {selectSessionUser} from "../state/session";
import {
  Container,
  Paper,
  Toolbar,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import {Add, Create, Visibility} from "@mui/icons-material";

export interface AuthorViewProps extends RouteComponentProps {

}

export const AuthorView = (props: AuthorViewProps) => {
  const params: { author?: string } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectSessionUser);
  const author = params?.author || user!.id;
  const matchups = useSelector((state: RootState) => selectAuthorMatchups(state, author));
  const champs = useSelector(selectChamps);
  useEffect(() => {
    if (!matchups) dispatch(fetchAuthorMatchups(author));
  }, [dispatch, matchups, author, user]);
  useEffect(() => {
    if (!champs) dispatch(fetchChampList());
  }, [dispatch, champs]);
  return (
    <Container maxWidth={"lg"}>
      <Paper elevation={2} sx={{p: 2}}>
        <Toolbar>
          {user!.id === author
            ?
            <Fragment>
              <Typography variant={"h6"} sx={{flexGrow: 1}}>Here are your log entries</Typography>
              <Button component={Link} variant={"contained"} to={`/matchup/${user!.id}`} endIcon={<Add/>}>Create
                New</Button>
            </Fragment>
            : <Typography variant={"h6"}>{author}'s entries</Typography>
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
                  <TableRow key={`${matchup.champion}o${matchup.opponent}`}>
                    <TableCell>
                      <Button component={Link} to={`/matchup/${author}/${matchup.champion}/${matchup.opponent}`}>
                        {(user!.id === author) && <Create/>}
                        {(user!.id !== author) && <Visibility/>}
                      </Button>
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
