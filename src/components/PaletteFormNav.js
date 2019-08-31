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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPaletteName: ''
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    render() {
        const { classes, open } = this.props;
        const { newPaletteName } = this.state;

        return (
            <div>
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
                        <ValidatorForm
                            onSubmit={() =>
                                this.props.handleSubmit(newPaletteName)
                            }
                        >
                            <TextValidator
                                label="Palette name"
                                value={this.state.newPaletteName}
                                name="newPaletteName"
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={[
                                    'Enter a palette name',
                                    'Palette already used!'
                                ]}
                            />
                            <Link to="/">
                                <Button variant="contained" color="secondary">
                                    Go back
                                </Button>
                            </Link>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Save palette
                            </Button>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default PaletteFormNav;
