import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import {Box, Button, Modal} from "@mui/material";
import {useSelector} from "react-redux";
import {selectItems} from "../state/items";
import {Item} from "../model/item";
import {Add} from "@mui/icons-material";

export interface ItemPickerProps {
  onChange: (items: Item[]) => void;
  items: Item[];
}

export const ItemPicker = (props: ItemPickerProps) => {
  const tree = useSelector(selectItems);
  const [items, setItems] = useState([] as Item[]);
  const [open, setOpen] = useState(false);
  useEffect(()=> {
    setItems(props.items);
  },[props]);
  const addItem = (item: Item) => {
    if(items.some(i => i.id === item.id)) return;
    setItems([...items, item]);
    setOpen(false);
    props.onChange(items);
  }
  const removeItem = (item: Item) => {
    setItems(items.filter(i => i.id !== item.id));
    setOpen(false);
    props.onChange(items);
  }
    return (
      <>
        <Box sx={{display: "flex", gap: 1, m: 1, flexWrap: "wrap"}}>
          {
            items.map(item =>
              <ItemSelection src={item.imageUrl} key={item.id} onClick={()=>removeItem(item)}></ItemSelection>
            )
          }
          <Button onClick={()=>setOpen(true)} variant={"contained"} size={"large"}>
            <Add fontSize={"large"} />
          </Button>
        </Box>
        <Modal open={open} onClose={()=>setOpen(false)}>
          <Box sx={style}>
            <Box>
              <Box sx={{display: "flex", gap: 1, m: 3, flexWrap: "wrap"}}>
                {
                  tree?.mythic.map(item =>
                    <ItemImg src={item.imageUrl} key={item.id} onClick={()=>addItem(item)}></ItemImg>
                  )
                }
              </Box>
              <Box sx={{display: "flex", gap: 1, m: 3, flexWrap: "wrap"}}>
                {
                  tree?.legendary.map(item =>
                    <ItemImg src={item.imageUrl} key={item.id} onClick={()=>addItem(item)}></ItemImg>
                  )
                }
              </Box>
              <Box sx={{display: "flex", gap: 1, m: 3, flexWrap: "wrap"}}>
                {
                  tree?.epic.map(item =>
                    <ItemImg src={item.imageUrl} key={item.id} onClick={()=>addItem(item)}></ItemImg>
                  )
                }
              </Box>
              <Box sx={{display: "flex", gap: 1, m: 3, flexWrap: "wrap"}}>
                {
                  tree?.basic.map(item =>
                    <ItemImg src={item.imageUrl} key={item.id} onClick={()=>addItem(item)}></ItemImg>
                  )
                }
              </Box>
            </Box>
          </Box>
        </Modal>
      </>

    )
}

const ItemImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`

const ItemSelection = styled.img`
    height: 50px;
    width: 50px;
  cursor: pointer;
`

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1
};

