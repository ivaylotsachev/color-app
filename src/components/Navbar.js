import React, { Component } from 'react';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import { MenuItem, IconButton, Select, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', open: false };
    }

    handleChange = e => {
        this.setState({ format: e.target.value, open: true }, () =>
            this.props.handleChange(this.state.format)
        );
    };

    closeSnackbar = () => this.setState({ open: false });

    render() {
        const { level, changeLevel, showingAllColors } = this.props;
        const { format } = this.state;

        return (
            <header className="Navbar">
                <div className="logo">
                    <Link to="/">colorpicker</Link>
                </div>
                {showingAllColors && (
                    <div className="slider-container">
                        <span>
                            Level: <strong>{level}</strong>
                        </span>
                        <div className="slider">
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onChange={changeLevel}
                            />
                        </div>
                    </div>
                )}
                <div className="select-container">
                    <Select value={format} onChange={this.handleChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">
                            RGB - rgb(255, 255, 255)
                        </MenuItem>
                        <MenuItem value="rgba">
                            RGBA - rgba(255, 255, 255, 0.1)
                        </MenuItem>
                    </Select>
                </div>
                <Snackbar
                    onClose={this.closeSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={
                        <p id="message-id">
                            Format changed to{' '}
                            <span
                                style={{
                                    color: 'orange',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {format}
                            </span>
                        </p>
                    }
                    ContentProps={{
                        'area-describedly': 'message-id'
                    }}
                    action={[
                        <IconButton
                            onClick={this.closeSnackbar}
                            key="close"
                            color="inherit"
                            area-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        );
    }
}

export default Navbar;
