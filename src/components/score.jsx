// App.js
import React from 'react';
// import './App.css';
import Leaderboard from './leaderboard';

const users = [
  { id: 1, name: 'Anirudh', score: 120 },
  { id: 2, name: 'Karthik', score: 90 },
  { id: 3, name: 'Abhy', score: 80 },
  { id: 4, name: 'Sheena 4', score: 75 },
  { id: 5, name: 'Manasvi', score: 60 },
  // Add more users as needed
];

function App() {
  return (
    <div className="App">
      
      <main>
        <Leaderboard users={users} />
      </main>
    </div>
  );
}

export default App;
