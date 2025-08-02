import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar({ toggleTheme }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #2196f3 0%, #21cbf3 100%)',
      }}
      elevation={6}
    >
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/projects">
          Projects
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Button color="inherit" onClick={handleMenuOpen}>
          Applications
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            component={Link}
            to="/applications/diceroller"
            onClick={handleMenuClose}
          >
            Dice Rolling Simulator (Desktop)
          </MenuItem>
        </Menu>

        <Button variant="outlined" color="inherit" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
