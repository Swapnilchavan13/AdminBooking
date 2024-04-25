import React, { useEffect, useState } from 'react';
import '../Styles/movie.css';

export const Addmovie = () => {
  const [moviename, setMoviename] = useState('');
  const [poster, setPoster] = useState('');
  const [movieDesc, setMovieDesc] = useState('');
  const [movieRuntime, setMovieRuntime] = useState('');
  const [intervalTime, setIntervalTime] = useState('');
  const [productionHouse, setProductionHouse] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [movieOption, setMovieOption] = useState([]);
  const [showLinksPopup, setShowLinksPopup] = useState(false);
  const [extraImages, setExtraImages] = useState(['', '', '']);

  const toggleLinksPopup = () => {
    setShowLinksPopup(!showLinksPopup);
  };

  const handleExtraImageChange = (index, e) => {
    const images = [...extraImages];
    images[index] = e.target.value;
    setExtraImages(images);
  };



  const adminuser = localStorage.getItem('adminloggedinuser');
  var show = "none";
  if (adminuser === 'admin1' || adminuser === 'admin2' || adminuser === 'admin3') {
    show = "block";
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
        console.log(data);
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

  const renderExtraImagesInputs = () => {
    return extraImages.map((image, index) => (
      <div key={index}>
        <label htmlFor={`extraImage${index + 1}`}>Extra Image {index + 1}:</label>
        <input type="text" id={`extraImage${index + 1}`} value={image} onChange={(e) => handleExtraImageChange(index, e)} />
      </div>
    ));
  };

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleNameChange = (e) => {
    setMoviename(e.target.value);
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.value);
  };


  const handleMovieDescChange = (e) => {
    setMovieDesc(e.target.value);
  };

  const handleMovieRuntimeChange = (e) => {
    setMovieRuntime(e.target.value);
  };

  const handleIntervalTimeChange = (e) => {
    setIntervalTime(e.target.value);
  };

  const handleProductionHouseChange = (e) => {
    setProductionHouse(e.target.value);
  };

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      movieName: moviename,
      posterImage: poster,
      movieDesc: movieDesc,
      movieRuntime: movieRuntime,
      intervalTime: intervalTime,
      productionHouse: productionHouse,
      dateTime: dateTime,
      startDate: startDate,
      endDate: endDate,
      extraImages: extraImages,
      isDeleted: isDeleted,
      isExpired: isExpired,
    };

    if (!newData.posterImage) {
      alert("Please Attach Poster");
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
          setMovieDesc('');
          setMovieRuntime('');
          setIntervalTime('');
          setProductionHouse('');
          setDateTime('');
          setStartDate('');
          setEndDate('');
          extraImages('');
          setIsDeleted(false);
          setIsExpired(false);
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
      const movieToDelete = movieOption.find((movie) => movie.movieName === selectedMovie);
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
    <div className='main' style={{ display: show }}>
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


{renderExtraImagesInputs()}

        <div>
          <label htmlFor="movieDesc">Movie Description:</label>
          <textarea id="movieDesc" value={movieDesc} onChange={handleMovieDescChange} />
        </div>

        <div>
          <label htmlFor="movieRuntime">Movie Runtime:</label>
          <input type="text" id="movieRuntime" value={movieRuntime} onChange={handleMovieRuntimeChange} />
        </div>

        <div>
          <label htmlFor="intervalTime">Interval Time:</label>
          <input type="text" id="intervalTime" value={intervalTime} onChange={handleIntervalTimeChange} />
        </div>

        <div>
          <label htmlFor="productionHouse">Production House:</label>
          <input type="text" id="productionHouse" value={productionHouse} onChange={handleProductionHouseChange} />
        </div>

        <div>
          <label htmlFor="dateTime">Date and Time:</label>
          <input type="text" id="dateTime" value={new Date()} onChange={handleDateTimeChange} />
        </div>

        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} />
        </div>

        <div>
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} />
        </div>
        <br />
        <button type="submit">Add Movie</button>
      </form>

      <div id='selthe'>
        <h4>Select Movie</h4>
        <select value={selectedMovie} onChange={handleMovieChange}>
          <option value="">Select Movie</option>
          {movieOption.map((movie, index) => (
            <option key={index} value={movie.movieName}>
              {movie.movieName}
            </option>
          ))}
        </select>
      </div>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
};
