import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types/User';
import { Link } from 'react-router-dom';
import { BackendUrl } from '../Constants';
import Paper from '../components/Paper';
import { Typography } from '@mui/material';

const Root = styled('div')``;

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${BackendUrl}/users`);
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    return (
        <Root>
            {users.map((user) => (
                <Paper elevation={3} key={`userItem${user.id}`}>
                    <Link to={`/users/${user.id}`}>
                        <Typography variant="h6">
                            <strong>{user.name}</strong>
                        </Typography>
                    </Link>

                    <div>
                        <strong>Username:</strong> {user.username}
                    </div>
                    <div>
                        <strong>Mail:</strong> {user.email}
                    </div>
                </Paper>
            ))}
        </Root>
    );
};

export default UserList;
