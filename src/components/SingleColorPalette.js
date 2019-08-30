import React, { Component } from 'react';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);

        console.error('single color', props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>single color</h1>
            </div>
        );
    }
}

export default SingleColorPalette;
