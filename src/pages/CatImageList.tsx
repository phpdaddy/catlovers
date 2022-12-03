import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CatImage } from '../types/CatImage';
import { BackendUrl } from '../Constants';
import Paper from '../components/Paper';
import { IconButton, ImageList, Tooltip } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { CatImageDetailDialog } from './CatImageDetailDialog';
import { StyledImageListItem } from '../components/StyledImageListItem';
import { StyledProgress } from '../components/StyledProgress';

const Root = styled('div')`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const StyledPaper = styled(Paper)`
    height: 416px;
    width: 100%;
    position: relative;
`;

export const CatImageList = () => {
    const navigate = useNavigate();

    const [catImages, setCatImages] = useState<CatImage[]>([]);
    const [isLoading, setLoading] = useState(false);

    const fetchCatImages = async () => {
        setLoading(true);
        const response = await axios.get(`${BackendUrl}/images/search?limit=10`);
        setCatImages(response.data);
        setLoading(false);
    };
    const params = useParams();

    useEffect(() => {
        fetchCatImages();
    }, []);

    return (
        <>
            <Root>
                <StyledPaper elevation={3}>
                    {isLoading && <StyledProgress />}
                    {!isLoading && (
                        <ImageList variant="quilted" cols={5} rowHeight={180}>
                            {catImages.map((item) => (
                                <StyledImageListItem id={item.id} src={item.url} key={`catImageItem${item.id}`} />
                            ))}
                        </ImageList>
                    )}
                </StyledPaper>
                <Tooltip title="Load more">
                    <IconButton aria-label="loadMore" size="large" onClick={fetchCatImages}>
                        <Refresh fontSize="inherit" />
                    </IconButton>
                </Tooltip>
                {params.catImageId && <CatImageDetailDialog open={true} onClose={() => navigate(`/cat-images`)} />}
            </Root>
        </>
    );
};
