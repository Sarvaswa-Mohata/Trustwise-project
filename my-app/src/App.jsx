import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BeautyProductReviewCards from './CardComponent.jsx';
import NashvilleLandingPage from './NashvilleLangingPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<BeautyProductReviewCards />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
        <Route path="/" element={<NashvilleLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
