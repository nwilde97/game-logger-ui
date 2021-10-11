import React, {useState} from 'react'
import styled from "styled-components";
import {ImagePicker} from "./ImagePicker";

export interface ItemPickerProps {
    eqList: string[]
}

export const ItemPicker = (props: ItemPickerProps) => {
    const [items, setItems]: [string[], any] = useState(['']);
    const addItem = (item: string) => {
        if(item){
            const updated = [...items];
            updated.splice(items.length-1, 0, item);
            setItems(updated);
        }
    }
    return (
        <Container>
            {items.map((item, idx) =>
                <Item key={idx}>
                    <ImagePicker images={props.eqList} onChange={(selected) => item === '' ? addItem(selected) : false}></ImagePicker>
                    {'>'}
                </Item>
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    gap: 10px;
`

const Item = styled.div`
    display: flex;
    gap: 10px;
    line-height: 50px;
    text-align: center;
`
