import React from 'react';
import './Gameover.css'

const Gameover = (props) => {
    return (
        <div className='overlay'>
            <div className="gameover_box">
                <h1>Game Over</h1>
                <p id='score'>{props.score}</p>
                <button onClick={props.close} className='close'>x</button>
            </div>
        </div>
    );
};

export default Gameover;