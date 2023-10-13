import React, { useState } from 'react';
import '../Styles/theatre.css'

export const Addtheatre = () => {
  const [details, setDetails] = useState({
    name: '',
    location: '',
    rows: [],
    loginid:'',
    password:''
  });

  const [currentOption, setCurrentOption] = useState('A');
  const [lastoption, setLastoption]= useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };


  const addRow = () => {
    let newRow = { option: currentOption, seats: 0 };
    if (currentOption === 'D') {
      setLastoption(true)
      newRow = { option: 'D', seats: 0, disabled: true };
    }

    setDetails({
      ...details,
      rows: [...details.rows, newRow],
    });

    setCurrentOption((prevOption) => {
      if (prevOption === 'A') return 'B';
      if (prevOption === 'B') return 'C';
      if (prevOption === 'C') return 'D';
      return prevOption;
    });
  };

  const handleSeatChange = (index, seats) => {
    const updatedRows = [...details.rows];
    updatedRows[index].seats = seats;
    setDetails({
      ...details,
      rows: updatedRows,
    });
  };

  const handleSave = () => {
    // Prepare the data to be sent in the request body
    const newData = {
      name: details.name,
      location: details.location,
      rows: details.rows,
      loginid: details.loginid,
      password: details.password,
    };
  
    // Make a POST request using the fetch API
    fetch('http://localhost:3005/theatredata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Data saved successfully');
          // Clear the form or reset it as needed
          setDetails({
            name: '',
            location: '',
            rows: [],
            loginid: '',
            password: '',
          });
          window.location.reload(false);
        } else {
          alert('Failed to save data');
        }
      })
      .catch((error) => {
        console.error('Error while saving data:', error);
      });
  };
  

  return (
    <div className='main'>
      <h1>Add Theatre</h1>
      <label>
        Theatre Name:
        <input type="text" name="name" value={details.name} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" name="location" value={details.location} onChange={handleInputChange} />
      </label>
      <br />

      <h4>Add Rows And Seats</h4>
      <div>
      <button disabled={lastoption} onClick={addRow}>Add Row +</button>
      </div>


      {details.rows.map((row, index) => (
        <div key={index}>
          <label>
            Row: {row.option}
          </label>
          <label>
            Add Seats:
            <select
            className='seatno'
              value={row.seats}
              onChange={(e) => handleSeatChange(index, parseInt(e.target.value))}
            >
              <option value={0}>Seats</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
            </select>
          </label>
        </div>
      ))}
      <br />
      <label>
      Create Login Id:
        <input type="text" name="loginid" value={details.loginid} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Create Password:
        <input type="text" name="password" value={details.password} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
      {/* <Addmovie /> */}
    </div>
  );
};
