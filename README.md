# Project: Nashville&#x20;

## Overview

Nashville is an interactive web application designed for managing customer reviews, monitoring ratings, and providing insights into product performance. The project uses a modern UI/UX theme and is fully dockerized for streamlined deployment. The application focuses on visual appeal, responsiveness, and a user-friendly experience.

---

## Features

1. **Customer Review Management**:
   - View reviews with avatars, product images, timestamps, and star ratings.
   - Gibberish prediction of the review texts displayed using a linear progress bar.
2. **Responsive Design**:
   - Optimized for desktop and mobile devices.
   - Theme consistency with elegant typography and color schemes.
3. **Dockerized Deployment**:
   - Easy setup with all required services exposed and pre-configured.
4. **Backend Support**:
   - Serves data via multiple servers for production, emotion analysis, and API requests.

---

## Prerequisites

Make sure you have the following installed on your machine:

- **Docker** and **Docker Compose**
- **Node.js** (for local development, if required)
- **Python 3.9+** (if running backend manually)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sarvaswa-Mohata/Trustwise-reviews
cd my-app
```

### 2. Dockerized Setup

#### Build the Docker Containers

```bash
docker-compose up --build
```

#### Exposed Ports:

- **Frontend**: `http://localhost:5173`
- **Backend Servers**:
  - `server.js`: Port `5003`
  - `serverForProd.js`: Port `5000`
  - `uvicorn app:app`: Port `8000`
  - `serverForEmoAnalysis`: Port `5002`

---

## Manual Setup (Optional)

### 1. Install Dependencies

```bash
cd src
npm install
```

### 2. Run Backend Servers

- **server.js**:
  ```bash
  node server.js
  ```
- **serverForProd.js**:
  ```bash
  node serverForProd.js
  ```
- gibberish prediction of text:
  ```bash
  uvicorn app:app 
  ```
- **emotion analysis of text**:
  ```bash
  node serverForEmoAnalysis.js
  ```

### 3. Run the Frontend

```bash
npm run dev
```

---

## API Endpoints

### General Server (server.js)

- **GET** `/api/reviews`: Returns a list of customer reviews.

### Production Server (serverForProd.js)

- **GET** `/api/products`: Returns product data with associated reviews and ratings.

### Emotion Analysis Server (serverForEmoAnalysis.py)

- **POST** `/analyze`:
  Accepts review text and returns emotion analysis results.

## Testing

To ensure all components work correctly:

1. **Frontend Testing**:
   - Run `npm test` to execute unit and integration tests for UI components.
2. **Backend Testing**:
   - Use tools like Postman or cURL to test API endpoints.

---

## Deployment

**USER SIDE**
![image](https://github.com/user-attachments/assets/8f31f245-dfd8-4560-9d61-586fd5f90ef7)
![image](https://github.com/user-attachments/assets/5bca52b6-5e22-4c89-b438-1ede3175b985)
![image](https://github.com/user-attachments/assets/254b6ab5-8e71-4df6-9981-ec9eade758f2)
![image](https://github.com/user-attachments/assets/00d5bc92-f87e-421a-8dd8-1eb5297a7f9a)

**ADMIN SIDE**
![image](https://github.com/user-attachments/assets/e000d0aa-5f80-4519-a750-a022f883d4bd)
![image](https://github.com/user-attachments/assets/d02ff1bc-7162-4e41-8aa3-5c2fc66607e3)




---

## Troubleshooting

- **Docker Issues**:
  - Ensure no conflicting processes are running on exposed ports.
  - Run `docker-compose logs` for detailed container logs.
- **Frontend Not Loading**:
  - Confirm the backend is running and API endpoints are reachable.
- **Backend Crashing**:
  - Check the logs for syntax errors or missing dependencies.

---

## License

This project is licensed under the MIT License.

---

## Contributors

- Sarvaswa Mohata 

