import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
                <Slider
                    defaultValue={level}
                    min={100}
                    max={900}
                    step={100}
                    onChange={this.changeLevel}
                />
                <div className="Palette-colors">{colorBoxes}</div>
                <footer className="footer">im footer</footer>
            </div>
        );
    }
}

export default Palette;
