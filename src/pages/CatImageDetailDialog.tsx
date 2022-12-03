import React, { useEffect, useState } from 'react';
import { CircularProgress, Dialog, IconButton, ImageListItemBar } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BackendUrl } from '../Constants';
import { CatImage } from '../types/CatImage';
import styled from 'styled-components';
import { Favorite as FavoriteIcon, FavoriteBorder } from '@mui/icons-material';
import { StyledProgress } from '../components/StyledProgress';

export interface CatImageDetailDialogProps {
    open: boolean;
    onClose: () => void;
    onLike?: (like: boolean) => void;
}

const StyledImage = styled.img`
    max-height: 80vh;
`;

const LoadingDialogContentsRoot = styled.div`
    height: 20vh;
    width: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const CatImageDetailDialog = (props: CatImageDetailDialogProps) => {
    const { onClose, open } = props;
    const params = useParams();

    const [catImage, setCatImage] = useState<CatImage>();
    const [isImageLoaded, setImageLoaded] = useState<boolean>(false);
    const [favoriteId, setFavoriteId] = useState<string>();
    const [isLoading, setLoading] = useState(false);

    const fetchCatImage = async () => {
        const response = await axios.get(`${BackendUrl}/images/${params.catImageId}`);
        setCatImage(response.data);
    };
    const fetchIsFavorite = async (catImageId: string) => {
        setLoading(true);
        const response = await axios.get(`${BackendUrl}/favourites?image_id=${catImageId}`);
        setFavoriteId(response.data?.[0]?.id);
        setLoading(false);
    };

    useEffect(() => {
        fetchCatImage();
    }, []);
    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        catImage?.id && fetchIsFavorite(catImage.id);
    }, [catImage?.id]);

    let dialogContents = (
        <LoadingDialogContentsRoot>
            <CircularProgress />
        </LoadingDialogContentsRoot>
    );

    if (!isLoading && catImage) {
        dialogContents = (
            <>
                <StyledImage src={catImage.url} onLoad={() => setImageLoaded(true)} loading={'lazy'} />{' '}
                {!isImageLoaded && <StyledProgress />}
                <ImageListItemBar
                    title={
                        <>
                            {catImage.breeds?.map((b) => {
                                return (
                                    <Link to={`/breeds/${b.id}`} key={b.id}>
                                        {b.name}
                                    </Link>
                                );
                            })}
                        </>
                    }
                    actionIcon={
                        <IconButton
                            onClick={async () => {
                                const rawBody = {
                                    image_id: catImage.id,
                                    sub_id: 'maksym-prysiazhnyi',
                                };

                                if (!favoriteId) {
                                    const axiosResponse = await axios.post(
                                        'https://api.thecatapi.com/v1/favourites',
                                        rawBody
                                    );
                                    setFavoriteId(axiosResponse.data.id);
                                    props.onLike?.(true);
                                } else {
                                    await axios.delete(`https://api.thecatapi.com/v1/favourites/${favoriteId}`);
                                    setFavoriteId(undefined);
                                    props.onLike?.(false);
                                }
                            }}>
                            {!favoriteId && <FavoriteBorder />}
                            {favoriteId && <FavoriteIcon />}
                        </IconButton>
                    }
                />
            </>
        );
    }
    return (
        <Dialog onClose={handleClose} open={open}>
            {dialogContents}
        </Dialog>
    );
};
