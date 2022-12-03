import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CatImage } from '../types/CatImage';
import { BackendUrl } from '../Constants';
import Paper from '../components/Paper';
import { ImageList } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CatImageDetailDialog } from './CatImageDetailDialog';
import { StyledImageListItem } from '../components/StyledImageListItem';
import { Favorite } from '../types/Favorite';
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

export const FavoritesList = () => {
    const navigate = useNavigate();

    const [catImages, setCatImages] = useState<CatImage[]>([]);
    const [isLoading, setLoading] = useState(false);

    const fetchCatImages = async () => {
        setLoading(true);
        const response = await axios.get(`${BackendUrl}/favourites?sub_id=maksym-prysiazhnyi&order=DESC`);
        setCatImages(response.data.map((d: Favorite) => d.image));
        setLoading(false);
    };
    const params = useParams();

    useEffect(() => {
        fetchCatImages();
    }, []);

    return (
        <Root>
            <StyledPaper elevation={3}>
                {isLoading && <StyledProgress />}
                {!isLoading && (
                    <ImageList variant="quilted" cols={5} rowHeight={180}>
                        {catImages.map((item) => (
                            <StyledImageListItem
                                id={item.id}
                                src={item.url}
                                key={`catImageItem${item.id}`}
                                href={`/favorites/${item.id}`}
                            />
                        ))}
                    </ImageList>
                )}
            </StyledPaper>

            {params.catImageId && (
                <CatImageDetailDialog
                    open={true}
                    onClose={() => {
                        navigate(`/favorites`);
                    }}
                    onLike={(like) => {
                        fetchCatImages();
                    }}
                />
            )}
        </Root>
    );
};
