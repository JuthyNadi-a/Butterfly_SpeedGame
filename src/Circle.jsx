import React from 'react';
import './Circle.css'
const Circle = (props) => {
    return (
        <div className={`circle ${props.active ? 'active' : ''}`} 
        onMouseDown={props.click}>
        </div>
    );
};

export default Circle;