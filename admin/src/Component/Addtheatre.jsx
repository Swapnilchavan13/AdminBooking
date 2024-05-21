import React, { useState, useEffect } from 'react';
import '../Styles/theatre.css';

export const Addtheatre = () => {
  const adminuser = localStorage.getItem('adminloggedinuser');
  var show = "none";

  if (adminuser === 'admin1' || adminuser === 'admin2' || adminuser === 'admin3') {
    show = "block";
  }

  const [details, setDetails] = useState({
    theatreName: '',
    theatreLocation: '',
    theatreCity: '',
    pinCodesForAllocation: [], 
    theatrePinCode: '',
    theatreOperatorEmail: '',
    theatreOperatorContact: '',
    theatreOperatorName: '',
    theatreOperatorIDproof: '',
    theaterScreens: 1,
    totalScreens: 0,
    seatingCapacity: null,
    isDeleted: false,
    rows: [],
    theatreId: 0, // Initialize theatreId
  });

  const [currentOption, setCurrentOption] = useState('A');
  const [lastoption, setLastoption] = useState(false);

  useEffect(() => {
    // Fetch theater data from the API to check for existing theater combinations
    fetch('http://62.72.59.146:3005/theatredata')
      .then(response => response.json())
      .then(data => {
        // Check if theater combination already exists
        const existingTheatre = data.find(theatre =>
          theatre.theatreName === details.theatreName &&
          theatre.theatreCity === details.theatreCity &&
          theatre.theatrePinCode === details.theatrePinCode
        );

        if (existingTheatre) {
          // If theater combination exists, set the same theatreId
          setDetails(prevDetails => ({
            ...prevDetails,
            theatreId: existingTheatre.theatreId
          }));
        } else {
          // If theater combination doesn't exist, assign new theatreId
          setDetails(prevDetails => ({
            ...prevDetails,
            theatreId: data.length + 1
          }));
        }
      })
      .catch(error => console.error('Error fetching theater data:', error));
  }, [details.theatreName, details.theatreCity, details.theatrePinCode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const inputName = name === 'seatingcapacity' ? 'seatingCapacity' : name;

    if (name === 'pinCodesForAllocation') {
      // Split the input value by commas to get individual pin codes
      const pinCodes = value.split(',').map(pin => pin.trim());
      setDetails({
        ...details,
        [inputName]: pinCodes,
      });
    } else {
      setDetails({
        ...details,
        [inputName]: value,
      });
    }
  };

  const addRow = () => {
    let newRow = { option: currentOption, seats: 0 };
    if (currentOption === 'D') {
      setLastoption(true);
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
    const newData = {
      ...details,
      rows: details.rows.map(row => ({ ...row, option: row.option.toUpperCase() }))
    };

    fetch('http://62.72.59.146:3005/theatredata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (response.ok) {
          alert('First data saved successfully');
          // Make the second POST request after the first one completes
          return fetch('http://192.168.0.134:8012/postTheatreData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
          });
        } else {
          alert('Failed to save first data');
          throw new Error('Failed to save first data');
        }
      })
      .then((response) => {
        if (response.ok) {
          alert('Second data saved successfully');
          // Perform any necessary actions after successful save
        } else {
          alert('Failed to save second data');
          throw new Error('Failed to save second data');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div className='main' style={{ display: show }}>
      <h1>Add Theatre</h1>

      <label>
        Theatre Name:
        <input type="text" name="theatreName" value={details.theatreName} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Theatre Location:
        <input type="text" name="theatreLocation" value={details.theatreLocation} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Theatre City:
        <input type="text" name="theatreCity" value={details.theatreCity} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Theatre PinCode:
        <input type="text" name="theatrePinCode" value={details.theatrePinCode} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Pin Codes for Allocation (Separate by commas):
        <input type="text" name="pinCodesForAllocation" value={details.pinCodesForAllocation} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Theatre Operator Email:
        <input type="text" name="theatreOperatorEmail" value={details.theatreOperatorEmail} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Theatre Operator Contact:
        <input type="text" name="theatreOperatorContact" value={details.theatreOperatorContact} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Theatre Operator Name:
        <input type="text" name="theatreOperatorName" value={details.theatreOperatorName} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Theatre Operator IDproof:
        <input type="text" name="theatreOperatorIDproof" value={details.theatreOperatorIDproof} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Total Screens:
        <input type="number" name="totalScreens" value={details.totalScreens} onChange={handleInputChange} />
      </label>
      <label>
        Theater Screens:
        <select name="theaterScreens" value={details.theaterScreens} onChange={handleInputChange}>
          <option value="">Select Screens</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>
      <br />
      <label>
        Seating Capacity:
        <input type="number" name="seatingCapacity" value={details.seatingCapacity} onChange={handleInputChange} />
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
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
            </select>
          </label>
        </div>
      ))}
      <br />

      <button onClick={handleSave}>Save</button>
    </div>
  );
};
