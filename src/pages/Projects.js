import React from 'react';
import { Container, Typography, Box } from '@mui/material';

import GitHubCalendar from 'react-github-calendar';



function Projects() {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ marginTop: 4 }}>My Projects</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Coming soon: A showcase of public libraries, personal tools, and tutorials I've built or contributed to.
            </Typography>
            <Typography variant="h6">Personal Github Heatmap (Previous Year)</Typography>
            <img
                src="https://ghchart.rshah.org/radiantmythx"
                alt="GitHub Contributions"
                style={{ width: '100%', maxWidth: '600px' }}
            />
        </Container>

    );
}

export default Projects;