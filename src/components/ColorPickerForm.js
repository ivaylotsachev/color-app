import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentColor: 'orange',
            newColorName: ''
        };
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            let hasName = this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );

            let hasColor = this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            );

            return hasName && hasColor ? true : false;
        });
    }

    updateCurrentColor = newColor => {
        this.setState({ currentColor: newColor.hex });
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };

        this.props.addNewColor(newColor);
        this.setState({ newColorName: '' });
    };

    render() {
        const { paletteIsFull } = this.props;
        const { currentColor, newColorName } = this.state;

        return (
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={newColor =>
                        this.updateCurrentColor(newColor)
                    }
                />
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log('on error: ', errors)}
                    ref="form"
                >
                    <TextValidator
                        label="Palette name"
                        type="text"
                        value={newColorName}
                        onChange={this.handleChange}
                        name="newColorName"
                        validators={['required', 'isColorNameUnique']}
                        errorMessages={[
                            'this field is required',
                            'Color or name already used!'
                        ]}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            backgroundColor: paletteIsFull
                                ? 'grey'
                                : currentColor
                        }}
                        type="submit"
                        disabled={paletteIsFull}
                    >
                        {paletteIsFull ? 'Palette Full' : 'Add color'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default ColorPickerForm;
