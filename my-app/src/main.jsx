import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReviewProvider } from './ReviewContext.jsx'

createRoot(document.getElementById('root')).render(
    <ReviewProvider>
        <App />
    </ReviewProvider>
)
