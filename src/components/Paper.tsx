import styled from 'styled-components';
import React from 'react';
import { Paper as MuiPaper, PaperProps as MuiPaperProps } from '@mui/material';

const CustomPaper = styled(MuiPaper)`
    margin-bottom: 10px;
    padding: 10px;
`;

export interface PaperProps extends MuiPaperProps {}

export const Paper = (props: PaperProps) => {
    const { children, ...otherProps } = props;
    return (
        <CustomPaper elevation={3} {...otherProps}>
            {children}
        </CustomPaper>
    );
};

export default Paper;
