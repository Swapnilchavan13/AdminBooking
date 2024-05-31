import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/event.css'; // Import the CSS file

export const EnvFrontend = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [eventAddress, setEventAddress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [pricePerSeat, setPricePerSeat] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eventName', eventName);
    formData.append('eventDescription', eventDescription);
    formData.append('eventCategory', eventCategory);
    formData.append('pincode', pincode);
    formData.append('city', city);
    formData.append('eventAddress', eventAddress);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('eventTime', eventTime);
    formData.append('numberOfSeats', numberOfSeats);
    formData.append('pricePerSeat', pricePerSeat);
    images.forEach((image) => formData.append('images', image));
    if (video) formData.append('video', video);

    try {
      await axios.post('http://62.72.59.146:3005/eventupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Files uploaded successfully');
      alert("Event Is Created");

        // Reset all fields to empty
    setEventName('');
    setEventDescription('');
    setEventCategory('');
    setPincode('');
    setCity('');
    setEventAddress('');
    setStartDate('');
    setEndDate('');
    setEventTime('');
    setNumberOfSeats('');
    setPricePerSeat('');
    setImages([]);
    setVideo(null);

    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };


  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };


  return (
    <form className="event-form" onSubmit={handleSubmit}>

        <label htmlFor="eventName">Event Name</label>
      <input
        className="form-input"
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <label htmlFor="eventDescription">Event Description</label>
      <textarea
        className="form-input"
        placeholder="Event Description"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      ></textarea>

<label htmlFor="eventCategory">Event Category</label>

      <select
        className="form-input"
        value={eventCategory}
        onChange={(e) => setEventCategory(e.target.value)}
      >
        <option value="">Select Event Category</option>
        <option value="music">Music</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="kids">Kids</option>
        
      </select>

      
      <label htmlFor="pincode">Pincode</label>

      <input
        className="form-input"
        type="text"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

<label htmlFor="city">City</label>

      <input
        className="form-input"
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

<label htmlFor="eventAddress">Event Address</label>

      <input
        className="form-input"
        type="text"
        placeholder="Event Address"
        value={eventAddress}
        onChange={(e) => setEventAddress(e.target.value)}
      />

<label htmlFor="startDate">Start Date</label>

      <input
        className="form-input"
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

<label htmlFor="endDate">End Date</label>

      <input
        className="form-input"
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

<label htmlFor="eventTime">Event Time</label>

      <input
        className="form-input"
        type="time"
        placeholder="Event Time"
        value={eventTime}
        onChange={(e) => setEventTime(e.target.value)}
      />
        <label htmlFor="numberOfSeats">Number of Seats</label>
      <input
        className="form-input"
        type="number"
        placeholder="Number of Seats"
        value={numberOfSeats}
        onChange={(e) => setNumberOfSeats(e.target.value)}
      />

<label htmlFor="pricePerSeat">Price per Seat</label>

      <input
        className="form-input"
        type="number"
        placeholder="Price per Seat"
        value={pricePerSeat}
        onChange={(e) => setPricePerSeat(e.target.value)}
      />

<label htmlFor="selectimages">Select Images (Multiple)</label>
<input className="form-input"  accept="image/*" type="file" multiple onChange={handleImageChange} />

<div className="selected-images">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
            <button onClick={() => removeImage(index)}>Remove</button>
          </div>
        ))}
      </div>

<label htmlFor="selectvideo">Select Video</label>

      <input className="form-input" type="file" accept="video/*" onChange={handleVideoChange} />
      <button className="form-button" type="submit">Upload</button>
    </form>
  );
};
