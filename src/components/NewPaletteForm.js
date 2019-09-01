import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import ColorPickerForm from './ColorPickerForm';
import { arrayMove } from 'react-sortable-hoc';
import styles from '../styles/NewPaletteFormStyles';

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

            newPaletteName: ''
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor = newColor => {
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

    handleSubmit = newPalette => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = this.state.colors;

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
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors;

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    open={open}
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
                    <div className={classes.container}>
                        <Typography variant="h4" gutterBottom>
                            Design your palette
                        </Typography>
                        <div className={classes.buttons}>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                                onClick={this.clearColors}
                            >
                                Clear palette
                            </Button>
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={this.addRandomColor}
                                disabled={paletteIsFull}
                            >
                                Random color
                            </Button>
                        </div>
                        <ColorPickerForm
                            colors={colors}
                            paletteIsFull={paletteIsFull}
                            addNewColor={this.addNewColor}
                        />
                    </div>
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
