import React from 'react';
import Palette from './components/Palette';
import seedColors from './seedColors';

import './App.css';

function App() {
    return (
        <div className="App">
            <Palette {...seedColors[5]} />
        </div>
    );
}

export default App;
