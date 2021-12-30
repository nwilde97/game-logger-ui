import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import React from "react";
import {Champ} from "../model/champ";
import {ChampImage} from "./ChampImage";

export const ChampCard = (props: {champ: Champ, onClick?: () => void}) => {
    return (
      <Card sx={{ width: 200, margin: 2 }}>
        <CardActionArea onClick={()=>props.onClick ? props.onClick() : false}>
          <ChampImage imageUrl={props.champ.image}></ChampImage>
          <CardContent>
            <Typography gutterBottom variant="body1" component="div">
              {props.champ.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Roles: {props.champ.roles.join(", ")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}
