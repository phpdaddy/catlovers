import React from 'react';
import styled from 'styled-components';
import UserList from './pages/UserList';
import { Navigate, Route, Routes } from 'react-router-dom';
import UserDetail from './pages/UserDetail';
import { Container } from '@mui/material';
import PostsList from './pages/CatImageList';
import CatImageDetail from './pages/CatImageDetail';
import AppBar from './components/AppBar';

const Root = styled('div')``;

const App = () => {
    return (
        <Root>
            <AppBar />
            <Container maxWidth="md">
                <Routes>
                    <Route path="/" element={<Navigate to="/users" />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route path="/cat-images" element={<PostsList />} />
                    <Route path="/cat-images/:catImageId" element={<CatImageDetail />} />
                </Routes>
            </Container>
        </Root>
    );
};

export default App;
