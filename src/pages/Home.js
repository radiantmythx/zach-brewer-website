import React, { useRef, useState, memo } from 'react';
import { Container, Box, Typography, Avatar, Stack, useTheme, IconButton, Slider, Button } from '@mui/material';
import { GitHub, LinkedIn, Email, VolumeOff, VolumeUp } from '@mui/icons-material';
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
  const videoRef = useRef(null); // Reference to the video element
  const [isMuted, setIsMuted] = useState(true); // State to track if the video is muted
  const [volume, setVolume] = useState(0.5); // State to track the volume level (default 50%)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true); // State to track if the video is enabled

  const toggleSound = () => {
    setIsMuted((prev) => !prev); // Toggle the muted state
    if (videoRef.current) {
      videoRef.current.muted = !isMuted; // Update the muted property of the video
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue); // Update the volume state
    if (videoRef.current) {
      videoRef.current.volume = newValue; // Set the video volume
      if (newValue > 0) {
        setIsMuted(false); // Unmute if volume is greater than 0
        videoRef.current.muted = false;
      } else {
        setIsMuted(true); // Mute if volume is 0
        videoRef.current.muted = true;
      }
    }
  };

  const toggleVideo = () => {
    setIsVideoEnabled((prev) => !prev); // Toggle the video state
  };

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', height: '100vh' }}>
      {/* Video Background */}
      {isVideoEnabled && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src="/lowQualBackTest.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Sound Toggle Button, Volume Slider, and Video Toggle Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '8px',
          borderRadius: '8px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <IconButton
            onClick={toggleSound}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.01}
            sx={{
              width: 100,
              color: 'white',
              '& .MuiSlider-thumb': {
                backgroundColor: 'white',
              },
            }}
          />
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleVideo}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            color: 'black',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
        >
          {isVideoEnabled ? 'Disable Video' : 'Enable Video'}
        </Button>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
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