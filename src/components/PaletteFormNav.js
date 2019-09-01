import React, { Component } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from '../styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPaletteName: '',
            formShowing: false
        };
    }

    // componentDidMount() {
    //     ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
    //         this.props.palettes.every(
    //             ({ paletteName }) =>
    //                 paletteName.toLowerCase() !== value.toLowerCase()
    //         )
    //     );
    // }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    showForm = () => this.setState({ formShowing: true });

    hideForm = () => this.setState({ formShowing: false });

    render() {
        const { classes, open, palettes, handleSubmit } = this.props;
        const { newPaletteName } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    color="default"
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.props.handleDrawerOpen}
                            edge="start"
                            className={clsx(
                                classes.menuButton,
                                open && classes.hide
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <Link to="/">
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                            >
                                Go back
                            </Button>
                        </Link>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={this.showForm}
                        >
                            Save
                        </Button>
                    </div>
                </AppBar>
                {this.state.formShowing && (
                    <PaletteMetaForm
                        palettes={palettes}
                        handleSubmit={newPalette => handleSubmit(newPalette)}
                        hideForm={this.hideForm}
                    />
                )}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
