import {navigate, RouteComponentProps} from "@reach/router";
import {Container, Paper} from "@mui/material";
import React from "react";
import {ChampCard} from "../components/ChampCard";
import {useSelector} from "react-redux";
import {selectChamps} from "../state/champions";

export interface ChampListViewProps extends RouteComponentProps {
}

export const ChampListView = (props: ChampListViewProps) => {
  const champs = useSelector(selectChamps);
  return (
    <Container maxWidth={"xl"}>
      <Paper elevation={2} sx={{p: 2, display: "flex", flexWrap: "wrap"}}>
        {champs?.map(champ => (
          <ChampCard champ={champ} key={champ.key} onClick={()=>navigate(`/champ/${champ.key}`)} />
        ))}
      </Paper>
    </Container>
  )
}
