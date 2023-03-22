import React, { Component } from 'react';
import Game from './Game';

export class Games extends Component {
  render() {
    return (
      <main>
        {this.props.games.map(el =>(
            <Game key={el.id} game={el}/>
        ))}
      </main>
    )
  }
}

export default Games;