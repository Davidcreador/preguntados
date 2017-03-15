import React, { Component } from 'react';

function getRandomArbitrary (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default class Jugar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      score: 0,
      num: getRandomArbitrary(0, this.props.questions.length),
      userPlaying: ''
    };
    this.question = this.props.questions[this.state.num];
  }

  componentDidMount () {
    this.choosePlayer();
  }

  handleClick (answer, e) {
    e.preventDefault();
    if (this.question.answer === answer) {
      this.setState({ score: ++this.state.score });
      console.log('Ganaste');
      this.chooseNewPlayer();
    } else {
      console.log('Mamaste');
      this.chooseNewPlayer();
    }
  }

  choosePlayer () {
    console.log('choosing');
    let player1 = 0;

    if (player1 === 0) {
      this.setState({
        userPlaying: this.props.username1.username
      });
    }
  }

  chooseNewPlayer () {
    console.log('choosing');
    let player2 = 1;

    if (player2 === 1) {
      this.setState({
        userPlaying: this.props.username2.username
      });
    }
  }

  render () {
    const options = this.question.options.map((option, i) => {
      return (
        <a
          style={{display: 'block', marginBottom: '10px'}}
          key={i}
          onClick={(e) => {
            this.handleClick(i, e);
          }}
          className='waves-effect waves-light btn'>{option}</a>
      );
    });
    return (
      <div className='container'>
        <div>
          <span>Jugador 1: {this.props.username1.username}</span>
          <span>Jugador 2: {this.props.username2.username}</span>
        </div>
        <div>
          <div>Jugando: {this.state.userPlaying}</div>
        </div>
        <div>
          <span>Score: {this.state.score}</span>
        </div>
        <div>
          <span>Pregunta: {this.question.text}</span>
          {options}
        </div>
      </div>
    );
  }
}
