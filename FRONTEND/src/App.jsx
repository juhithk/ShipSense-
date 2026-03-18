import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './Home/HomePage';
import HomePageLight from './Home/HomePageLight';
import GlobalStyles from './GlobalStyles';

function App() {
  const [isLight, setIsLight] = useState(false);

  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={
          isLight
            ? <HomePageLight toggleTheme={() => setIsLight(false)} />
            : <HomePage toggleTheme={() => setIsLight(true)} />
        } />
      </Routes>
    </Router>
  );
}

export default App;