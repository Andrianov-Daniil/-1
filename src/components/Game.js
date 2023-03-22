import React, { Component } from 'react'

export class Game extends Component {
  render() {
    if(this.props.game.I_have_this_game){
      return (
        <div className='Game'>
          <img src={"./game/"+this.props.game.id + ".png"}/>
          <h1 className='I_have_game'>{this.props.game.title}</h1>
          <button className='play'>
            <span className='button_line button_line--top'></span>
            <span className='button_line button_line--bottom'></span>
            <span className='button_line button_line--right'></span>
            <span className='button_line button_line--left'></span>
            ИГРАТЬ
          </button>
        </div>
      )
    }
    else if(this.props.game.discount){
      return (
        <div className='Game'>
          <img src={"./game/"+this.props.game.id + ".png"}/>
          <h1>{this.props.game.title}</h1>
          <del className='discount'>{this.props.game.price} Руб.</del>
          <p className='now_price'>{this.props.game.now_price} Руб.</p>
          <button className='play'>
            <span className='button_line button_line--top'></span>
            <span className='button_line button_line--bottom'></span>
            <span className='button_line button_line--right'></span>
            <span className='button_line button_line--left'></span>
            ИГРАТЬ
          </button>
        </div>
      )
    }
    else {
      return (
        <div className='Game'>
          <img src={"./game/"+this.props.game.id + ".png"}/>
          <h1>{this.props.game.title}</h1>
          <p1>{this.props.game.price} Руб.</p1>
          <button className='play'>
            <span className='button_line button_line--top'></span>
            <span className='button_line button_line--bottom'></span>
            <span className='button_line button_line--right'></span>
            <span className='button_line button_line--left'></span>
            ИГРАТЬ
          </button>
        </div>
      )
    }
  }
}

export default Game