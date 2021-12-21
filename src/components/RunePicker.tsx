import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectRunes} from "../state/runes";
import {Box, Paper} from "@mui/material";
import {RuneTree} from "../model/rune";
import styled from "styled-components";
import {RuneSelection} from "../model/matchup";

export interface RunePickerProps {
  runes: RuneSelection;
  onChange: (runes: RuneSelection) => void
}

export const RunePicker = (props: RunePickerProps) => {
  const [runes, setRunes] = useState({} as RuneSelection);
  const allRunes: RuneTree[] | undefined = useSelector(selectRunes);
  useEffect(()=> {
    setRunes(props.runes);
  },[props]);
  const setSelection = (primary: boolean, position: number, id: number) => {
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

  return (<>
    { allRunes &&
  <Box sx={{display: "flex"}}>
    <Paper elevation={2} sx={{p: 2, width: "300px", m: 2}}>
      <div>
        {
          allRunes.map(rune =>
            <TreeIcon key={rune.id} src={rune.imageUrl} className={rune.id === runes.primary ? "selected" : ""}
                      onClick={() => setRunes({...runes, primary: rune.id, primarySelected: {}})}>
            </TreeIcon>
          )
        }
      </div>
      <div>
        {allRunes.find(tree => tree.id === runes.primary)?.keystones.map(rune =>
          <TreeIcon key={rune.id} src={rune.imageUrl} className={runes.primarySelected[0] === rune.id ? "selected" : ""}
                    onClick={() => setSelection(true, 0, rune.id)}></TreeIcon>
        )}
      </div>
      {
        allRunes.find(tree => tree.id === runes.primary)?.runes.map((secondary, idx) =>
          <div key={idx}>
            {secondary.map(rune =>
              <TreeIcon key={rune.id} src={rune.imageUrl}
                        className={runes.primarySelected[idx + 1] === rune.id ? "selected" : ""}
                        onClick={() => setSelection(true, idx + 1, rune.id)}></TreeIcon>
            )}
          </div>
        )
      }
    </Paper>
    <Paper elevation={2} sx={{p: 2, width: "300px", m: 2}}>
      <div>
        {
          allRunes?.map(rune =>
            <TreeIcon key={rune.id} src={rune.imageUrl} className={rune.id === runes.secondary ? "selected" : ""}
                      onClick={() => setRunes({...runes, secondary: rune.id, secondarySelected: []})}>
            </TreeIcon>
          )
        }
      </div>
      {
        allRunes?.find(tree => tree.id === runes.secondary)?.runes.map((secondary, idx) =>
          <div key={idx}>
            {secondary.map(rune =>
              <TreeIcon key={rune.id} src={rune.imageUrl}
                        className={runes.secondarySelected.some(id => id === rune.id) ? "selected" : ""}
                        onClick={() => setSelection(false, idx, rune.id)}></TreeIcon>
            )}
          </div>
        )
      }
    </Paper>
  </Box>
}
    </>
  )
}

const TreeIcon = styled.img`
  width: 40px;
  margin: 5px;
  border-radius: 25px;
  background: #eee;
  padding: 5px;
  border-collapse: collapse;
  cursor: pointer;
  opacity: 50%;

  &.selected {
    border: solid #FFA000 3px;
    margin: 2px;
    width: 46px;
    opacity: 100%;
  }
`

