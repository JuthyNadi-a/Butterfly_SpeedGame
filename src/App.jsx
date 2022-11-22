import React, { Component } from 'react';
import Circle from './Circle';
import Gameover from './Gameover.jsx';
import click from './assets/click.mp3'
import gameStart from './assets/gameStart.mp3'
import gameEnd from './assets/gameEnd.mp3'
import './App.css'


let clickSound = new Audio(click);
let gameStartSound = new Audio(gameStart);
let gameEndSound = new Audio(gameEnd);
function getRndInteger(min, max){
  return  Math.floor(Math.random() * (max - min + 1)) + min;
} 
class App extends Component {
  state = {
    circles: [1,2,3,4],
    current: undefined,
    score: 0,
    speed: 1000,
    count: 0,
    rounds: 3,
    gameOver:false,
    gameOn:false,
  }
  timer;
  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  }
  clickHandler = (i) => {
    if (this.state.gameOn === true) {
      this.clickPlay();

      if(this.state.current !== i) {

        if((this.state.rounds - this.state.count) === 0) {
              this.endGameHandler();
              return;
            } /* stops the function otherwise it would update score */
            
        this.setState ({
          rounds: this.state.rounds - 1
        })

            
      } 
      else {
        this.setState ({
          score: this.state.score + 1,
          count: this.state.count - 1,
        })
      }
    }
  }
  nextCircle = () => {
    let nextActive;
    if(this.state.count >= 3) {
      this.endGameHandler();
      return;
    }

    do {
      nextActive = getRndInteger(0,this.state.circles.length-1);
    } while (nextActive === this.state.current)
    
    this.setState ({
      current: nextActive,
      speed: this.state.speed * .95,
      count: this.state.count + 1,
    })
    this.timer = setTimeout(this.nextCircle, this.state.speed) 
  }

  showModal = () => {
    if (this.state.score === 1) {
      this.setState ({
        score: `You caught ${this.state.score} butterfly!!`,
      })
    } else if (this.state.score >= 2) {
      this.setState ({
        score: `You caught ${this.state.score} butterflies!!`,
      })
    }
    if (this.state.score <=1) {
      this.setState ({
        score: `Oh No!! You caught ${this.state.score} butterfly!! Try to be faster!`,
      })
    } else if (this.state.score >= 2 && this.state.score <= 5){
      this.setState ({
        score: `You caught ${this.state.score} butterflies!! You can be faster! Try again!`
      })
    } else if (this.state.score >= 6 && this.state.score <= 30){
      this.setState ({
        score: `Nice!! You caught ${this.state.score} butterflies!! Try again!`
      })
    } else if (this.state.score > 30){
      this.setState ({
        score: `Amazing!! You caught ${this.state.score} butterflies!! That is super fast!`
      })
    }
  }
  startGameHandler = () => {
    this.setState({
      gameOn:true
    })
    gameStartSound.play();
    gameEndSound.pause();
    this.nextCircle();
  }
  endGameHandler = () => {
    this.showModal();
    clickSound.pause();
    gameStartSound.pause();
    gameEndSound.play()
    clearTimeout(this.timer);
    this.setState({
      gameOn: false,
      gameOver: !this.state.gameOver,
      rounds: 3,
    })
  }
  closeHandler = () => {
    window.location.reload();
  }
  soundOff = () => {
      clickSound.pause();
      gameStartSound.pause();
      gameEndSound.pause();
  }
  render() {
    return (
     
      <div className="App">
      <header>
        <p>Lives: {this.state.rounds - this.state.count}</p>
        <p>Misses: {this.state.count}</p>
        <p onClick= {this.soundOff}>
          <span className="material-symbols-outlined mute">
          music_off
          </span>
        </p>
      </header>
      <h1>Speed game</h1>
      <p>Your score: {this.state.score}</p>
      <div className="circles">
        {this.state.circles.map((circle,i) => (
          <Circle key={i} click={() => this.clickHandler(i)} 
            active = {this.state.current === i}/>
        ))
        }
        <div>
          {this.state.gameOver && 
          <Gameover close= {this.closeHandler} 
          score = {this.state.score}
          />}
        </div>
      </div>
      <div>
      {!this.state.gameOn && <button onClick={this.startGameHandler} id='start'>Start</button>}
      {this.state.gameOn && <button onClick={this.endGameHandler} id='end'>End</button>}
      </div>
    </div>
      
    );
  }
}

export default App;
