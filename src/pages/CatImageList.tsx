import styled from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Post } from '../types/Post';
import { BackendUrl } from '../Constants';
import Paper from '../components/Paper';
import { CircularProgress, IconButton, ImageList, ImageListItem, Tooltip } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const Root = styled('div')`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const StyledPaper = styled(Paper)`
    height: 416px;
    width: 100%;
`;

const StyledProgress = styled(CircularProgress)`
    position: absolute;
    left: calc(50% - 20px);
    top: calc(50% - 20px);
`;
const StyledImageListItem = styled(ImageListItem)`
    cursor: pointer;
`;

const CatImageList = () => {
    const navigate = useNavigate();

    const [catImages, setCatImages] = useState<Post[]>([]);

    const [hasImageLoaded, setHasImageLoaded] = useState<{ [k: string]: boolean }>({});
    const fetchCatImages = async () => {
        const response = await axios.get(`${BackendUrl}/images/search?limit=10`);
        setCatImages(response.data);
    };

    useEffect(() => {
        fetchCatImages();
    }, []);

    return (
        <Root>
            <StyledPaper elevation={3}>
                <ImageList variant="quilted" cols={5} rowHeight={180}>
                    {catImages.map((item) => (
                        <StyledImageListItem key={`catImageItem${item.id}`}>
                            <img
                                src={item.url}
                                onLoad={() => setHasImageLoaded({ ...hasImageLoaded, [item.id]: true })}
                                loading={'lazy'}
                                onClick={() => navigate(`/cat-images/${item.id}`)}
                            />
                            {!hasImageLoaded[item.id] && <StyledProgress />}
                        </StyledImageListItem>
                    ))}
                </ImageList>
            </StyledPaper>
            <Tooltip title="Load more">
                <IconButton aria-label="loadMore" size="large" onClick={fetchCatImages}>
                    <Refresh fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </Root>
    );
};

export default CatImageList;
