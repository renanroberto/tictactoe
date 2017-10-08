import React from 'react'
import '../App.css'

class Field extends React.Component {

  handleClick (e) {
    if (e.target.innerHTML === '') {
      if (this.props.turn%2 !== 0) {
        this.props.onMove('x', this.props.place)
      } else {
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

  draw () {
    let board = this.state.boardState

    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') return 0
    }

    this.clear()
    this.props.winner('draw')
  }

  handleMove (player, place) {
    let newBoardState = this.state.boardState
    newBoardState[place-1] = player

    this.setState({ boardState: newBoardState })

    this.draw()
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
    const fields = []
    for (let i = 0; i < 9; i++) {
      fields.push(this.renderField(i))
    }

    return (
      <div className="board">
        { fields }
      </div>
    )
  }
}

export default class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      turn: 1,
      score: [0, 0]
    }

    this.nextTurn = this.nextTurn.bind(this)
    this.handleWinner = this.handleWinner.bind(this)
  }

  nextTurn () {
    this.setState({ turn: this.state.turn+1 })
  }

  handleWinner (player) {
    let score = this.state.score
    if (player === 'Player1') this.setState({ score: [score[0]+1, score[1]] })
    if (player === 'Player2') this.setState({ score: [score[0], score[1]+1] })

    if (player !== 'draw') {
      alert(player + ' wins!')
    }
    else {
      alert('Draw!')
    }

    this.setState({ turn: 1 })
  }

  render () {
    return (
      <div className="game">
        <div className="title">Tic Tac Toe!</div>

        <div className="info">
          <div>Placar: { this.state.score[0] + ' x ' + this.state.score[1] }</div>
          <div>Turno: { this.state.turn }</div>
          <div>&nbsp;</div>
          {/* <div>Histórico</div> */}
          <div className="history" style={{display: 'none'}}>
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
