import React, { useEffect, useState } from 'react';
import '../Styles/allot.css';

export const Allocatemovie = () => {
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [movieNames, setMovieOption] = useState([]);
  const [poster, setPoster]=useState([]);
  const [theaterOptions , setTheaterOptions] =  useState([])
  const [savedRows, setSavedRows] = useState([]);
  const [allocatedata , setAlloacatedata] = useState([]);
  const [atheatre , setatheatre] = useState([]);
  const [adate , setadate] = useState([]);
  const [selectedTheatreBeforeDelete, setSelectedTheatreBeforeDelete] = useState(''); // New state variable
  const [deleteActionTaken, setDeleteActionTaken] = useState(false); // New state variable
  const [dataFetched, setDataFetched] = useState(false); // Add a flag to indicate if data has been fetched


  

  const fetchMovieOptions = async () => {
    try {
      const response = await fetch('http://62.72.59.146:3005/moviedata');
      if (response.ok) {
        const data = await response.json();
        const pd =(data.map((el) => el.poster));
        const md =(data.map((el) => el.moviename));
        setPoster(pd)    
        setMovieOption(md);
      } else {
        console.error('Failed to fetch movie options');
      }

      const theatreres = await fetch('http://62.72.59.146:3005/theatredata');
      if (theatreres.ok) {
        const tdata = await theatreres.json();
        const td =(tdata.map((el) => el.name));   
        setTheaterOptions(td);
      } else {
        console.error('Failed to fetch movie options');
      }

      const allocates = await fetch('http://62.72.59.146:3005/allocatedata');
      if (allocates.ok) {
        const adata = await allocates.json();
        const aa = adata.map((el) => el.theatreName)
        const dd = adata.map((el) => el.date)
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

    if (selectedTheatre === '') {
      // Display an error message or take any other appropriate action
      alert('Please Select Theatre');
      return;
    }

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
      setSavedRows([...savedRows, day]);
    });

 
   // Make a POST request to the API
const response = await fetch('http://62.72.59.146:3005/allocatedata', {
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
};

const handleDelete = async (data) => {
  try {
    // Store the selected theatre before deleting
    setSelectedTheatreBeforeDelete(selectedTheatre);

    // Make a DELETE request to the API to delete data
    const response = await fetch(`http://62.72.59.146:3005/allocatedata/${data._id}`, {
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
              // console.log(formattedDate)

               // Find data corresponding to the date and theatre
            const dataForDay = allocatedata.find(item => item.date === formattedDate && item.theatreName === selectedTheatre);   
              
              var val = false; // Initialize val to false before the loop
              for (var i = 0; i < adate.length; i++) {
                if (formattedDate === adate[i] && selectedTheatre === atheatre[i]) {
                    val = true;
                      }
                   }                        
              return (
                <tr key={day} className={selectedTheatre !=='' && savedRows.includes(day) || val ? 'saved' : 'save'}>
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