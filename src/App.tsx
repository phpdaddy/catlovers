import React from 'react';
import styled from 'styled-components';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Container } from '@mui/material';
import { CatImageList } from './pages/CatImageList';

import { BreedList } from './pages/BreedList';
import { AppBar } from './components/AppBar';
import { FavoritesList } from './pages/FavoritesList';

const Root = styled('div')``;

const App = () => {
    return (
        <Root>
            <AppBar />
            <Container maxWidth="md">
                <Routes>
                    <Route path="/" element={<Navigate to="/cat-images" />} />
                    <Route path="/breeds" element={<BreedList />} />
                    <Route path="/breeds/:breedId" element={<BreedList />} />
                    <Route path="/cat-images" element={<CatImageList />} />
                    <Route path="/cat-images/:catImageId" element={<CatImageList />} />
                    <Route path="/favorites" element={<FavoritesList />} />
                    <Route path="/favorites/:catImageId" element={<FavoritesList />} />
                </Routes>
            </Container>
        </Root>
    );
};

export default App;
