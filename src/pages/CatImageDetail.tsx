import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../types/Post';
import { Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { BackendUrl } from '../Constants';
import { Comment } from '../types/Comment';
import Paper from '../components/Paper';

const Root = styled('div')``;

const CatImageDetail = () => {
    const [post, setPost] = useState<Post | undefined>();
    const [comments, setComments] = useState<Comment[]>([]);
    const params = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get(`${BackendUrl}/posts/${params.catImageId}`);
            setPost(response.data);
        };
        fetchPost();
        const fetchComments = async () => {
            const response = await axios.get(`${BackendUrl}/posts/${params.catImageId}/comments`);
            setComments(response.data);
        };
        fetchComments();
    }, []);

    return (
        <Root>
            {/*{post && (
                <Paper elevation={3} key={`postItem${post.id}`}>
                    <Typography variant="h4">
                        <strong>{post.title}</strong>
                    </Typography>
                    <div>{post.body}</div>
                    <div>
                        <Link to={`/users/${post.userId}`}>Author</Link>
                    </div>
                </Paper>
            )}*/}
            <Typography variant="h5" sx={{ marginBottom: '10px', marginLeft: '10px' }}>
                Comments
            </Typography>
            {comments.map((comment) => (
                <Paper key={`postItem${comment.id}`} elevation={3}>
                    <Typography variant={'h6'}>
                        <strong>{comment.name}</strong>
                    </Typography>
                    <div>{comment.body}</div>
                    <strong>{comment.email}</strong>
                </Paper>
            ))}
        </Root>
    );
};

export default CatImageDetail;
