import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class SavedList extends Component { //This component is always rendered. It's the first component returned in App.js

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map((movie) => {
          return (
            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id} //why is the key property set? what does it do? is it useful?
              activeClassName="saved-active"
            >
              <span className="saved-movie">{movie.title}</span>
            </NavLink>
          );
        })}
        <div>
          <div className="home-button">
            <Link to="/">Home</Link>
          </div>
          <div className="add-button">
            <Link to={"/add-movie"}> Add Movie </Link>
          </div>
        </div>
      </div>
    );
  }

}
