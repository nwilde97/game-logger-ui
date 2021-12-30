import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectRunes} from "../state/runes";
import {Box, Paper} from "@mui/material";
import {RuneTree} from "../model/rune";
import styled from "styled-components";
import {RuneSelection} from "../model/matchup";

export interface RunePickerProps {
  runes: RuneSelection;
  onChange: (runes: RuneSelection) => void;
  readonly?: boolean;
}

export const RunePicker = (props: RunePickerProps) => {
  const [runes, setRunes] = useState({} as RuneSelection);
  const allRunes: RuneTree[] | undefined = useSelector(selectRunes);
  useEffect(()=> {
    setRunes(props.runes);
  },[props]);
  const setSelection = (primary: boolean, position: number, id: number) => {
    if(props.readonly) return;
    const newRunes = JSON.parse(JSON.stringify(runes));
    if(primary){
      newRunes.primarySelected[position] = id;
    } else {
      newRunes.secondarySelected.push(id);
      if(newRunes.secondarySelected.length > 2){
        newRunes.secondarySelected = newRunes.secondarySelected.slice(-2)
      }
    }
    setRunes(newRunes);
    props.onChange(newRunes);
  }
  const setMod = (position: number, id: number) => {
    if(props.readonly) return;
    const newRunes = JSON.parse(JSON.stringify(runes));
    newRunes.modSelected[position] = id;
    setRunes(newRunes);
    props.onChange(newRunes);
  }

  return (<>
    { allRunes &&
  <Box sx={{display: "flex"}}>
    <Paper elevation={2} sx={{p: 2, width: "fit-content", m: 2}}>
      <Box sx={style}>
        {
          allRunes.map(rune =>
            <TreeIcon key={rune.id} src={rune.imageUrl} className={rune.id === runes.primary ? "selected" : ""}
                      onClick={() => { if(props.readonly)return; setRunes({...runes, primary: rune.id, primarySelected: [0,0,0,0]})}}>
            </TreeIcon>
          )
        }
      </Box>
      <Box sx={style}>
        {allRunes.find(tree => tree.id === runes.primary)?.keystones.map(rune =>
          <TreeIcon key={rune.id} src={rune.imageUrl} className={runes.primarySelected[0] === rune.id ? "selected" : ""}
                    onClick={() => setSelection(true, 0, rune.id)}></TreeIcon>
        )}
      </Box>
      {
        allRunes.find(tree => tree.id === runes.primary)?.runes.map((secondary, idx) =>
          <Box key={idx} sx={style}>
            {secondary.map(rune =>
              <TreeIcon key={rune.id} src={rune.imageUrl}
                        className={runes.primarySelected[idx + 1] === rune.id ? "selected" : ""}
                        onClick={() => setSelection(true, idx + 1, rune.id)}></TreeIcon>
            )}
          </Box>
        )
      }
    </Paper>
    <Paper elevation={2} sx={{p: 2, width: "fit-content", m: 2}}>
      <Box sx={style}>
        {
          allRunes?.map(rune =>
            <TreeIcon key={rune.id} src={rune.imageUrl} className={rune.id === runes.secondary ? "selected" : ""}
                      onClick={() => { if(props.readonly)return; setRunes({...runes, secondary: rune.id, secondarySelected: []})}}>
            </TreeIcon>
          )
        }
      </Box>
      {
        allRunes?.find(tree => tree.id === runes.secondary)?.runes.map((secondary, idx) =>
          <Box key={idx} sx={style}>
            {secondary.map(rune =>
              <TreeIcon key={rune.id} src={rune.imageUrl}
                        className={runes.secondarySelected.some(id => id === rune.id) ? "selected" : ""}
                        onClick={() => setSelection(false, idx, rune.id)}></TreeIcon>
            )}
          </Box>
        )
      }
      {
        allRunes?.find(tree => tree.id === runes.secondary)?.mods.map((mod, idx) =>
          <Box key={idx} sx={style}>
            {mod.map(rune =>
              <SmallIcon key={rune.id} src={rune.imageUrl}
                        className={runes.modSelected[idx] === rune.id ? "selected" : ""}
                        onClick={() => setMod(idx, rune.id)}></SmallIcon>
            )}
          </Box>
        )
      }
    </Paper>
  </Box>
}
    </>
  )
}

const style = {
  display: "flex",
  gap: 1.5,
  justifyContent: "center",
  m: 1
}

const TreeIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  background: #eee;
  padding: 5px;
  border-collapse: collapse;
  cursor: pointer;
  opacity: 50%;

  &.selected {
    box-shadow: 0 0 10px #FFA000 inset;
    opacity: 100%;
  }

`
const SmallIcon = styled.img`
  height: 24px;
  height: 24px;
  border-radius: 17px;
  background: #eee;
  padding: 5px;
  border-collapse: collapse;
  cursor: pointer;
  opacity: 50%;

  &.selected {
    box-shadow: 0 0 3px #FFA000 inset;
    opacity: 100%;
  }

`


