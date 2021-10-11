import React from "react";
import styled from "styled-components";

export interface RunePickerProps {
    rune: {
        name: string;
        icon: string;
        icons: string[][];
    },
    secondary?: boolean;
}

export const RunePicker = (props: RunePickerProps) => {
    return (
    <Container>
        <Tree>
            <TreeIcon src={props.rune.icon}></TreeIcon>
            {props.rune.name}
        </Tree>
        {
            props.rune.icons.map((runeSet, idx) =>
                <Runes key={idx}>
                    {
                        runeSet.map(rune =>
                            <Rune src={rune} key={rune}></Rune>
                        )
                    }
                </Runes>)
        }
    </Container>
    )
}

const Container = styled.div`
    width: 200px;
    background-color: #111;
    padding: 15px;
    border-radius: 15px;
`

const Tree = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const TreeIcon = styled.img`
    width: 30px;
`

const Runes = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`

const Rune = styled.img`
    width: 30px;
    margin: 10px;
`
