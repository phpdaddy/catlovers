import React, { useState } from 'react';
import styled from 'styled-components';
import { CircularProgress, ImageListItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface StyledImageListItemProps {
    id: string;
    src: string;
    href?: string;
}
const Root = styled(ImageListItem)`
    cursor: pointer;
`;
const StyledProgress = styled(CircularProgress)`
    position: absolute;
    left: calc(50% - 20px);
    top: calc(50% - 20px);
`;

export const StyledImageListItem = (props: StyledImageListItemProps) => {
    const navigate = useNavigate();
    const [hasImageLoaded, setHasImageLoaded] = useState<boolean>(false);

    return (
        <Root key={`catImageItem${props.id}`}>
            <img
                src={props.src}
                onLoad={() => setHasImageLoaded(true)}
                loading={'lazy'}
                onClick={() => navigate(props.href || `/cat-images/${props.id}`)}
            />
            {!hasImageLoaded && <StyledProgress />}
        </Root>
    );
};
