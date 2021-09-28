import {Champ} from "../services/ddragon.service";
import styled from "styled-components";

const ChampImg = styled.img`
    width: 40px;
`

const CardDiv = styled.div`
    width: 200px;
    display: flex;
    margin: 5px;
    padding: 5px;
    background-color: #1e323c;
    color: #eee;
`

export const ChampCard = (props: {champ: Champ}) => {
    return (
        <CardDiv>
            <ChampImg src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${props.champ.id}.png`}></ChampImg>
            {props.champ.name}
        </CardDiv>
    );
}
