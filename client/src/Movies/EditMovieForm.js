import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import MovieCard from "./MovieCard";

function EditMovieForm(props) {
  const [movie, setMovie] = useState({
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  const [editedMovie, setEditedMovie] = useState({ ...movie });
  // const [putThisMovie, setPutThisMovie] = useState({});

  //   console.log(props.match.params.id);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        // console.log(res)
        setMovie(res.data);
      })
      .catch(err => console.log(err.response));
  }, []);

  // const editMovie = id => {

  // };

  // useEffect(() => {
  //     //need to find 'put' endpoints
  //     //this function is happening too early
  //     console.log('i exist')
  //     axios.put(`http://localhost:5000/api/movies/:${props.match.params.id}`, putThisMovie)
  //         .then(res => {console.log(res)})
  //         .catch(err => {console.log(err)})
  // }, [putThisMovie])

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:5000/api/movies/${props.match.params.id}`,
        editedMovie
      )
      .then(res => console.log(res))
      .catch(err => console.log(err.response));
  };

  const handleChange = e => {
    console.log(e.target.value);
    switch (e.target.id) {
      case "title":
        setEditedMovie({ ...editedMovie, title: e.target.value });
        // console.log(newFriend)
        break;
      case "director":
        setEditedMovie({ ...editedMovie, director: e.target.value });
        break;
      case "metascore":
        setEditedMovie({ ...editedMovie, metascore: e.target.value });
    }
  };

  //     {
  //   id: 5,
  //   title: 'Tombstone',
  //   director: 'George P. Cosmatos',
  //   metascore: 89,
  //   stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
  // }
  return (
    <div>
      <MovieCard movie={movie} />
      <form>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            placeholder={movie.title}
            value={editedMovie.title}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="metascore">
          Metascore
          <input
            type="text"
            id="metascore"
            placeholder={movie.metascore}
            value={editedMovie.metascore}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="director">
          Director
          <input
            type="text"
            id="director"
            placeholder={movie.director}
            value={editedMovie.director}
            onChange={handleChange}
          />
        </label>
        <Link to="/movies">
          <button onClick={handleSubmit}>Submit</button>
        </Link>
      </form>
    </div>
  );
}

export default EditMovieForm;
