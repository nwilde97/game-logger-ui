import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectChamps} from "../state/champions";
import {Champ} from "../model/champ";
import {Box, Modal} from "@mui/material";

export interface ChampPickerProps {
  onChange: (champ: string) => any;
  champKey?: string;
}

export const ChampPicker = (props: ChampPickerProps) => {
  const [selected, setSelected] = useState({image: ''});
  const [open, setOpen] = useState(false);
  const change = (champ: Champ) => {
    setSelected({...champ});
    setOpen(false);
    if (props.onChange) props.onChange(champ.key);
  };
  const champs = useSelector(selectChamps);
  useEffect(() => {
    const champ = champs?.find(c => props.champKey === c.key);
    setSelected(champ || {image: ''});
  }, [props, champs]);
  return (
    <>
      {selected.image
        ? <SelectedChamp src={selected.image} onClick={() => setOpen(true)}></SelectedChamp>
        : <Empty onClick={() => setOpen(true)}>?</Empty>
      }
      <Modal open={open} onClose={()=>setOpen(false)}>
        <Box sx={style}>
          <Box sx={{display: "flex", flexWrap: "wrap", p: 1, gap: 1}}>
            {champs?.map(champ =>
              <Choice src={champ.image} onClick={() => change(champ)} key={champ.key} title={champ.name}></Choice>
            )}
          </Box>
        </Box>
      </Modal>

    </>
  )
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 610,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1
};

const Empty = styled.div`
    height: 75px;
    width: 75px;
    font-size: 36px;
    line-height: 75px;
    text-align: center;
    background-color: hsl(51,36%,85%);
    cursor: pointer;
`

const Choice = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
    border-radius: 15px;
`


const SelectedChamp = styled.img`
    height: 75px;
    width: 75px;
    cursor: pointer;
`
