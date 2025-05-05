import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {
  const[pcs, setPcs] = useState([]);

  // Fetches axios and data from backend. 
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/data");
    console.log("response is: ", response);
    setPcs(response.data);
  }

  useEffect(() => {
    fetchAPI()
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>D&D Players</h1>

      {pcs.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Level</th>
              <th>Feats</th>

            </tr>
          </thead>
          <tbody>
            {pcs.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.level}</td>
                <td>{item.feats}</td>

              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading or no data found.</p>
      )}
    </div>
  );
}


export default App;
