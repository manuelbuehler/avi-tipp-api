import React from "react";
import './App.css';
import Scrapper from './Scrapper';

const App = () => {
  return (
    <main className="table">
      <section className="table__header">
        <h1>Euro2024 Tippspiel Ranking</h1>
      </section>
      <section className="table__body">
        <Scrapper />
      </section>
    </main>
  );
};

export default App;
