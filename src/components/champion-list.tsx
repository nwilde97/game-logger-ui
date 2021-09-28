import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {fetchChampList, selectChamps} from "../state/ddragon";
import {useAppDispatch} from "../state/hooks";
import {ChampCard} from "./ChampCard";
import styled from "styled-components";
import {RouteComponentProps} from "@reach/router";

const ListDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const ChampionList = (props: RouteComponentProps) => {

    const dispatch = useAppDispatch();
    const champs = useSelector(selectChamps);

    useEffect(() => {
        dispatch(fetchChampList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <ListDiv>
        {champs.map(champ =>
            <ChampCard key={champ.id} champ={champ}></ChampCard>
        )}
        </ListDiv>
    )

}
