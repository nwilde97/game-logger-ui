import React from "react";
import styled from "styled-components";
import {ImagePicker} from "./ImagePicker";

export interface SkillPickerProps {
    skills: string[];
}

export const SkillPicker = (props: SkillPickerProps) => {
    return (
        <Container>
            <ImagePicker images={props.skills}></ImagePicker>
            {'>'}
            <ImagePicker images={props.skills}></ImagePicker>
            {'>'}
            <ImagePicker images={props.skills}></ImagePicker>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    gap: 10px;
    line-height: 50px;
    text-align: center;
`
