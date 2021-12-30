import {CardMedia} from "@mui/material";
import React from "react";

export const ChampImage = (props:{imageUrl: string}) => (
  <CardMedia
    component="img"
    image={props.imageUrl}
    sx={{borderRadius: 40, width: 80, margin: "auto", marginTop: 2}}
  />
)
