import React from 'react';
import RectangleForm from "./RectangleForm/RectangleForm";
import './Reactangle.css';

const Rectangle = () => {
    return (
        <div className="rectangle">
            <RectangleForm operationName="Perimetr"/>
            <RectangleForm operationName="Area"/>
        </div>
    );
};

export default Rectangle;