import React, { useEffect, useState } from 'react';
import '../Styles/allot.css';

export const Allocatemovie = () => {
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [movieNames, setMovieOption] = useState([]);
  const [poster, setPoster]=useState([]);
  const [theaterOptions , setTheaterOptions] =  useState([])
   

  const fetchMovieOptions = async () => {
    try {
      const response = await fetch('http://localhost:3005/moviedata');
      if (response.ok) {
        const data = await response.json();
        const pd =(data.map((el) => el.poster));
        const md =(data.map((el) => el.moviename));
        setPoster(pd)    
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

  const handleSave = async (day) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);
    const formattedDate = currentDate.toLocaleDateString();
  
    const newData = {
      date: formattedDate,
      theatreName: selectedTheatre,
      movieData: {}
    };
  
    movieNames.forEach((movieName) => {
      const showTimeData = [];
  
      showTimes.forEach((showTime) => {
        const key = `${movieName}-${day}-${showTime}`;
        const showTimeValue = selectedShowTimes[key];
  
        if (showTimeValue === true) {
          showTimeData.push(showTime);
        }
      });
  
      if (showTimeData.length > 0) {
        newData.movieData[movieName] = showTimeData;
      }
    });
  
    // Make a POST request to the API
    const response = await fetch('http://localhost:3005/allocatedata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
  
    // Check the response status
    if (response.status === 200) {
      // Data saved successfully
      alert('Data saved successfully');
    } else {
      // Error saving data
      alert('Error saving data');
    }
  };
  

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
                <th key={movieName}>{movieName}
                <img width="150px" height="200px" src={poster} alt="" />
                </th>
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};