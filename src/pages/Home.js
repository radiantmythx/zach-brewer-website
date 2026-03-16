import React, { memo } from 'react';
import { Container, Box, Typography, Avatar, Stack, useTheme } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import Typical from 'react-typical';

// Memoized Typical Component
const MemoizedTypical = memo(() => (
  <Typical
    steps={[
      'Automation Engineer 💻',
      1500,
      'Software Developer 🚀',
      1500,
      'Tech Enthusiast 🌐',
      1500,
      'Game Developer 🎮',
      1500,
      'Musician, Composer, Producer 🎵',
      1500,
    ]}
    loop={Infinity}
    wrapper="span"
  />
));

function Home() {
  const theme = useTheme(); // Access the current theme

  return (
    <Box>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 6 }}>
        <Box
          sx={{
            textAlign: 'center',
            marginTop: 8,
            padding: 6,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(66, 66, 66, 0.8)' : 'rgba(227, 242, 253, 0.8)', // Semi-transparent background
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <Avatar
            src="/sitephoto.png"
            alt="Zachary Brewer"
            sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: 2 }}
          />
          <Typography variant="h3" gutterBottom>
            Zachary Brewer
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            <Box sx={{ display: 'inline-block', minWidth: '300px' }}>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                <MemoizedTypical />
              </Typography>
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Welcome to my personal portfolio site! Here you can explore my projects, background, and reach out to connect.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
            <a href="https://github.com/radiantmythx" target="_blank" rel="noopener noreferrer">
              <GitHub fontSize="large" />
            </a>
            <a href="https://www.linkedin.com/in/zachary-brewer-88653269" target="_blank" rel="noopener noreferrer">
              <LinkedIn fontSize="large" />
            </a>
            <a href="mailto:zachary.brewer.spammyass@gmail.com">
              <Email fontSize="large" />
            </a>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;