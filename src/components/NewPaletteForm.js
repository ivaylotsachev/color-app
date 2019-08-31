import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 300;

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    content: {
        height: 'calc(100vh - 64px)',
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
});

class NewPaletteForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            currentColor: 'tomato',
            colors: [{ color: 'orange', name: 'orange' }],
            newColorName: '',
            newPaletteName: ''
        };
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            let hasName = this.state.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );

            let hasColor = this.state.colors.every(
                ({ color }) => color !== this.state.currentColor
            );

            return hasName && hasColor ? true : false;
        });

        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            this.props.palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    updateCurrentColor = newColor => {
        console.error('update', newColor);
        this.setState({ currentColor: newColor.hex });
    };

    addNewColor = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };

        this.setState({
            colors: [...this.state.colors, newColor],
            newColorName: ''
        });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        let newName = this.state.newPaletteName;

        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            colors: this.state.colors
        };

        this.props.savePalette(newPalette);
        this.props.history.push('/');
    };

    removeColor = colorName => {
        console.error('remove', colorName, this.state.colors);
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    };

    render() {
        const { classes } = this.props;
        const { open, currentColor, colors } = this.state;

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
                            onClick={this.handleDrawerOpen}
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
                        <ValidatorForm onSubmit={this.handleSubmit}>
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
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Typography variant="h4">Design your palette</Typography>
                    <Button variant="contained" color="secondary">
                        Clear palette
                    </Button>
                    <Button variant="contained" color="primary">
                        Random color
                    </Button>
                    <ChromePicker
                        color={currentColor}
                        onChangeComplete={newColor =>
                            this.updateCurrentColor(newColor)
                        }
                    />
                    <ValidatorForm
                        onSubmit={this.addNewColor}
                        onError={errors => console.log('on error: ', errors)}
                    >
                        <TextValidator
                            label="Palette name"
                            type="text"
                            value={this.state.newColorName}
                            onChange={this.handleChange}
                            name="newColorName"
                            validators={['required', 'isColorNameUnique']}
                            errorMessages={[
                                'this field is required',
                                'Color or name already used!'
                            ]}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: currentColor }}
                            type="submit"
                        >
                            Add color
                        </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />

                    {colors.map(color => (
                        <DraggableColorBox
                            key={color.name}
                            handleClick={name => this.removeColor(name)}
                            color={color.color}
                            name={color.name}
                        />
                    ))}
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
