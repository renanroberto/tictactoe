import React from 'react'
import '../App.css'

class Board extends React.Component {
  render () {
    return (
      <div className="board">
        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>

        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>

        <div className="field"></div>
        <div className="field"></div>
        <div className="field"></div>
      </div>
    )
  }
}

export default class Game extends React.Component {
  render () {
    return (
      <div className="game">
        <div className="title">Tic Tac Toe!</div>

        <div className="info">
          <div>Placar: 0 x 0</div>
          <div>Turno: Jogador 1</div>
          <div>&nbsp;</div>
          <div>Histórico</div>
          <div className="history">
            <div>1ª Jogada</div>
            <div>2ª Jogada</div>
            <div>3ª Jogada</div>
            <div>4ª Jogada</div>
          </div>
        </div>

        <Board />
      </div>
    )
  }
}
