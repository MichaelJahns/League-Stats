import React, { Component } from "react";
import logo from "./logo.svg";
import SearchBar from "./components/searchBar";
import "./App.css";

import { generateSummonerPackage } from "./playerPackage";

class App extends Component {
  constructor() {
    super();
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = { Summoner: " " };
  }

  handleNameChange(summonerName) {
    this.setState({ Summoner: summonerName });
    console.log(this.state);
  }

  handleSearch() {
    generateSummonerPackage(this.state.Summoner);
    console.log(this.state.Summoner);
  }

  render() {
    return (
      <React.Fragment>
        <SearchBar
          handleNameChange={this.handleNameChange}
          handleSearch={this.handleSearch}
        />
      </React.Fragment>
    );
  }
}

export default App;
