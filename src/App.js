import React, { Component } from 'react'
import { dogBingoOptions } from './constants/dogBingoOptions'
import Card from './components/Card'
// import './App.css'
import { styled } from '@material-ui/core/styles';
let dimension = 5;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick: new Array(dimension * dimension).fill(0),
      slots: [],
      row: [],
      column: [],
      options: dogBingoOptions,
      hits: null,
    }

    this.handleClear = this.handleClear.bind(this)
    this.handleGenerateRandom = this.handleGenerateRandom.bind(this)
  }

  handleClear = () => {
    const textConts = document.querySelectorAll('span.text-content')
    for (let i = 0; i < textConts.length; i++) {
      textConts[i].innerHTML = ""
    }
    //Remove marked from squares
    this.removeMarked()
  }

  removeMarked = () => {
    const squares = document.getElementsByClassName('square')
    for (let i = 0; i < squares.length; i++) {
      squares[i].classList.remove('mark-found')
    }
  }

  handleGenerateRandom = () => {
    console.log(this.state.options)
    const randCards = this.generateCards(dimension * dimension)
    console.log(randCards)
    this.setState({
      slots: randCards,
    }, function() { this.fillSquares() })
    this.removeMarked()
  }

  fillSquares() {
    const textConts = document.querySelectorAll('span.text-content')
    for (let i = 0; i < textConts.length; i++) {
      console.log("RANDOM ELEMENT", this.state.slots[i])
      textConts[i].innerHTML = this.state.slots[i]
    }
  }

  handleGo() {
    const hit_pool = this.state.hit_pool;
    const hits = hit_pool.slice(0, this.state.hit_step + 1);
    this.setState({
      hits: hits,
      hit_step: this.state.hit_step + 1
    });
  }

  handleClear() {
    this.setState({
      pick: new Array(dimension * dimension).fill(0),
      slots: [],
      result: [],
      nxtNum: 1,
      hits: null,
      hit_pool: this.generateNums(dimension * dimension),
      hit_step: 0
    });
  }

  handleAdd() {
    const pick = this.state.pick;
    let slots = this.state.slots;
    slots.push(pick)
    this.setState({
      slots: slots,
      pick: new Array(dimension * dimension).fill(0),
      nxtNum: 1,
    });
  }

  generateCards = (max) => {
    //Create pool of spaces
    const pool = Array.apply(null, Array(max + 1)).map(function (_, i) { return i; });
    let arr = [];
    while (arr.length < max) {
      const idx = Math.floor(Math.random() * dogBingoOptions.length)
      const dogEl = dogBingoOptions[idx]
      console.log(idx)
      if (pool[idx] != 0) {
        arr.push(dogEl);
        pool[idx] = 0;
      }
    }
    return arr;
  }

  render() {
    return (
      <div className="container">
        <h1>Bingo</h1>
        <button onClick={this.handleClear}>Clear</button>
        <button onClick={this.handleGenerateRandom}>New Card</button>
        <div className="Game__bingo_card">
          <Card
            hits={this.state.hits}
            slots={this.state.slots}
            dimension={dimension}
          />
        </div>
      </div>
    )
  }
}