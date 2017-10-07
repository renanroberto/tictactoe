import React from 'react'
import '../App.css'

class Field extends React.Component {

  handleClick (e) {
    if (e.target.innerHTML === '') {
      if (this.props.turn%2 !== 0) {
        // e.target.innerHTML = '&cross;'
        this.props.onMove('x', this.props.place)
      } else {
        // e.target.innerHTML = '&#10061;'
        this.props.onMove('o', this.props.place)
      }
    }
  }

  render () {
    return (
      <div className="field" onClick={e => this.handleClick(e)}>
        { this.props.children === 'x' && this.props.children !== '' ? <span>&#10007;</span> : '' }
        { this.props.children === 'o' && this.props.children !== '' ? <span>&#10061;</span> : '' }
      </div>
    )
  }
}

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      boardState: [
        '', '', '',
        '', '', '',
        '', '', ''
      ]
    }

    this.handleMove = this.handleMove.bind(this)
  }

  clear () {
    this.setState({
      boardState: [
        '', '', '',
        '', '', '',
        '', '', ''
      ]
    })
  }

  winner () {
    let board = this.state.boardState

    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i]

      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        this.clear()

        if (this.props.turn%2 !== 0) return 'Player1'
        else return 'Player2'
      }
    }

    return ''
  }

  handleMove (player, place) {
    let newBoardState = this.state.boardState
    newBoardState[place-1] = player

    this.setState({ boardState: newBoardState })

    this.winner() ? this.props.winner(this.winner()) : this.props.next()
  }

  renderField (i) {
    return (
      <Field
        turn={ this.props.turn }
        place={ i+1 }
        children={ this.state.boardState[i] }
        onMove={ this.handleMove } />
    )
  }

  render () {
    return (
      <div className="board">
        { this.renderField(0) }
        { this.renderField(1) }
        { this.renderField(2) }

        { this.renderField(3) }
        { this.renderField(4) }
        { this.renderField(5) }

        { this.renderField(6) }
        { this.renderField(7) }
        { this.renderField(8) }
      </div>
    )
  }
}

export default class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = { turn: 1 }

    this.nextTurn = this.nextTurn.bind(this)
    this.handleWinner = this.handleWinner.bind(this)
  }

  nextTurn () {
    this.setState({ turn: this.state.turn+1 })
  }

  handleWinner (player) {
    let win = new Promise(resolve => {
      setTimeout(() => {
        alert(player + ' wins!')
        resolve()
      }, 100)
    })

    win.then(() => {
      this.setState({ turn: 1 })
    })
  }

  render () {
    return (
      <div className="game">
        <div className="title">Tic Tac Toe!</div>

        <div className="info">
          <div>Placar: 0 x 0</div>
          <div>Turno: { this.state.turn }</div>
          <div>&nbsp;</div>
          <div>Histórico</div>
          <div className="history">
            <div>1ª Jogada</div>
            <div>2ª Jogada</div>
            <div>3ª Jogada</div>
            <div>4ª Jogada</div>
          </div>
        </div>

        <Board
          turn={ this.state.turn }
          next={ this.nextTurn }
          winner={ this.handleWinner } />
      </div>
    )
  }
}
