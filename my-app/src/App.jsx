import './App.css'
import BeautyProductReviewCards from './CardComponent.jsx'
import EmotionChartPopup from './EmotionChartPopup.jsx'
import ProductGrid from './ProductCards.jsx'
function App() {

  return (
    <>
    {/* <EmotionChartPopup reviewText={"Hey there, hope you had a good day!"} /> */}
    <ProductGrid/>
    <BeautyProductReviewCards/>
    </>
  )
}

export default App
