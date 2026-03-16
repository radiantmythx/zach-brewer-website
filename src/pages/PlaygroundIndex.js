import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function PlaygroundIndex() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Playground
            </Typography>
            <Typography variant="body1" paragraph>
                A collection of small components, experiments, and mini-games.
            </Typography>
            <List>
                <ListItem>
                    <ListItemText>
                        <Link component={RouterLink} to="/playground/dice">
                            Dice Roller (example)
                        </Link>
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
}
