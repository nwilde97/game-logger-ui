import React, {useEffect, useState} from 'react';
import styled from "styled-components";

export interface ImagePickerProps {
    images: string[];
    onChange?: (image: string) => any;
}

export const ImagePicker = (props: ImagePickerProps) => {
    const [selected, setSelected] = useState('');
    const [choicesVisible, setChoicesVisible] = useState(false);
    const change = (image: string) => {
        setSelected(image);
        if(props.onChange) props.onChange(image);
    };

    useEffect(()=>{
        setChoicesVisible(false);
    }, [selected]);

    return (
        <Container>
            {selected
                ? <Choice src={selected} onClick={()=>setChoicesVisible(true)}></Choice>
                : <Empty onClick={()=>setChoicesVisible(true)}>?</Empty>
            }
            {
            choicesVisible &&
                <Choices>
                    {props.images.map(image =>
                        <Choice src={image} onClick={()=>change(image)} key={image}></Choice>
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
`

const Choice = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
`
