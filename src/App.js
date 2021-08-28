import React, { Component } from 'react'
import {dogBingoOptions} from './constants/dogBingoOptions'
import CardContainer from './components/cardContainer'
let dimension = 5;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick: new Array(dimension * dimension).fill(0),
      picked: [],
      result: [],
      row: [],
      column: [],
      options: dogBingoOptions,
      hits: null

    }
    this.handleGenerateRandom = this.handleGenerateRandom.bind(this)
    this.generateCards = this.generateCards.bind(this)
  }

  handleGenerateRandom = () => {
    console.log(this.state.options)
    const randCards = this.generateCards(dimension * dimension)
    console.log(randCards)
    this.setState({
      pick: randCards,
      result: randCards
    })
  }

  generateCards = (max) => {
    //Create pool of spaces
    const pool = Array.apply(null, Array(max+1)).map(function (_, i) {return i;});
      let arr = [];
      while(arr.length < max){
        const idx = Math.floor(Math.random()* dogBingoOptions.length)
        const dogEl = dogBingoOptions[idx]
        console.log(idx)
        if(pool[idx] != 0){
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
        <button>Clear</button>
        <button onClick={this.handleGenerateRandom}>New Card</button>
        <CardContainer/>
      </div>
    )
  }
}