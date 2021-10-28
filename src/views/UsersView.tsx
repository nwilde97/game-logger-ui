import {RouteComponentProps} from "@reach/router";
import {Container, Link, Paper, Table, TableBody, TableHead, TableRow} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUsers, selectAllUsers, User} from "../state/users";
import {useEffect} from "react";
import {Link as RLink} from "@reach/router";

export interface UsersViewProps extends RouteComponentProps {

}

export const UsersView = (props: UsersViewProps) => {
  const users: User[] = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(fetchAllUsers());
  },[dispatch]);
  return (
    <Container>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map(user =>
                <TableRow key={user.id}>
                  <TableCell>
                    {user.nickname}
                  </TableCell>
                  <TableCell>
                    <Link component={RLink} to={`/author/${user.id}`}>Entries</Link>
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
