import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import logo from "./spacex.png";
import "./App.css";
import Launches from './components/Launches'
import Launch from './components/Launch'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <img src={logo} alt="" style={{ width: 300, height: 100 }} />
          <Route exact path="/" component={Launches}/> 
          <Route exact path="/launch/:flight_number" component={Launch}/>
        </div></Router>
      </ApolloProvider>
    );
  }
}

export default App;
