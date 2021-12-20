import {RouteComponentProps, useParams} from "@reach/router";
import {Container, Paper} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {selectChamps} from "../state/champions";

export interface ChampViewProps extends RouteComponentProps {
}

export const ChampView = (props: ChampViewProps) => {
  const {champKey}:{champKey: string} = useParams();
  const champs = useSelector(selectChamps);
  const champ = champs?.find(champ => champ.key === champKey);
  return (
    <Container maxWidth={"xl"}>
      <Paper elevation={2} sx={{p: 2, display: "flex", flexWrap: "wrap"}}>
      </Paper>
    </Container>
  )
}
