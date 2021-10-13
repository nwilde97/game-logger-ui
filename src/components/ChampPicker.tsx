import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Champ} from "../services/ddragon.service";
import {useDispatch, useSelector} from "react-redux";
import {fetchChampList, selectChamps} from "../state/champions";

export interface ChampPickerProps {
    onChange: (champ: string) => any;
}

export const ChampPicker = (props: ChampPickerProps) => {
    const [selected, setSelected] = useState({image: ''});
    const [choicesVisible, setChoicesVisible] = useState(false);
    const change = (champ: Champ) => {
        setSelected(champ);
        if(props.onChange) props.onChange(champ.key);
    };

    useEffect(()=>{
        setChoicesVisible(false);
    }, [selected]);
    const dispatch = useDispatch();
    const champs = useSelector(selectChamps);
    useEffect(()=> {
        if(!champs) dispatch(fetchChampList());
    }, [champs, dispatch]);

    return (
        <Container>
            {selected.image
                ? <Choice src={selected.image} onClick={()=>setChoicesVisible(true)}></Choice>
                : <Empty onClick={()=>setChoicesVisible(true)}>?</Empty>
            }
            {
            choicesVisible && champs &&
                <Choices>
                    {champs.map(champ =>
                        <Choice src={champ.image} onClick={()=>change(champ)} key={champ.key}></Choice>
                    )}
                </Choices>
            }
        </Container>
    )
}

const Container = styled.div`
    position: relative;
`

const Empty = styled.div`
    height: 50px;
    width: 50px;
    font-size: 36px;
    line-height: 50px;
    text-align: center;
    background-color: #4E616C;
    cursor: pointer;
`

const Choices = styled.div`
    position: absolute;
    top: 50px;
    display: flex;
    z-index: 1;
    width: 500px;
`

const Choice = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
`
