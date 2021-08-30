import React, { Component } from 'react'
import {dogBingoOptions} from './constants/dogBingoOptions'
import Card from './components/Card'
import './App.css'
let dimension = 5;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      pick: new Array(dimension * dimension).fill(0),
      slots: [],
      result: [],
      row: [],
      column: [],
      nxtNum: 1,
      options: dogBingoOptions,
      hits: null,
      hit_pool: this.generateCards(dimension * dimension),
      hit_step: 0,

    }
    this.handleGenerateRandom = this.handleGenerateRandom.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleGenerateRandom = () => {
    console.log(this.state.options)
    const randCards = this.generateCards(dimension * dimension)
    console.log(randCards)
    this.setState({
      slots: randCards,
      result: randCards
    })
  }

  handleGo(){
    const hit_pool = this.state.hit_pool;
    const hits = hit_pool.slice(0, this.state.hit_step+1);
    this.setState({
      hits: hits,
      hit_step: this.state.hit_step+1
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

  handleClear(){
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

handleAdd(){
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
      return arr

  }

  checkLine(arr){
    const lines = [
//       [0,1,2,3,4],
//       [5,6,7,8,9],
//       [10,11,12,13,14],
//       [15,16,17,18,19],
//       [20,21,22,23,24],
      
//       [0,5,10,15,20],
//       [1,6,11,16,21],
//       [2,7,12,17,22],
//       [3,8,13,18,23],
//       [4,9,14,19,24],
      
      // [0,6,12,18,24],
      // [4,8,12,16,20]
    ];
    
    let slash1 = [];
    let slash2 = [];
    for(var i = 0; i < dimension; i++){
      let row = [];
      let col = [];
      
      for(var o = 0; o < dimension; o++){
        row.push(o + dimension * i);
        col.push(o * dimension + i);
      }
      lines.push(row);
      lines.push(col);
      
      slash1.push(i + dimension * i);
      slash2.push((dimension - 1) * (i + 1));
    }
    lines.push(slash1);
    lines.push(slash2);
    
    const hits = this.state.hits || [];
    let rtn = [];
    for(var i = 0; i < lines.length; i++){
      let line_is_hit = true;
      for(var num in lines[i]){
        if(undefined == arr[lines[i][num]] || !hits.includes(arr[lines[i][num]])){
          line_is_hit = false;
          break;
        }
      }
      
      if(line_is_hit){
        for(var num in lines[i]){
          rtn.push(lines[i][num]);
        }
      }
      
    }
    return rtn;
  }

  render() {                                      
    const cards = this.state.cards

    console.log(cards)

    return (
      <div>
        <h1>Bingo</h1>
        <button>Clear</button>
        <button onClick={this.handleGenerateRandom}>New Card</button>
        <div className="Game__bingo_cards">
          <Card 
            hits={this.state.hits} 
            slots={this.state.slots} 
          />
      </div>
      </div>
    )
  }
}