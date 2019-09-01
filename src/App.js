import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
    constructor(props) {
        super(props);

        const savedPalettes = JSON.parse(localStorage.getItem('palettes'));

        this.state = {
            palettes: savedPalettes || seedColors
        };
    }

    findPalette = id => {
        return this.state.palettes.find(palette => palette.id === id);
    };

    deletePalette = id => {
        this.setState(
            st => ({
                palettes: st.palettes.filter(palette => palette.id !== id)
            }),
            this.syncLocalStorage()
        );
    };

    savePalette = newPalette => {
        this.setState(
            { palettes: [...this.state.palettes, newPalette] },
            this.syncLocalStorage
        );
    };

    syncLocalStorage = () => {
        window.localStorage.setItem(
            'palettes',
            JSON.stringify(this.state.palettes)
        );
    };

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/palette/new"
                    render={routeProps => (
                        <NewPaletteForm
                            {...routeProps}
                            palettes={this.state.palettes}
                            savePalette={this.savePalette}
                        />
                    )}
                />
                <Route
                    path="/palette/:paletteId/:colorId"
                    render={routeProps => (
                        <SingleColorPalette
                            colorId={routeProps.match.params.colorId}
                            palette={generatePalette(
                                this.findPalette(
                                    routeProps.match.params.paletteId
                                )
                            )}
                        />
                    )}
                />
                <Route
                    exact
                    path="/"
                    render={routeProps => (
                        <PaletteList
                            {...routeProps}
                            palettes={this.state.palettes}
                            deletePalette={this.deletePalette}
                        />
                    )}
                />
                <Route
                    exact
                    path="/palette/:id"
                    render={routeProps => (
                        <Palette
                            palette={generatePalette(
                                this.findPalette(routeProps.match.params.id)
                            )}
                        />
                    )}
                />
            </Switch>
        );
    }
}

export default App;
