import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props) {
        super(props);

        this.state = { copied: false };
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => {
                this.setState({ copied: false });
            }, 1500);
        });
    }

    render() {
        const { background, name, paletteId, id } = this.props;
        const { copied } = this.state;

        return (
            <CopyToClipboard
                text={background}
                onCopy={() => this.changeCopyState()}
            >
                <div className="ColorBox" style={{ background }}>
                    <div
                        className={`copy-overlay ${copied && 'show'}`}
                        style={{ background }}
                    />
                    <div className={`copy-message ${copied && 'show'}`}>
                        <h1>copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    <Link
                        to={`/palette/${paletteId}/${id}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <span className="see-more">More</span>
                    </Link>
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;
