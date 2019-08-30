import React from 'react';

const PaletteFooter = props => {
    const { paletteName, emoji } = props;

    return (
        <footer className="Palette-footer">
            <span>{paletteName}</span>
            <span className="emiji">{emoji}</span>
        </footer>
    );
};

export default PaletteFooter;
