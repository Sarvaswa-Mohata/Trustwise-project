const fetchPrediction = async (text) => {
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }), // sending the raw text
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      const firstPrediction = result.probabilities[0][0];
      console.log('Prediction:', firstPrediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };
  
  // Call the function with the desired text
  fetchPrediction("Is this text really worth it?");
  