import React, { useState, useEffect } from 'react';

export const AllTheatres = () => {
  const [theatres, setTheatres] = useState([]);
  const [editedPinCodes, setEditedPinCodes] = useState({});
  const [updatedTheatreId, setUpdatedTheatreId] = useState('');

  // Fetch data from the API
  useEffect(() => {
    fetch('http://62.72.59.146:3005/theatredata')
      .then(response => response.json())
      .then(data => setTheatres(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to handle editing of pinCodesForAllocation
  const handleEdit = (theatreId) => {
    setUpdatedTheatreId(theatreId);
    // Make PUT request to update pinCodesForAllocation
    fetch(`http://62.72.59.146:3005/theatredata/${theatreId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pinCodesForAllocation: editedPinCodes[theatreId] }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        // Refresh data after successful update
        fetch('http://62.72.59.146:3005/theatredata')
          .then(response => response.json())
          .then(data => setTheatres(data))
          .catch(error => console.error('Error fetching data:', error));
      })
      .catch(error => console.error('Error updating pin codes:', error));
  };

 // Function to handle input change for pin codes
const handlePinCodeChange = (event, theatreId) => {
    const value = event.target.value;
    // Split the input value by commas and remove any empty strings or non-numeric values
    const filteredValues = value
      .split(',')
      .map(pin => pin.trim())
      .filter(pin => pin !== '' && !isNaN(pin))
      .map(pin => parseInt(pin, 10));
  
    setEditedPinCodes(prevState => ({
      ...prevState,
      [theatreId]: value.split(',').map(pin => pin.trim())
    }));
  };
  

  return (
    <div>
      <h1>All Theatres</h1>
      {theatres.map(theatre => (
        <div key={theatre._id}>
          <h2>{theatre.theatreName}</h2>
          <p>Theatre Location: {theatre.theatreLocation}</p>
          <p>Theatre City: {theatre.theatreCity}</p>
          <p>Theatre PinCode: {theatre.theatrePinCode}</p>
          {/* Input field for editing pinCodesForAllocation */}
          <input
  type="text"
  placeholder="Enter pin codes separated by comma"
  value={editedPinCodes[theatre._id] || theatre.pinCodesForAllocation.join(', ')}
  onChange={(event) => handlePinCodeChange(event, theatre._id)}
/>

          {/* Edit button */}
          <button onClick={() => handleEdit(theatre._id)}>Update Pin Codes</button>
          <hr />
        </div>
      ))}
    </div>
  );
};
