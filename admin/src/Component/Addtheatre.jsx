import React, { useState } from 'react';
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
    theatrePinCode: '',
    theatreOperatorEmail: '',
    theatreOperatorContact: '',
    theatreOperatorName: '',
    theatreOperatorIDproof: '',
    theaterScreens: 1,
    isDeleted: false,
    rows: [],
  });

  const [currentOption, setCurrentOption] = useState('A');
  const [lastoption, setLastoption] = useState(false);

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
      theatreName: details.theatreName,
      theatreLocation: details.theatreLocation,
      theatreCity: details.theatreCity,
      theatrePinCode: details.theatrePinCode,
      theatreOperatorEmail: details.theatreOperatorEmail,
      theatreOperatorContact: details.theatreOperatorContact,
      theatreOperatorName: details.theatreOperatorName,
      theatreOperatorIDproof: details.theatreOperatorIDproof,
      theaterScreens: details.theaterScreens,
      isDeleted: details.isDeleted,
      rows: details.rows,
    };

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
          setDetails({
            theatreName: '',
            theatreLocation: '',
            theatreCity: '',
            theatrePinCode: '',
            theatreOperatorEmail: '',
            theatreOperatorContact: '',
            theatreOperatorName: '',
            theatreOperatorIDproof: '',
            theaterScreens: 1,
            isDeleted: false,
            rows: [],
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
        Theater Screens:
        <select name="theaterScreens" value={details.theaterScreens} onChange={handleInputChange}>
          <option value="">Select Screens</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
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
