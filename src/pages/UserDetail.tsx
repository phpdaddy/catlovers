import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types/User';
import { Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { BackendUrl } from '../Constants';
import { Post } from '../types/Post';
import Paper from '../components/Paper';

const Root = styled('div')``;

export const UserDetail = () => {
    const [user, setUser] = useState<User | undefined>();
    const [posts, setPosts] = useState<Post[]>([]);

    const params = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`${BackendUrl}/users/${params.userId}`);
            setUser(response.data);
        };
        fetchUser();
        const fetchPosts = async () => {
            const response = await axios.get(`${BackendUrl}/users/${params.userId}/posts`);
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    return (
        <Root>
            {user && (
                <Paper elevation={3} key={`userItem${user.id}`}>
                    <Typography variant="h4">
                        <strong>{user.name}</strong>
                    </Typography>
                    <div>
                        <strong>Username:</strong> {user.username}
                    </div>
                    <div>
                        <strong>Email:</strong> {user.email}
                    </div>
                    <div>
                        <strong>address:</strong> {user.address.street}, {user.address.suite}, {user.address.city},{' '}
                        {user.address.zipcode}, Geo: {user.address.geo.lat}, {user.address.geo.lng}
                    </div>
                    <div>
                        <strong>Phone:</strong> {user.phone}
                    </div>
                    <div>
                        <strong>Website:</strong> {user.website}
                    </div>
                    <div>
                        <strong>Company:</strong> {user.company.name}, {user.company.catchPhrase}, {user.company.bs}
                    </div>
                </Paper>
            )}
            <Typography variant="h5" sx={{ marginBottom: '10px', marginLeft: '10px' }}>
                Author&apos;s posts
            </Typography>
            {posts.map((post) => (
                <Paper key={`postItem${post.id}`} elevation={3}>
                    <Typography variant="h6">
                        <strong>
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        </strong>
                    </Typography>
                    <div>{post.body}</div>
                </Paper>
            ))}
        </Root>
    );
};

export default UserDetail;
