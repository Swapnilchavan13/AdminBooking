import React, { useEffect, useState } from 'react';
import '../Styles/allot.css';

export const Allocatemovie = () => {
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [cities, setCities] = useState('');
  const [theaters, setTheaters] = useState('');

  const[s, setSs]= useState([]);

  const [selectedScreen, setSelectedScreen] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [movieNames, setMovieOption] = useState([]);
  const [poster, setPoster] = useState([]);
  const [desc, setDesc] = useState([]);

  const [theaterOptions, setTheaterOptions] = useState({})
  const [savedRows, setSavedRows] = useState([]);
  const [allocatedata, setAlloacatedata] = useState([]);
  const [atheatre, setatheatre] = useState([]);
  const [adate, setadate] = useState([]);

  const [selectedTheatreBeforeDelete, setSelectedTheatreBeforeDelete] = useState(''); // New state variable
  const [deleteActionTaken, setDeleteActionTaken] = useState(false); // New state variable
  const [dataFetched, setDataFetched] = useState(false); // Add a flag to indicate if data has been fetched

  const adminuser = localStorage.getItem('adminloggedinuser')

  var show = "none"

  if (adminuser == 'admin1' || adminuser == 'admin2' || adminuser == 'admin3') {
    show = "block"
  }


  const fetchMovieOptions = async () => {
    try {
      const response = await fetch('http://localhost:3005/moviedata');
      if (response.ok) {
        const data = await response.json();

        var movieData = {};
        data.forEach((movie) => {
          movieData[movie.movieName] = movie._id;
        });

        const pd = (data.map((el) => el.posterImage));
        const md = (data.map((el) => el.movieName));

        setPoster(pd)
        setMovieOption(md);

      } else {
        console.error('Failed to fetch movie options');
      }

      // console.log(movieData)

      const theatreres = await fetch('http://localhost:3005/theatredata');
      if (theatreres.ok) {
        const tdata = await theatreres.json();
        // Extract unique city names from theater data
        const cities = [...new Set(tdata.map((el) => el.theatreCity))];
        setCities(cities);

        const uniqueTheaters = [...new Set(tdata.map((el) => el.theatreName))];
        setTheaters(uniqueTheaters);

        // Extract theatre names and IDs from the response
        const theaterOptions = tdata.map((el) => ({
          name: el.theatreName,
          id: el._id,
          screen: el.theaterScreens,
          theatreID: el.theatreId,
          theatrecity: el.theatreCity
        }));

        setTheaterOptions(theaterOptions);
      } else {
        console.error('Failed to fetch movie options');
      }

      const allocates = await fetch('http://localhost:3005/allocatedata');
      if (allocates.ok) {
        const adata = await allocates.json();
        const aa = adata.map((el) => el.theatreId)
        const dd = adata.map((el) => el.date)
        const ss = adata.map((el) => el.selectedscreen)        
        setSs(ss)
        setatheatre(aa)
        setadate(dd)
        setAlloacatedata(adata);

      } else {
        console.error('Failed to fetch movie options');
      }
      setDataFetched(true);
    } catch (error) {
      console.error('Error while fetching movie options:', error);
    }
  };

  console.log(allocatedata)

  useEffect(() => {
    fetchMovieOptions();
  }, []);

  const handleTheatreChange = (event) => {
    setSelectedTheatre(event.target.value);
  };

  const handleScreenChange = (event) => {
    setSelectedScreen(event.target.value);
  };

  const showTimes = ["9:00 AM", "12:00 PM", "3:00 PM", "4:00 PM", "6:00 PM", "9:00 PM"];

  const startDate = new Date(); // Set your start date here
  const days = 30;

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
    if (selectedTheatre === '' || selectedScreen === '') {
      // Display an error message or take any other appropriate action
      alert('Please Select Theatre and Screen');
      return;
    }

    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day);
    const formattedDate = currentDate.toLocaleDateString();

     // Find the theater object based on the selected theater ID
     const selectedTheaterObj = theaterOptions.find(theater => theater.id === selectedTheatre);

  console.log("theaterOptions", theaterOptions)

    const newData = {
      admin: adminuser,
      date: formattedDate,
      city: selectedCity,
      theatreId: selectedTheaterObj.theatreID,
      theatreName: selectedTheaterObj.name,
      selectedscreen: selectedScreen,
      description: '',
      movieData: {},
      photo: poster,
      isActive: false,
      startDate: new Date(), // Set start date as current date
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Set end date as the next date    
      startDate_EP: '',
      endDate_EP: '',
      category: '',
      totalLikes: 0,
      totalComments: 0,
      likedBy: {},
      screenId: selectedScreen
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
      setSavedRows([...savedRows, day]);
    });

    try {
      // Make a POST request to the API
      const response = await fetch('http://localhost:3005/allocatedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });

      if (response.status === 200) {
        // Data saved successfully
        const result = await response.json();

        if (result.message === 'Duplicate data') {
          alert('Error: Duplicate data');
        } else {
          alert('Data saved successfully');
          fetchMovieOptions(); // Fetch data again to update the state
        }
      } else {
        // Error saving data
        alert('Error saving data');
      }
    } catch (error) {
      console.error('Error while saving data:', error);
    }
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);

    // Filter theaters based on the selected city
    const filteredTheaters = theaterOptions.filter(theater => theater.theatrecity === selectedCity);
    setTheaters(filteredTheaters);

    // Reset selected theater when city changes
    setSelectedTheatre('');
    setSelectedScreen('');
  };

  const handleDelete = async (data) => {
    try {
      // Store the selected theatre before deleting
      setSelectedTheatreBeforeDelete(selectedTheatre);

      // Make a DELETE request to the API to delete data
      const response = await fetch(`http://localhost:3005/allocatedata/${data._id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Data deleted, update UI
        const updatedData = allocatedata.filter(item => item._id !== data._id);
        setAlloacatedata(updatedData);
        alert('Data Reset Successfully');

        // Set the delete action flag
        setDeleteActionTaken(true);
      } else {
        alert('Error Reset data');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };




  useEffect(() => {
    fetchMovieOptions();
    // Check if a delete action was taken and if so, select the same theatre again
    if (deleteActionTaken) {
      setSelectedTheatre(selectedTheatreBeforeDelete);
      // Reset the delete action flag
      setDeleteActionTaken(false);
    }
  }, [deleteActionTaken]);

  if (!dataFetched) {
    return <div>Loading...</div>;
  }


  // Filter unique theater names based on selected city
  // Filter unique screen IDs based on selected city
  const uniqueScreenIds = [...new Set(theaters.map((theater) => theater.screen))];


  return (
    <div className="main" style={{ display: show }}>
      <h1>Allocate Movie</h1>
      <h3>Select Theatre: {selectedTheatre}</h3>

      <h3>Select City:</h3>
      <div id='selthe'>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Select City</option>
          {/* Map cities dynamically */}
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div id='selthe'>
        <select value={selectedTheatre} onChange={handleTheatreChange}>
          <option value="">Select Theatre</option>
          {theaters.map((theater, index) => (
            <option key={index} value={theater.theatreID}>
              {theater.name}
            </option>
          ))}
        </select>
      </div>

      <div id='selthe'>
        <select value={selectedScreen} onChange={handleScreenChange}>
          <option value="">Select Screen</option>
          {uniqueScreenIds.map((screenId, index) => (
            <option key={index} value={screenId}>
              {screenId}
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
              {movieNames.map((movieName, index) => (
                <th key={movieName}>{movieName}
                  <br />
                  <img width="150px" height="200px" src={poster[index]} alt="" />
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

              // Find data corresponding to the date and theatre
 // Find data corresponding to the date and theatre
 const dataForDay = allocatedata.find(item => item.date === formattedDate && item.theatreId == selectedTheatre && item.selectedscreen == selectedScreen );
 

 var val = false; // Initialize val to false before the loop
              for (var i = 0; i < adate.length; i++) {
                if (formattedDate === adate[i] && selectedTheatre === atheatre[i] && selectedScreen === s[i]) {
                  val = true;
                }
              }
              return (
                <tr key={day} className={selectedTheatre !== '' && savedRows.includes(day) || val ? 'saved' : 'save'}>
                  <td>
                    <h4>{dayOfWeek}</h4>
                    <h5>{formattedDate}</h5>
                  </td>
                  {movieNames.map((movieName) => (
                    <td key={movieName}>
                      {showTimes.map((showTime) => (
                        <label key={showTime}>
                          <input
                            checked={isShowTimeSelected(movieName, day, showTime)}
                            type="checkbox"
                            disabled={!canSelectShowTime(movieName, day, showTime)}
                            onChange={() => handleShowTimeChange(movieName, day, showTime)}
                          />
                          {showTime}
                        </label>
                      ))}
                    </td>
                  ))}
                  <td>
                    <button className='savebtn' onClick={() => handleSave(day)}>{val ? "Saved" : "Save"}</button><br />
                    <button className='delbtn' onClick={() => handleDelete(dataForDay)}>{val ? "Reset" : "Reset"}</button><br />
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