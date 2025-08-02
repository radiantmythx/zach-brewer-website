import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: 3,
        backgroundColor: 'background.default',
        color: 'text.primary',
        marginTop: 8,
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        © {new Date().getFullYear()} Zachary Brewer. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
