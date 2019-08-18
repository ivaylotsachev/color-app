import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
        const { color, name } = this.props.background;
        const { copied } = this.state;

        return (
            <CopyToClipboard text={color} onCopy={() => this.changeCopyState()}>
                <div className="ColorBox" style={{ background: color }}>
                    <div
                        className={`copy-overlay ${copied && 'show'}`}
                        style={{ background: color }}
                    />
                    <div className={`copy-message ${copied && 'show'}`}>
                        <h1>copied!</h1>
                        <p>{color}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    <span className="see-more">More</span>
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;
