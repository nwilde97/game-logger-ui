import React, {useEffect, useState} from "react";
import styled from "styled-components";

export const StarRanker = (props: {rating?: number, onChange?:(value:number)=>any, readonly?: boolean}) => {
    const [value, setValue] = useState(0);
    useEffect(()=> {
        if(props.onChange) props.onChange(value);
    }, [props, value]);
    useEffect(()=> {
        setValue(props.rating || 0);
    },[props]);
    const stars = new Array(10);
    stars.fill(true, 0, value || 0);
    stars.fill(false, value || 0);
    return (
        <Wrapper>
            {stars.map((star, idx) =>
                props.readonly
                    ? <Star key={idx} className={star ? 'selected' : ''}></Star>
                : <Star key={idx} className={star ? 'selected' : ''} onClick={()=>setValue(idx+1)}></Star>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`

`

const Star = styled.div`
    display: inline-block;
    cursor: pointer;
    font-size: 36px;
    text-shadow: 1px 1px 4px #282828;
    &:before {
        content: "\\2606";
    }
    &.selected:before {
        content: "\\2605";
    }
`
