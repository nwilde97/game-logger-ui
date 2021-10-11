import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`

`

const Star = styled.div`
    display: inline-block;
    cursor: pointer;
    font-size: 36px;
    &:before {
        content: "\\2606";
    }
    &.selected:before {
        content: "\\2605";
    }
`

export const StarRanker = () => {
    return (
        <Wrapper>
            <Star className='selected'></Star>
            <Star className='selected'></Star>
            <Star className='selected'></Star>
            <Star className='selected'></Star>
            <Star></Star>
            <Star></Star>
            <Star></Star>
            <Star></Star>
            <Star></Star>
            <Star></Star>
        </Wrapper>
    )
}
