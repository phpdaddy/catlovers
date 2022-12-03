import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CatImage } from '../types/CatImage';
import { BackendUrl } from '../Constants';
import { CircularProgress, Dialog, DialogTitle, IconButton, ImageList, Tooltip } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { StyledImageListItem } from 'components/StyledImageListItem';
import { Breed } from '../types/Breed';

const Root = styled('div')`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const StyledImageList = styled(ImageList)`
    margin-block-start: 0;
    margin-block-end: 0;
`;

export interface CatImageListDialogProps {
    open: boolean;
    onClose: () => void;
    breed?: Breed;
}
const LoadingDialogContentsRoot = styled.div`
    height: 20vh;
    width: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const CatImageListDialog = (props: CatImageListDialogProps) => {
    const { onClose, open } = props;

    const [catImages, setCatImages] = useState<CatImage[]>([]);
    const [isLoading, setLoading] = useState(false);

    const params = useParams();

    const fetchCatImages = async () => {
        setLoading(true);
        const response = await axios.get(`${BackendUrl}/images/search?breed_ids=${params.breedId}&limit=10`);
        setCatImages(response.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCatImages();
    }, []);
    const handleClose = () => {
        onClose();
    };

    let dialogContents = (
        <LoadingDialogContentsRoot>
            <CircularProgress />
        </LoadingDialogContentsRoot>
    );

    if (!isLoading) {
        dialogContents = (
            <>
                <DialogTitle>
                    {props.breed?.name}{' '}
                    <Tooltip title="Load more">
                        <IconButton aria-label="loadMore" size="large" onClick={fetchCatImages}>
                            <Refresh fontSize="inherit" />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <Root>
                    <StyledImageList variant="quilted" cols={Math.min(5, catImages.length)} rowHeight={150}>
                        {catImages.map((item) => (
                            <StyledImageListItem id={item.id} src={item.url} key={`catImageItem${item.id}`} />
                        ))}
                    </StyledImageList>
                </Root>
            </>
        );
    }
    return (
        <Dialog onClose={handleClose} open={open} maxWidth={'md'}>
            {dialogContents}
        </Dialog>
    );
};
