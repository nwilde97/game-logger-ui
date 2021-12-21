import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Box, Menu} from "@mui/material";

export interface SummonerPickerProps {
  f?: string;
  d?: string;
  readonly?: boolean;
}

const summonerSpells = [
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summonerbarrier.png',
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_exhaust.png',
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_flash.png',
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_haste.png',
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_heal.png',
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summonerignite.png',
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_smite.png',
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner_teleport.png'
]

export const SummonerPicker = (props: SummonerPickerProps) => {
  const [f, setF] = useState("");
  const [d, setD] = useState("");
  const [option, setOption] = useState("d");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    setF(props.f || summonerSpells[2]);
    setD(props.d || summonerSpells[7]);
  }, [props]);
  const choose = (summ: string) => {
    if(option === "d") setD(summ);
    if(option === "f") setF(summ);
    setAnchorEl(null);
  }
  return (
    <>
      <Box sx={{display: "flex", gap: 1, p: 1}}>
        {
          f && <Choice src={f} onClick={(event) => {if(props.readonly)return; setAnchorEl(event.currentTarget); setOption("f");}}></Choice>
        }
        {
          d && <Choice src={d} onClick={(event) => {if(props.readonly)return; setAnchorEl(event.currentTarget); setOption("d");}}></Choice>
        }

      </Box>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <Box sx={{display: "flex", gap: 1, p: 1}}>
          {
            summonerSpells.map(summ =>
              <Choice src={summ} key={summ} onClick={()=>choose(summ)}></Choice>
            )
          }
        </Box>
      </Menu>
    </>
  )
}

const Choice = styled.img`
    height: 40px;
    width: 40px;
    cursor: pointer;
    border-radius: 5px;
`
