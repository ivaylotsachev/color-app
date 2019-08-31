import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PaletteFormNav from './PaletteFormNav';
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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';

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
    static defaultProps = {
        maxColors: 20
    };

    constructor(props) {
        super(props);

        this.state = {
            open: true,
            currentColor: 'tomato',
            colors: this.props.palettes[0].colors,
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

    clearColors = () => this.setState({ colors: [] });

    addRandomColor = () => {
        const allColors = this.props.palettes.map(p => p.colors).flat();
        const rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];

        this.setState({ colors: [...this.state.colors, randomColor] });
    };

    handleSubmit = newPaletteName => {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, '-'),
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

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex)
        }));
    };

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, currentColor, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors;

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
                    classes={classes}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
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
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.clearColors}
                    >
                        Clear palette
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addRandomColor}
                        disabled={paletteIsFull}
                    >
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
                            style={{
                                backgroundColor: paletteIsFull
                                    ? 'grey'
                                    : this.state.currentColor
                            }}
                            type="submit"
                            disabled={paletteIsFull}
                        >
                            {paletteIsFull ? 'Palette Full' : 'Add color'}
                        </Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={colors}
                        removeColor={this.removeColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
