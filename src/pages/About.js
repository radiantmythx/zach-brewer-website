import React from 'react';
import { Container, Typography } from '@mui/material';

function About() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ marginTop: 4 }}>About Me</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        I'm an Automation Engineer with a passion for clean code, smart solutions, and elegant design.
      </Typography>
    </Container>
  );
}

export default About;