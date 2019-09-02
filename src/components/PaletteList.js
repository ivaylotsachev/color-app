import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from '../styles/PaletteListStyles';

class PaletteList extends Component {
    goToPalette = id => {
        this.props.history.push(`/palette/${id}`);
    };

    render() {
        const { palettes, classes, deletePalette } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create palette</Link>
                    </nav>

                    <TransitionGroup className={classes.palettes}>
                        {palettes
                            .map(palette => (
                                <CSSTransition
                                    key={palette.id}
                                    classNames="fade"
                                    timeout={300}
                                >
                                    <MiniPalette
                                        key={palette.id}
                                        {...palette}
                                        deletePalette={deletePalette}
                                        handleClick={() =>
                                            this.goToPalette(palette.id)
                                        }
                                    />
                                </CSSTransition>
                            ))
                            .reverse()}
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);
