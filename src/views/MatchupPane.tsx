import React from 'react';
import styled from "styled-components";

const Container = styled.div`
`

export const MatchupPane = () => {
    return (
        <Container>
            <div>
                <h1>Select your matchup</h1>
            </div>
            <div>
                <div>
                    <input type='text' />
                    <img src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/266.png' alt={''}/>
                </div>
                <div>vs</div>
                <div>
                    <input type='text' />
                    <img src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/86.png' alt={''} />
                </div>
            </div>
            <div>
                Difficulty
            </div>
            <div>
                Comments
            </div>
            <div>
                Summs
            </div>
            <div>
                Runes
            </div>
            <div>
                Items
            </div>
            <div>
                Skills
            </div>
        </Container>
    )
}
