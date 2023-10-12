import React, { useState } from 'react';
import '../Styles/allot.css';

export const Allocatemovie = () => {
  // Hardcoded data for demonstration
  const movieNames = ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"];
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

  const [savedData, setSavedData] = useState([]);

  const handleSave = (day) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);
    const formattedDate = currentDate.toLocaleDateString();

    // Create an object to store the data for this day
    const dayData = {
      date: formattedDate,
      movieData: {},
    };

    // Loop through each movie and showtime to save the data
    movieNames.forEach((movieName) => {
      dayData.movieData[movieName] = {};
      showTimes.forEach((showTime) => {
        const key = `${movieName}-${day}-${showTime}`;
        dayData.movieData[movieName][showTime] = selectedShowTimes[key] || false;
      });
    });

    // Update the saved data
    setSavedData((prevData) => [...prevData, dayData]);
    console.log(savedData);
  };

  return (
    <div className="main">
      <h1>Allocate Movie</h1>
        <h3>Select Theatre</h3>
      <select>
      <option value="selct">Select Theatre</option>
        <option value="PVR">PVR</option>
        <option value="INOX">INOX</option>
        <option value="MAXX">MAX</option>
        <option value="GOLD">GOLD</option>
      </select>
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
                    {dayOfWeek}, {formattedDate}
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
                    <button onClick={() => handleSave(day)}>Save</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={() => console.log(savedData)}>Save All Data</button>
      </div>
    </div>
  );
};
