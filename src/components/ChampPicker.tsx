import React, {RefObject, useEffect, useRef, useState} from 'react';
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
        setSelected({...champ});
        if(props.onChange) props.onChange(champ.key);
    };
    useEffect(()=> {
        if(choicesVisible) inputRef.current?.focus();
    },[choicesVisible]);
    const hide = () => {
        setTimeout(()=> {
            setChoicesVisible(false)
        },100);
    }

    const dispatch = useDispatch();
    const champs = useSelector(selectChamps);
    useEffect(()=> {
        if(!champs) dispatch(fetchChampList());
    }, [champs, dispatch]);
    const inputRef:RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
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
            <Hidden>
                <input ref={inputRef} onBlur={()=>hide()}/>
            </Hidden>
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
    background-color: hsl(51,36%,85%);
    cursor: pointer;
`

const Choices = styled.div`
    position: absolute;
    top: 50px;
    z-index: 1;
    width: 700px;
`

const Choice = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
`

const Hidden = styled.div`
    position: fixed;
    top: -100px;
    left: 0px;
    height: 1px;
    width: 1px;
`
