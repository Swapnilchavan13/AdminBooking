import React, { useState } from 'react';
import '../Styles/movie.css'

export const Addmovie = () => {

  const [moviename, setMoviename] = useState('');
  const [poster, setPoster] = useState(null);
  const [description, setDescription] = useState('');

  const handleNameChange = (e) => {
    setMoviename(e.target.value);
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
    console.log('Movie Name:', moviename);
    console.log('Poster File:', poster);
    console.log('Description:', description);

    // Clear the form after submission
    setMoviename('');
    setPoster(null);
    setDescription('');
  };
  return (
    <div className='main' >
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="moviename">Movie Name:</label>
          <input type="text" id="moviename" value={moviename} onChange={handleNameChange} />
        </div>

        <div>
          <label htmlFor="poster">Poster File:</label>
          <input type="file" id="poster" onChange={handlePosterChange} />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
        </div>

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}