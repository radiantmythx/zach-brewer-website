import React from 'react';
import Container from '@mui/material/Container';

export default function MainLayout({ children }) {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
        </Container>
    );
}
