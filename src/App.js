import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Ranking from './Ranking';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let timerId;

    const setupNextRefresh = () => {
      const now = new Date();
      const target = new Date();
      
      target.setHours(7, 30, 0, 0);

      if (now >= target) {
        target.setDate(target.getDate() + 1);
      }

      const msUntilTarget = target.getTime() - now.getTime();

      console.log(`Automatisches Update geplant in ${Math.round(msUntilTarget / 1000 / 60)} Minuten (um 07:30 Uhr).`);

      timerId = setTimeout(() => {
        console.log("Es ist 07:30 Uhr! Trigger-Wecker klingelt, Daten werden aktualisiert...");
        setRefreshKey(prevKey => prevKey + 1);
        setupNextRefresh();
      }, msUntilTarget);
    };

    setupNextRefresh();

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home key={`home-${refreshKey}`} />} />
        <Route path="/:communityid" element={<Ranking key={`ranking-${refreshKey}`} />} />
      </Routes>
    </Router>
  );
}

export default App;