// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const Login = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const credentials = [
//     { username: 'admin1', password: 'password123' },
//     { username: 'admin2', password: 'password456' },
//     { username: 'admin3', password: 'password789' },
//   ];

//   const handleLogin = () => {
//     const validCredentials = credentials.find(
//       (cred) => cred.username === username && cred.password === password
//     );

//     if (validCredentials) {
//       localStorage.setItem('adminloggedinuser', username);
//       navigate('addtheatre');
//       setError('');
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   const styles = {
//     container: {
//       width: '300px',
//       margin: '0 auto',
//       padding: '20px',
//       border: '1px solid #ccc',
//       borderRadius: '5px',
//       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//     },
//     heading: {
//       textAlign: 'center',
//     },
//     label: {
//       display: 'block',
//       marginBottom: '8px',
//     },
//     input: {
//       width: '100%',
//       padding: '8px',
//       marginBottom: '16px',
//       boxSizing: 'border-box',
//     },
//     button: {
//       width: '100%',
//       padding: '10px',
//       backgroundColor: '#4caf50',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '5px',
//       cursor: 'pointer',
//     },
//     buttonHover: {
//       backgroundColor: '#45a049',
//     },
//     error: {
//       color: 'red',
//       marginTop: '10px',
//       textAlign: 'center',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Login</h2>
//       <div>
//         <label style={styles.label}>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={styles.input}
//         />
//       </div>
//       <div>
//         <label style={styles.label}>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />
//       </div>
//       <button
//         onClick={handleLogin}
//         style={styles.button}
//         onMouseOver={(e) => (e.target.style = styles.buttonHover)}
//         onMouseOut={(e) => (e.target.style = styles.button)}
//       >
//         Login
//       </button>
//       {error && <div style={styles.error}>{error}</div>}
//     </div>
//   );
// };


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const credentials = [
    { username: 'admin1', password: 'password123' },
    { username: 'admin2', password: 'password456' },
    { username: 'admin3', password: 'password789' },
  ];

  var main= localStorage.getItem('adminloggedinuser')

  const handleLogin = () => {
    const validCredentials = credentials.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (validCredentials) {
      localStorage.setItem('adminloggedinuser', username);
      // navigate('addtheatre');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminloggedinuser');
    navigate('/'); // Redirect to login page after logout
  };

  const styles = {
    // ... (existing styles remain unchanged)
    container: {
      width: '300px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '16px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    error: {
      color: 'red',
      marginTop: '10px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      {main ? (
        <>
          <h2 style={styles.heading}>Welcome, {main}!</h2>
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        </>
      ) : (
        <>
          <h2 style={styles.heading}>Login</h2>
          <div>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button
            onClick={handleLogin}
            style={styles.button}
            onMouseOver={(e) => (e.target.style = styles.buttonHover)}
            onMouseOut={(e) => (e.target.style = styles.button)}
          >
            Login
          </button>
          {error && <div style={styles.error}>{error}</div>}
        </>
      )}
    </div>
  );
};
