import React, { useEffect, useState } from 'react';
import '../Styles/movie.css'

export const Addmovie = () => {

  const [moviename, setMoviename] = useState('');
  const [poster, setPoster] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');

  const [movieOption, setMovieOption] = useState([]);

  const fetchMovieOptions = async () => {
    try {
      const response = await fetch('http://localhost:3005/moviedata');
      if (response.ok) {
        const data = await response.json();
        setMovieOption(data);
      } else {
        console.error('Failed to fetch movie options');
      }
    } catch (error) {
      console.error('Error while fetching movie options:', error);
    }
  };

  useEffect(() => {
    fetchMovieOptions();
  }, []);

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleNameChange = (e) => {
    setMoviename(e.target.value);
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      moviename: moviename,
      poster: poster,
      description: description,
    };

    fetch('http://localhost:3005/moviedata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Data saved successfully');
          setMoviename('');
          setPoster('');
          setDescription('');
          fetchMovieOptions(); // Refresh movie options after adding a new movie
        } else {
          alert('Failed to save data');
        }
      })
      .catch((error) => {
        console.error('Error while saving data:', error);
      });
  };


  const deleteMovie = () => {
    if (selectedMovie) {
      const movieToDelete = movieOption.find((movie) => movie.moviename === selectedMovie);
      if (movieToDelete) {
        fetch(`http://localhost:3005/moviedata/${movieToDelete._id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              alert(`${selectedMovie} Movie Deleted`);
              setSelectedMovie('');
              fetchMovieOptions(); // Refresh movie options after deleting a movie
            } else {
              alert('Failed to delete the movie');
            }
          })
          .catch((error) => {
            console.error('Error while deleting the movie:', error);
          });
      } else {
        alert('Movie not found');
      }
    } else {
      alert('Please select a movie to delete');
    }
  };


  return (
    <div className='main' >
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="moviename">Movie Name:</label>
          <input type="text" id="moviename" value={moviename} onChange={handleNameChange} />
        </div>

        <div>
          <label htmlFor="poster">Poster Link:</label>
          <input type="text" id="poster" value={poster} onChange={handlePosterChange} />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
        </div>

        <button type="submit">Add Movie</button>
      </form>

      <div id='selthe'>
        <h4>Select Movie</h4>
        <select value={selectedMovie} onChange={handleMovieChange}>
          <option value="">Select Movie</option>
          {movieOption.map((movie, index) => (
            <option key={index} value={movie.moviename}>
              {movie.moviename}
            </option>
          ))}
        </select>
      </div>
      <button onClick={deleteMovie}>Delete Movie</button>
     
    </div>
  );
}
