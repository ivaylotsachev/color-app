import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function findPalette(id) {
    return seedColors.find(palette => palette.id === id);
}

function App() {
    return (
        <Switch>
            <Route
                exact
                path="/palette/new"
                render={params => <NewPaletteForm {...params} />}
            />
            <Route
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                    <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                            findPalette(routeProps.match.params.paletteId)
                        )}
                    />
                )}
            />
            <Route
                exact
                path="/"
                render={routeProps => (
                    <PaletteList palettes={seedColors} {...routeProps} />
                )}
            />
            <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                    <Palette
                        palette={generatePalette(
                            findPalette(routeProps.match.params.id)
                        )}
                    />
                )}
            />
        </Switch>
    );
}

export default App;
