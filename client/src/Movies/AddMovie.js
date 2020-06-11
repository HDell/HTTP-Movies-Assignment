import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: ""
};

const AddMovie = (props) => { //{match}
    const [movieForm, setMovieForm] = useState(initialMovie);

    const changeHandler = event => {
        event.persist();
        let value = event.target.value;
        if (event.target.name === 'metascore') { //metascore is a number, so check if that's the event you're handling
            value = parseInt(value, 10);
        }
        if (event.target.name === 'stars') { //metascore is a number, so check if that's the event you're handling
            value = value.split(",");
        }

        setMovieForm({
            ...movieForm,
            [event.target.name]: value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // make a POST request to edit the movie
        axios
            .post(`http://localhost:5000/api/movies`, movieForm)
            .then(res => {
                props.setMovies(res.data);
                props.history.push("/");
            })
            .catch(err =>
                console.log(err)
            );
        setMovieForm({
            title: "",
            director: "",
            metascore: "",
            stars: ""
        })
    };

    return (
        <div className="centered-form">
            <h2>Add Movie</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="string"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movieForm.title}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movieForm.director}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movieForm.metascore}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Stars"
                    value={movieForm.stars}
                />
                <div className="baseline" />

                <button>Add</button> {/*className="md-button form-button*/}
            </form>
        </div>
    );
};

export default AddMovie;
