import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/PaletteFooterStyles';

const PaletteFooter = props => {
    const { paletteName, emoji, classes } = props;

    return (
        <footer className={classes.PaletteFooter}>
            <span>
                <em>
                    <small>Current palette</small>
                </em>{' '}
                : <strong style={{ color: 'red' }}>{paletteName}</strong>
            </span>
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    );
};

export default withStyles(styles)(PaletteFooter);
