import React, { useState } from 'react';

export const Addscreen = () => {
  const [formData, setFormData] = useState({
    theatreID: '',
    seatingCapacity: '',
    Desc: '',
    screenNo: '',
    dateTime: '',
    isDeleted: false,
    createdAt: '',
    updatedAt: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      theatreID: '',
      seatingCapacity: '',
      Desc: '',
      screenNo: '',
      dateTime: '',
      isDeleted: false,
      createdAt: '',
      updatedAt: ''
    });
  };

  return (
    <div className="form-container">
      <h2>Add Screen</h2>
      <form onSubmit={handleSubmit}>
       
        <label>
          Theatre ID:
          <input type="text" name="theatreID" value={formData.theatreID} onChange={handleChange} />
        </label>
        <br />
        <label>
          Seating Capacity:
          <input type="text" name="seatingCapacity" value={formData.seatingCapacity} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="Desc" value={formData.Desc} onChange={handleChange} />
        </label>
        <br />
        <label>
          Screen Number:
          <input type="text" name="screenNo" value={formData.screenNo} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date Time:
          <input type="date" name="dateTime" value={formData.dateTime} onChange={handleChange} />
        </label>
        <br />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
