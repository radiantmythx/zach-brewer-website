import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        padding: 3,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        marginTop: 8,
      }}
    >
      <Typography variant="body2">© {new Date().getFullYear()} Zachary Brewer. All rights reserved.</Typography>
    </Box>
  );
}
