import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Ranking from './Ranking';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:communityid" element={<Ranking />} />
      </Routes>
    </Router>
  );
}

export default App;