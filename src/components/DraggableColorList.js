import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
    return (
        <div style={{ height: '100%' }}>
            {colors.map((color, index) => (
                <DraggableColorBox
                    key={color.name}
                    handleClick={name => removeColor(name)}
                    color={color.color}
                    name={color.name}
                    index={index}
                />
            ))}
        </div>
    );
});

export default DraggableColorList;
