import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {Champ} from "../model/champ";

export const ChampCard = (props: {champ: Champ}) => {
    return (
      <Card sx={{ width: 200, margin: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={props.champ.image}
            sx={{borderRadius: 40, width: 80, margin: "auto", marginTop: 2}}
          />
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
