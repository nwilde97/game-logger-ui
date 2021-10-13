import {Champ} from "../services/ddragon.service";
import styled from "styled-components";

const ChampImg = styled.img`
    width: 40px;
    height: 40px;
`

const CardDiv = styled.div`
    display: flex;
    padding: 5px;
    background-color: #1e323c;
    color: #eee;
`

export const ChampCard = (props: {champ: Champ}) => {
    return (
        <CardDiv>
            <ChampImg src={props.champ.image}></ChampImg>
            {/*{props.champ.name}*/}
        </CardDiv>
    );
}
