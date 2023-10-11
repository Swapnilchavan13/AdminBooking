import React, { useState } from 'react';

export const Addmovie = () => {

  const [name, setName] = useState('');
  const [poster, setPoster] = useState(null);
  const [description, setDescription] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can handle the form submission, e.g., sending data to a server or performing other actions.
    console.log('Name:', name);
    console.log('Poster File:', poster);
    console.log('Description:', description);

    // Clear the form after submission
    setName('');
    setPoster(null);
    setDescription('');
  };
  return (
    <div>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Movie Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>

        <div>
          <label htmlFor="poster">Poster File:</label>
          <input type="file" id="poster" onChange={handlePosterChange} />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
        </div>

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}