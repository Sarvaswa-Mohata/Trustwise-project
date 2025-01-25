import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';

const useEmotionPrediction = (text) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const queryEmotion = async (reviewText) => {
      try {
        const response = await fetch("http://localhost:5002/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: reviewText }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Emotion prediction result:", result);
        // Restrict to a maximum of 5 data points and map to the format needed for PieChart
        const data = result[0].slice(0, 5).map((item) => ({
          label: item.label,
          value: item.score, // Use "value" for compatibility with PieChart
        }));
        console.log("Emotion prediction data:", data);

        setChartData(data);
      } catch (error) {
        console.error("Error fetching emotion prediction:", error);
        setChartData([]);
      }
    };

    if (text) {
      queryEmotion(text);
    }
  }, []);

  return chartData;
};

// Component to display the Pie Chart
const EmotionChartPopup = ({ reviewText }) => {
  const chartData = useEmotionPrediction(reviewText);

  return (
    <Box sx={{ width: '100%' }}>
        {reviewText}
      {chartData ? (
        <PieChart
          height={300}
          series={[
            {
              data: chartData,
              innerRadius: 0, // Fixed radius for a full pie chart
              arcLabel: (params) => `${params.label}: ${(params.value * 100).toFixed(1)}%`,
              arcLabelMinAngle: 20,
            },
          ]}
          slotProps={{
            legend: {
              direction: 'column', // Stack legend vertically
              position: { horizontal: 'right', vertical: 'middle' }, // Object for position
              sx: {
                transform: 'translateX(10px)', // Optional additional styling to move legend
              },
            },
          }}  
        />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default EmotionChartPopup;
