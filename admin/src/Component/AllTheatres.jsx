import React, { useState, useEffect } from 'react';

export const AllTheatres = () => {
  const [theatres, setTheatres] = useState([]);
  const [editedPinCodes, setEditedPinCodes] = useState({});
  const [updatedTheatreId, setUpdatedTheatreId] = useState('');
  const [tc, setTc] = useState({}); // Modify tc to be an object instead of a string

  // Fetch data from the API
  useEffect(() => {
    fetch('http://62.72.59.146:3005/theatredata')
      .then(response => response.json())
      .then(data => {
        setTheatres(data);
        // Extract theatre cities and store them in the tc state
        const cities = {};
        data.forEach(theatre => {
          cities[theatre._id] = theatre.theatreId;
        });
        setTc(cities);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (theatreId) => {
    setUpdatedTheatreId(theatreId);
  
    // Extract the pin codes for allocation for the specific theatreId
    const pinCodesForAllocation = editedPinCodes[theatreId];
    const iid = tc[theatreId]; // Access theatre city from tc state
  
    // Log the theatre city
    console.log(iid);
  
    const updateData = { pinCodesForAllocation };
  
    console.log(`Updating theatre with ID: ${theatreId}`);
    console.log('Data to be sent:', updateData);
  
    // Make PUT request to update theatre details on first API
    fetch(`http://62.72.59.146:3005/theatredata/${theatreId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pinCodesForAllocation }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update theatre details on first API');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
        // Make PUT request to update theatre details on second API
        return fetch(`http://97.74.94.109:4121/updateTheaterDetails/${iid}`, { // Use iid here
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pinCodesForAllocation }),
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update theatre details on second API');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
        // Refresh data after successful update
        fetch('http://62.72.59.146:3005/theatredata')
          .then(response => response.json())
          .then(data => setTheatres(data))
          .catch(error => console.error('Error fetching data:', error));
      })
      .catch(error => console.error('Error updating theatre details:', error));
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
