import React, { Component } from 'react';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let reducer = function(state = [], action){
  if(action){
    if(action.type == 'FETCH_BEAR'){
      return action.payload
    }
  }
  return state
}
let store = createStoreWithMiddleware(reducer)

let fetchBearActionCreator = function(){
  return (dispatch) => {
    axios.get('http://localhost:8000/api/bears')
    .then(result => {
      dispatch({type: 'FETCH_BEAR', payload: result.data})
    })
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {data: []};
  }
  componentDidMount(){
    store.subscribe(() => {
      this.setState({data: store.getState()})
    })
    store.dispatch(fetchBearActionCreator());
  }
  render() {
    let bears = this.state.data;
    return (
      <div>
        {
          bears.map(bear => <div key={bear.id}>{bear.name}</div>)
        }
      </div>
    );
  }
}

export default App;