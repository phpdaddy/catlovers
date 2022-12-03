import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BackendUrl } from '../Constants';
import Paper from '../components/Paper';
import { Typography } from '@mui/material';
import { Breed } from '../types/Breed';
import { CatImageListDialog } from './CatImageListDialog';
import { StyledProgress } from '../components/StyledProgress';

const Root = styled('div')``;

export const BreedList = () => {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBreeds = async () => {
            setLoading(true);
            const response = await axios.get(`${BackendUrl}/breeds`);
            setBreeds(response.data);
            setLoading(false);
        };
        fetchBreeds();
    }, []);

    return (
        <Root>
            {isLoading && <StyledProgress />}
            {breeds.map((breed) => (
                <Paper elevation={3} key={`userItem${breed.id}`}>
                    <Link to={`/breeds/${breed.id}`}>
                        <Typography variant="h6">
                            <strong>{breed.name}</strong>
                        </Typography>
                    </Link>
                    <div>
                        <strong>Life span:</strong> {breed.life_span}
                    </div>
                    <div>
                        <strong>Weight imperial:</strong> {breed.weight.imperial}
                    </div>
                    <div>
                        <strong>Weight metric:</strong> {breed.weight.metric}
                    </div>
                    <div>
                        <strong>Origin:</strong> {breed.origin}
                    </div>
                </Paper>
            ))}
            {params.breedId && (
                <CatImageListDialog
                    open={true}
                    onClose={() => navigate(`/breeds`)}
                    breed={breeds.find((b) => b.id === params.breedId)}
                />
            )}
        </Root>
    );
};
