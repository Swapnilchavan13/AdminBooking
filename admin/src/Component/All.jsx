import React, { useState, useEffect } from 'react';

export const All = () => {
  const [allData, setAllData] = useState([]);
  const apiUrl = 'http://62.72.59.146:3005/bookingdata';

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setAllData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const calculateAmount = (seats) => {
    return seats.length * 100;
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
  };

  const thStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
  padding: '10px',
    textAlign: 'left',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    minWidth: '120px',
  };

  const evenRowStyle = {
    backgroundColor: '#f2f2f2',
  };

  const oddRowStyle = {
    backgroundColor: '#fff',
  };

  const headerStyle = {
    background: 'linear-gradient(to right, #4CAF50, #2196F3)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
    fontSize: '36px',
    textAlign: 'center',
  };

  return (
    <div>
      <h2 style={headerStyle}>All Movie Booking</h2>
      <table style={tableStyle}>
        <thead>
          <tr style={evenRowStyle}>
            <th style={thStyle}>Theatre Name</th>
            <th style={thStyle}>Movie Name</th>
            <th style={thStyle}>Customer Name</th>
            <th style={thStyle}>Gender</th>
            <th style={thStyle}>Payment Method</th>
            <th style={thStyle}>UPI Id</th>
            <th style={thStyle}>Show Date</th>
            <th style={thStyle}>Show Time</th>
            <th style={thStyle}>Seats</th>
            <th style={thStyle}>Booking Amount</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((booking, index) => (
            <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
              <td style={tdStyle}>{booking.tname}</td>
              <td style={tdStyle}>{booking.mname}</td>
              <td style={tdStyle}>{booking.customerName}</td>
              <td style={tdStyle}>{booking.gender}</td>
              <td style={tdStyle}>{booking.paymentMethod}</td>
              <td style={tdStyle}>{booking.upiRef || "NA"}</td>
              <td style={tdStyle}>{booking.sdate}</td>
              <td style={tdStyle}>{booking.showtime}</td>
              <td style={tdStyle}>{booking.seats.join(', ')}</td>
              <td style={tdStyle}>{calculateAmount(booking.seats)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
