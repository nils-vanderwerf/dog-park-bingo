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
      cards: [],
      pick: new Array(dimension * dimension).fill(0),
      slots: [],
      row: [],
      column: [],
      nxtNum: 1,
      options: dogBingoOptions,
      hits: null,
      hit_step: 0,

    }

    this.handleClear = this.handleClear.bind(this)
    this.handleGenerateRandom = this.handleGenerateRandom.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClear = () => {
    this.setState({
      cards: []
    })
  }
  handleGenerateRandom = () => {
    console.log(this.state.options)
    const randCards = this.generateCards(dimension * dimension)
    console.log(randCards)
    this.setState({
      slots: randCards,
    })
    let newCard = 
    <Card
      hits={this.state.hits}
      slots={this.state.slots}
      dimension={dimension}
    />

    this.setState({
      cards: [...this.state.cards, newCard]
    })

  }

  handleGo() {
    const hit_pool = this.state.hit_pool;
    const hits = hit_pool.slice(0, this.state.hit_step + 1);
    this.setState({
      hits: hits,
      hit_step: this.state.hit_step + 1
    });
  }

  handleClick = (i) => {
    if (this.state.pick[i] === 0) {
      let newCardVals = this.state.pick.slice(0);
      newCardVals[i] = this.state.nxtNum;
      this.setState({
        pick: newCardVals,
        nxtNum: this.state.nxtNum + 1
      })
    }
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
      <div>
        <h1>Bingo</h1>
        <button onClick={this.handleClear}>Clear</button>
        <button onClick={this.handleGenerateRandom}>New Card</button>
        <div className="Game__bingo_cards">
          {this.state.cards}
        </div>
      </div>
    )
  }
}