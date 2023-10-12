import React, { useState } from 'react';
import { Addmovie } from './Addmovie';
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
    // Here, you can save the data to your desired storage or perform other actions.
    console.log('Data to be saved:', details);

    // Clear the form or reset it as needed
    setDetails({
      name: '',
      location: '',
      rows: [],
      loginid: '',
      password:''
    });

    // Optionally, you can clear the Addmovie component data here
    // Addmovie.clearData();
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

      <button onClick={addRow}>Add Row +</button>

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
