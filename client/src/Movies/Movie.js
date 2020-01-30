import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import {Link} from "react-router-dom";

export default class Movie extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: null //movie object
    };
  }

  // functions
  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) =>
        this.setState({ movie: res.data })
      )
      .catch((err) =>
        console.log(err.response)
      );
  };

  saveMovie = () => { //updates state (savedList) from App.js
    const addToSavedList = this.props.addToSavedList; //this is the equivalent of destructuring
    addToSavedList(this.state.movie);
  };

  deleteMovie = (id) => { //updates state (savedList) from App.js
    axios.delete(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
          this.props.history.push("/");
        })
        .catch((err) => console.log(err));
  };

  // render
  render() {

    const {movie} = this.state;

    if (!movie) { //based on initial null state
      return <div>Loading movie information...</div>;
    }

    // else
    return (
      <div className="save-wrapper">
        <MovieCard movie={movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div className="update-button">
          <Link to={`/update-form/${movie.id}`}>Update</Link>
        </div>
        <div className="delete-button" onClick={() => this.deleteMovie(movie.id)}>
          Delete
        </div>
      </div>
    );

  }

}
