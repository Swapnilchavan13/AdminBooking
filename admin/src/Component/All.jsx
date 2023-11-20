import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

export const All = () => {
  const [allData, setAllData] = useState([]);
  const [cseat, setCseat] = useState(0);

  const [isMobileValid, setIsMobileValid] = useState(true);

  const [filter, setFilter] = useState({
    bookerName:'',
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

  useEffect(() => {
    const totalSeats = allData.reduce((total, booking) => {
      if (booking.paymentMethod === 'Comp') {
        return total + booking.seats.length;
      }
      return total;
    }, 0);
    setCseat(totalSeats)

  }, [allData]); // Ensure that the effect runs whenever allData changes


  const handleDownload = () => {
    const modifiedData = filteredData.map((booking) => ({
      Movie_Name: booking.mname,
      Date: booking.sdate,
      Booker:booking.booker,
      Customer_Name: booking.customerName,
      Mobile_Number: booking.customerMobile,
      Gender: booking.gender,
      Showtime:booking.showtime,
      Booked_Seats: booking.seats.join(', '), 
      Payment_Method : booking.paymentMethod,
      Upi_Id: booking.upiRef,
      Booking_Amount: booking.seats.length * 100, 
    }));

    const ws = XLSX.utils.json_to_sheet(modifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'movie_booking_data.xlsx');
  };



  const calculateAmount = (paymentMethod, seats) => {
    if(paymentMethod ==='Comp'){
      return seats.length * 0;
    }
    if(paymentMethod ==='Cash'){
      return seats.length * 100;
    }
    if(paymentMethod ==='UPI'){
      return seats.length * 100;
    }
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
    minWidth: '80px',
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

  const bookers = [...new Set(allData.map((booking) => booking.booker))];
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
    const bookerMatch =
    filter.bookerName === '' || booking.booker === filter.bookerName;


    return theaterNameMatch && movieNameMatch && dateMatch && showTimeMatch && pMethodMatch && bookerMatch;
  });

  return (
    <div>
      <h2 style={headerStyle}>All Movie Booking</h2>
      <div className='filter'>
        <label>
          Theater Name:
          <select
            name="theaterName"
            onChange={handleFilterChange}
          >
            <option value="">All Theaters</option>
            {theaters.map((theater, index) => (
              <option key={index} value={theater}>
                {theater}
              </option>
            ))}
            value={filter.theaterName}
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
          Booker Name:
          <select
            name="bookerName"
            value={filter.bookerName}
            onChange={handleFilterChange}
          >
            <option value="">All Bookers</option>
            {bookers.map((bookr, index) => (
              <option key={index} value={bookr}>
                {bookr}
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
      <button onClick={handleDownload}>Download Excel</button>

      <table style={tableStyle}>
        <thead>
          <tr style={evenRowStyle}>
            <th style={thStyle}>Theater Name</th>
            <th style={thStyle}>Movie Name</th>
            <th style={thStyle}>Customer Name</th>
            <th style={thStyle}>Customer Mobile</th>
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
              <td style={tdStyle}>{booking.customerMobile}</td>
              <td style={tdStyle}>{booking.gender}</td>
              <td style={tdStyle}>{booking.paymentMethod}</td>
              <td style={tdStyle}>{booking.upiRef || 'NA'}</td>
              <td style={tdStyle}>{booking.sdate}</td>
              <td style={tdStyle}>{booking.showtime}</td>
              <td style={tdStyle}>{booking.seats.join(', ')}</td>
              <td style={tdStyle}>Rs. {calculateAmount((booking.paymentMethod),(booking.seats))}/-</td>
            </tr>
          ))}
          <tr style={totalRowStyle}>
            <td colSpan="9" style={tdStyle}>
              Total
            </td>
            <td style={tdStyle}>
              {filteredData.reduce(
                (total, booking) => total + booking.seats.length,
                0
              )} 
            </td>
            <td style={tdStyle}>
              Rs. {filteredData.reduce(
                (total, booking) => total + booking.seats.length *100,
                0
              )-(cseat*100)}  /-
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
