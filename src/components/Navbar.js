import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

function Navbar({ toggleTheme }) {

  return (
    <AppBar
      position="sticky"
      sx={{ background: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)' }}
      elevation={6}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ fontWeight: 700 }}>
            Zach Brewer
          </Link>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/playground" color="inherit">
            Playground
          </Link>
          <Link component={RouterLink} to="/about" color="inherit">
            About
          </Link>
          <Link component={RouterLink} to="/projects" color="inherit">
            Projects
          </Link>
          <Link component={RouterLink} to="/contact" color="inherit">
            Contact
          </Link>
        </Box>


        <Button variant="outlined" color="inherit" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
