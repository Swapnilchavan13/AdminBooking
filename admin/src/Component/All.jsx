import React, { useState, useEffect } from 'react';

export const All = () => {
  const [allData, setAllData] = useState([]);
  const [filter, setFilter] = useState({
    theaterName: '',
    movieName: '',
    date: '',
    showTime: '',
    pMethod:''
  });
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

  const totalRowStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
  };

  const theaters = [...new Set(allData.map((booking) => booking.tname))];
  const movies = [...new Set(allData.map((booking) => booking.mname))];
  const dates = [...new Set(allData.map((booking) => booking.sdate))];
  const showTimes = [...new Set(allData.map((booking) => booking.showtime))];
  const pMethods=[...new Set(allData.map((booking) => booking.paymentMethod))];

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const filteredData = allData.filter((booking) => {
    const theaterNameMatch =
      filter.theaterName === '' || booking.tname === filter.theaterName;
    const movieNameMatch =
      filter.movieName === '' || booking.mname === filter.movieName;
    const dateMatch = filter.date === '' || booking.sdate === filter.date;
    const showTimeMatch =
      filter.showTime === '' || booking.showtime === filter.showTime;
      const pMethodMatch =
      filter.pMethod === '' || booking.paymentMethod === filter.pMethod;

    return theaterNameMatch && movieNameMatch && dateMatch && showTimeMatch && pMethodMatch;
  });

  return (
    <div>
      <h2 style={headerStyle}>All Movie Booking</h2>
      <div className='filter'>
        <label>
          Theater Name:
          <select
            name="theaterName"
            value={filter.theaterName}
            onChange={handleFilterChange}
          >
            <option value="">All Theaters</option>
            {theaters.map((theater, index) => (
              <option key={index} value={theater}>
                {theater}
              </option>
            ))}
          </select>
        </label>
        <label>
          Movie Name:
          <select
            name="movieName"
            value={filter.movieName}
            onChange={handleFilterChange}
          >
            <option value="">All Movies</option>
            {movies.map((movie, index) => (
              <option key={index} value={movie}>
                {movie}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date:
          <select
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
          >
            <option value="">All Dates</option>
            {dates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>
        </label>
        <label>
          Payment Method:
          <select
            name="pMethod"
            value={filter.pMethod}
            onChange={handleFilterChange}
          >
            <option value="">All Methods</option>
            {pMethods.map((payment, index) => (
              <option key={index} value={payment}>
                {payment}
              </option>
            ))}
          </select>
        </label>
        <label>
          Show Time:
          <select
            name="showTime"
            value={filter.showTime}
            onChange={handleFilterChange}
          >
            <option value="">All Show Times</option>
            {showTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr style={evenRowStyle}>
            <th style={thStyle}>Theater Name</th>
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
          {filteredData.map((booking, index) => (
            <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
              <td style={tdStyle}>{booking.tname}</td>
              <td style={tdStyle}>{booking.mname}</td>
              <td style={tdStyle}>{booking.customerName}</td>
              <td style={tdStyle}>{booking.gender}</td>
              <td style={tdStyle}>{booking.paymentMethod}</td>
              <td style={tdStyle}>{booking.upiRef || 'NA'}</td>
              <td style={tdStyle}>{booking.sdate}</td>
              <td style={tdStyle}>{booking.showtime}</td>
              <td style={tdStyle}>{booking.seats.join(', ')}</td>
              <td style={tdStyle}>{calculateAmount(booking.seats)}</td>
            </tr>
          ))}
          <tr style={totalRowStyle}>
            <td colSpan="8" style={tdStyle}>
              Total
            </td>
            <td style={tdStyle}>
              {filteredData.reduce(
                (total, booking) => total + booking.seats.length,
                0
              )}
            </td>
            <td style={tdStyle}>
              {filteredData.reduce(
                (total, booking) => total + calculateAmount(booking.seats),
                0
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
