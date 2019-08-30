import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);

        this.state = {
            level: 500,
            format: 'hex'
        };
    }

    changeLevel = level => {
        this.setState({ level });
    };

    changeFormat = value => {
        this.setState({ format: value });
    };

    render() {
        let { colors, paletteName, emoji, id } = this.props.palette;
        let { level, format } = this.state;

        const colorBoxes = colors[level].map((color, i) => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
                id={color.id}
                paletteId={id}
                showLink={true}
            />
        ));

        return (
            <div className="Palette">
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showingAllColors
                />
                <div className="Palette-colors">{colorBoxes}</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default Palette;
