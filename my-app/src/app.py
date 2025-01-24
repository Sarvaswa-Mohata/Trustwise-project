from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForSequenceClassification, AutoTokenizer

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and tokenizer
model = AutoModelForSequenceClassification.from_pretrained("wajidlinux99/gibberish-text-detector")
tokenizer = AutoTokenizer.from_pretrained("wajidlinux99/gibberish-text-detector")

# Define the input schema using Pydantic
class TextInput(BaseModel):
    text: str  # Expecting a 'text' field of type string

@app.post("/predict")
async def predict(input: TextInput):
    text = input.text  # Access the text field from the request body
    # Tokenize the text input
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
    
    # Make prediction with the model
    outputs = model(**inputs)
    
    # Get probabilities (softmax of logits)
    probabilities = outputs.logits.softmax(dim=-1).tolist()
    
    return {"probabilities": probabilities}
