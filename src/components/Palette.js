import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends Component {
    render() {
        console.error('paltte', this.props);
        const colorBoxes = this.props.colors.map((color, i) => (
            <ColorBox background={color} key={i} />
        ));

        return (
            <div className="Palette">
                <div className="Palette-colors">{colorBoxes}</div>
                <footer className="footer">im footer</footer>
            </div>
        );
    }
}

export default Palette;
