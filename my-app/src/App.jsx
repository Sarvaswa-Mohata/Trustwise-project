import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BeautyProductReviewCards from './CardComponent.jsx';
import ProductGrid from './ProductCards.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<ProductGrid />} />
        <Route path="/admin" element={<BeautyProductReviewCards />} />
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
