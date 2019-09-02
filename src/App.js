import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList';
import SingleColorPalette from './components/SingleColorPalette';
import NewPaletteForm from './components/NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './components/Page';
import uniqid from 'uniqid';

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
            <Route
                render={({ location }) => (
                    <TransitionGroup>
                        <CSSTransition
                            classNames="page"
                            timeout={500}
                            key={uniqid()}
                        >
                            <Switch location={location}>
                                <Route
                                    exact
                                    path="/palette/new"
                                    render={routeProps => (
                                        <Page>
                                            <NewPaletteForm
                                                {...routeProps}
                                                palettes={this.state.palettes}
                                                savePalette={this.savePalette}
                                            />
                                        </Page>
                                    )}
                                />
                                <Route
                                    path="/palette/:paletteId/:colorId"
                                    render={routeProps => (
                                        <Page>
                                            <SingleColorPalette
                                                colorId={
                                                    routeProps.match.params
                                                        .colorId
                                                }
                                                palette={generatePalette(
                                                    this.findPalette(
                                                        routeProps.match.params
                                                            .paletteId
                                                    )
                                                )}
                                            />
                                        </Page>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/"
                                    render={routeProps => (
                                        <Page>
                                            <PaletteList
                                                {...routeProps}
                                                palettes={this.state.palettes}
                                                deletePalette={
                                                    this.deletePalette
                                                }
                                            />
                                        </Page>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/palette/:id"
                                    render={routeProps => (
                                        <Page>
                                            <Palette
                                                palette={generatePalette(
                                                    this.findPalette(
                                                        routeProps.match.params
                                                            .id
                                                    )
                                                )}
                                            />
                                        </Page>
                                    )}
                                />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )}
            />
        );
    }
}

export default App;
