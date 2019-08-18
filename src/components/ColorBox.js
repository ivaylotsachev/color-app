import React, { Component } from 'react';
import './ColorBox.css';

class ColorBox extends Component {
    render() {
        const { color, name } = this.props.background;
        return (
            <div className="ColorBox" style={{ background: color }}>
                <span>{name}</span>
            </div>
        );
    }
}

export default ColorBox;
