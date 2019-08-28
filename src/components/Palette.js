import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: 500
        };
    }

    changeLevel = level => {
        this.setState({ level });
    };

    render() {
        let { level } = this.state;

        const colorBoxes = this.props.palette.colors[level].map((color, i) => (
            <ColorBox background={color.hex} name={color.name} key={i} />
        ));

        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} />
                <div className="Palette-colors">{colorBoxes}</div>
                <footer className="footer">im footer</footer>
            </div>
        );
    }
}

export default Palette;
