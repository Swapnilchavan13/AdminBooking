import React, { useEffect, useState } from 'react';
import '../Styles/movie.css'

export const Addmovie = () => {
  const [moviename, setMoviename] = useState('');
  const [poster, setPoster] = useState(null);
  const [description, setDescription] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');

  const [movieOption, setMovieOption] = useState([]);

  const [showLinksPopup, setShowLinksPopup] = useState(false);

  const toggleLinksPopup = () => {
    setShowLinksPopup(!showLinksPopup);
  };

  const adminuser = localStorage.getItem('adminloggedinuser')

  var show = "none"

  if(adminuser == 'admin1' || adminuser == 'admin2' || adminuser == 'admin3'){
    show="block"
  }

  const renderLinksPopup = () => {
    if (showLinksPopup) {
      return (
        <div className="popup">
          <button onClick={toggleLinksPopup}>Close</button>
          <p>Here are some poster links:</p>
          <ol>
            <li>Tiger-3: <br /> https://i.postimg.cc/7LSCR6HQ/tiger33.jpg</li>
            <li>Aankh Micholi: <br /> https://i.postimg.cc/1585w8dC/Aankh-Micholi.jpg</li>
            <li>Lakeerein: <br />https://i.postimg.cc/Dz8ztXhk/lakeerein.jpg</li>
            <li>The Lady Killer:<br /> https://i.postimg.cc/vBT52Bqc/The-lady-killer.jpg</li>
            <li>Bombay: <br />https://i.postimg.cc/nLXnrfM6/bombay.jpg </li>
            <li>Dunki: <br /> https://i.postimg.cc/jqX1bSWm/dunki.jpg</li>
            <li>Salaar: <br /> https://i.postimg.cc/zXB3w79B/salaar.jpg</li>
            <li>Animal: <br /> https://i.postimg.cc/YSzB4K2s/animal-001.jpg</li>
            <li>Yodha: <br /> https://i.postimg.cc/DfQ9Sn5W/Yodha.jpg</li>
            <li>Housefull-5: <br /> https://i.postimg.cc/YSzY4N5c/Housefull5.webp</li>
          </ol>
        </div>
      );
    }
  };

  const fetchMovieOptions = async () => {
    try {
      const response = await fetch('http://62.72.59.146:3005/moviedata');
      if (response.ok) {
        const data = await response.json();
        console.log(data)
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

    if(!newData.poster){
      alert ("Please Attach Poster")
      return;
    }

    fetch('http://62.72.59.146:3005/moviedata', {
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
        fetch(`http://62.72.59.146:3005/moviedata/${movieToDelete._id}`, {
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

  const showlink = () => {
    toggleLinksPopup();
  };

  return (
    <div className='main' style={{display:show}}>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="moviename">Movie Name:</label>
          <input type="text" id="moviename" value={moviename} onChange={handleNameChange} />
        </div>

        <div>
          <label htmlFor="poster">Poster Link: <span style={{ color: 'blue', cursor: 'pointer' }} onClick={showlink}>Get the poster links</span></label>
          {renderLinksPopup()}
          <input type="text" id="poster" value={poster} onChange={handlePosterChange} />
        </div>

        {poster && (
          <div>
            <h2>Preview</h2>
            <img width="200px" src={poster} alt="Poster Preview" />
          </div>
        )}

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
