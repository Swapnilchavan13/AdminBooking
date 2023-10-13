import React, { useEffect, useState } from 'react';
import '../Styles/allot.css';

export const Allocatemovie = () => {
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [selectedMovieData, setSelectedMovieData] = useState([]);

  const [movieNames, setMovieOption] = useState([]);
  const [theaterOptions , setTheaterOptions] =  useState([])
   

  const fetchMovieOptions = async () => {
    try {
      const response = await fetch('http://localhost:3005/moviedata');
      if (response.ok) {
        const data = await response.json();
        const md =(data.map((el) => el.moviename));    
        setMovieOption(md);
      } else {
        console.error('Failed to fetch movie options');
      }

      const theatreres = await fetch('http://localhost:3005/theatredata');
      if (theatreres.ok) {
        const tdata = await theatreres.json();
        const td =(tdata.map((el) => el.name));    
        setTheaterOptions(td);
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



  const handleTheatreChange = (event) => {
    setSelectedTheatre(event.target.value);
  };

  const showTimes = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];

  const startDate = new Date(); // Set your start date here
  const days = 14;

  const [selectedShowTimes, setSelectedShowTimes] = useState({});

  const handleShowTimeChange = (movieName, day, showTime) => {
    const key = `${movieName}-${day}-${showTime}`;
    setSelectedShowTimes((prevSelectedShowTimes) => ({
      ...prevSelectedShowTimes,
      [key]: !prevSelectedShowTimes[key],
    }));
  };

  const isShowTimeSelected = (movieName, day, showTime) => {
    const key = `${movieName}-${day}-${showTime}`;
    return selectedShowTimes[key] || false;
  };

  const canSelectShowTime = (movieName, day, showTime) => {
    for (const otherMovieName of movieNames) {
      if (otherMovieName !== movieName) {
        if (isShowTimeSelected(otherMovieName, day, showTime)) {
          return false;
        }
      }
    }
    return true;
  };

  const getDayOfWeek = (date) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
  };

  const handleSave = (day) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);
    const formattedDate = currentDate.toLocaleDateString();

    const dayData = {
      date: formattedDate,
      movieData: {},
      theatreName: selectedTheatre,
    };

    movieNames.forEach((movieName) => {
      dayData.movieData[movieName] = {};
      showTimes.forEach((showTime) => {
        const key = `${movieName}-${day}-${showTime}`;
        dayData.movieData[movieName][showTime] = selectedShowTimes[key] || false;
      });
    });git

    setSelectedMovieData((prevData) => [...prevData, dayData]);

    // alert("Data Saved")
  };

  const handleSaveAllData = () => {
    // console.log(selectedMovieData);

     // Make a POST request using the fetch API
     fetch('http://localhost:3005/allocatedata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedMovieData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Data saved successfully');
        } else {
          alert('Failed to save data');
        }
      })
      .catch((error) => {
        console.error('Error while saving data:', error);
      });

    alert("All Data Saved")
  };

  const editData = () => {
    alert("Clicked On Edit")
  }

  return (
    <div className="main">
      <h1>Allocate Movie</h1>
      <h3>Select Theatre: {selectedTheatre}</h3>
      <div id='selthe'>
        <select value={selectedTheatre} onChange={handleTheatreChange}>
          <option value="">Select Theatre</option>
          {theaterOptions.map((theatre, index) => (
            <option key={index} value={theatre}>
              {theatre}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div>
        <table className="movie-table">
          <thead>
            <tr>
              <th>Movie</th>
              {movieNames.map((movieName) => (
                <th key={movieName}>{movieName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(days).keys()].map((day) => {
              const currentDate = new Date(startDate);
              currentDate.setDate(startDate.getDate() + day);
              const formattedDate = currentDate.toLocaleDateString();
              const dayOfWeek = getDayOfWeek(currentDate);

              return (
                <tr key={day}>
                  <td>
                    <h4>{dayOfWeek}</h4>
                    <h5>{formattedDate}</h5>
                  </td>
                  {movieNames.map((movieName) => (
                    <td key={movieName}>
                      {showTimes.map((showTime) => (
                        <label key={showTime}>
                          <input
                            type="checkbox"
                            checked={isShowTimeSelected(movieName, day, showTime)}
                            disabled={!canSelectShowTime(movieName, day, showTime)}
                            onChange={() => handleShowTimeChange(movieName, day, showTime)}
                          />
                          {showTime}
                        </label>
                      ))}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleSave(day)}>Save</button><br />
                    <button onClick={editData}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={handleSaveAllData}>Save All Data</button>
      </div>
    </div>
  );
};
