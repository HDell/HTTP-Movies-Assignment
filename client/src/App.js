import React, { useState, useEffect } from "react";
import {Link, Route} from "react-router-dom";
import axios from "axios";
//components
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";
import AddMovie from "./Movies/AddMovie";

const App = () => {

  //state (fields)
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies")
      .then((res) =>
        setMovies(res.data)
      )
      .catch((err) =>
        console.log(err.response)
      );
  }, []);

  //setters (functions)
  const addToSavedList = (movie) => {
      const movieToSave = savedList.find((item) => `${item.id}` === `${movie.id}`);
      if(!movieToSave) {
        setSavedList([...savedList, movie]);
      }
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} /> {/* default/home page */}
      <Route
        path="/movies/:id"
        render={(props) => {
          return <Movie {...props} addToSavedList={addToSavedList} />; //addToSavedList allows <Movie/> to mutate savedList state array
        }}
      /> {/* movie page */}
      <Route
        path="/update-form/:id"
        render={(props) => (
          <UpdateMovie {...props} movies={movies} />
        )}
      />
      <Route path="/add-movie" render={(props) => (
          <AddMovie {...props} setMovies={setMovies}/>
      )} />
    </>
  );

};

export default App;
