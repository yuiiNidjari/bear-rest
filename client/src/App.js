import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteBear, createBear } from './action';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {bearName: ''};
  }

  onBearNameChanged = (e) => {
    this.setState({bearName: e.target.value});
  }
 
  toCreateBear = () => {
    this.props.createBear({name: this.state.bearName});
    this.setState({bearName: ''});

}

    render() {
      let bears = this.props.bear;
        return (
      <div>
        {
          bears.map(bear => (
            <div key={bear.id}>
              {bear.name}
              <button onClick={() => this.props.deleteBear(bear.id)}>X</button>
              
            </div>
          ))
        }
        <input value = {this.state.bearName} onChange = {this.onBearNameChanged}/>
        <button onClick = {this.toCreateBear}>Add</button>
      </div>
    );
  }
}

let mapStateToProps = (state) => (
  {bear: state.bear}
)
export default connect(mapStateToProps, {
  deleteBear,
  createBear,
})(App);