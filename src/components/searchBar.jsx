import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor() {
    super();
    this.changeHandler = this.changeHandler.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  changeHandler(event) {
    this.props.handleNameChange(event.target.value);
  }

  onSearch(event) {
    event.preventDefault();
    this.props.handleSearch(event.target.value);
  }

  render() {
    return (
      <form>
        <label>
          <input
            type="text"
            name="summonerName"
            onChange={this.changeHandler}
            placeholder="Type the name of the Summoner you want to learn more about"
            required
          />
        </label>
        <button onClick={this.onSearch}> Search </button>
      </form>
    );
  }
}
