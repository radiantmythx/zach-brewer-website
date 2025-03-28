import React from 'react';
import { Container, Typography } from '@mui/material';

function Contact() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ marginTop: 4 }}>Contact Me</Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Feel free to reach out via email or through my LinkedIn or GitHub profiles.
      </Typography>
    </Container>
  );
}

export default Contact;