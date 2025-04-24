
# Supply Side Platform (SSP) - Admin Panel

This project is a Supply Side Platform (SSP) simulation built with a React frontend, Node.js backend, and MongoDB database. The Admin Panel allows viewing and managing DSPs (Demand-Side Platforms), ad requests, bidding information, and various analytics such as win rates, CPM trends, and more.

---

## Setup Instructions

### Prerequisites
- Node.js (v14 or above)
- MongoDB (Local or Cloud-based)

### Frontend (React)

1. Clone the repository:
    ```bash
    git clone https://github.com/hiteshjoshi12/SSP-Ad-Auction-Simulator
    cd frontend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Run the frontend:
    ```bash
    npm run dev 
    
    ```
   This will start the frontend server on `http://localhost:5173`.

### Backend (Node.js)

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm start
    ```
   This will start the backend server on `http://localhost:5000`.

### MongoDB Setup

1. Make sure you have MongoDB running locally or use a cloud-based instance (e.g., MongoDB Atlas).
2. Ensure that your database connection URI is correctly set in the backend (`server.js`).

---

## Architecture & Flow Explanation

### Frontend:
- **React.js** is used for building the user interface.
- The frontend communicates with the backend using **Axios** to fetch and display data.
- The frontend displays:
  - Dashboard with analytics
  - DSP management interface
  - Ad Request table
  - Analytics charts (CPM trends, win rates, etc.)

### Backend:
- **Node.js** and **Express** are used for the backend API.
- The backend serves the following endpoints:
  - `/admin/summary` - Returns the summary data including win rates, average CPM, and trends for each DSP.
  - `/admin/dsp` - Manages DSP data (GET, POST, PUT, DELETE operations).
  - `/admin/adrequests` - Manages Ad Requests.
  
- **MongoDB** is used to store:
  - DSP data (DSP schema)
  - Ad request data (AdRequest schema)

### Data Flow:
1. The frontend sends requests to the backend API to fetch DSPs, ad requests, and analytics data.
2. The backend retrieves data from MongoDB and sends it back to the frontend.
3. The frontend processes the data and renders it on the dashboard and tables.

---

## Sample Payloads

### **1. DSP Data (POST /admin/dsp)**
```json
{
  "publisher_id": "123",
  "ad_slot_id": "slot1",
  "name": "US Mobile Ad Campaign",
  "targeting": {
    "geo": "US",
    "device": "Mobile"
  },
  "bid_logic": {
    "geo": "US",
    "device": "Mobile",
    "bid": 2.5
  },
  "creative": {
    "image_url": "https://example.com/ad.jpg",
    "click_url": "https://example.com/landing"
  }
}
```

### **2. AdRequest Data (POST /admin/adrequests)**
```json
{
  "publisher_id": "123",
  "ad_slot_id": "slot1",
  "geo": "US",
  "device": "Mobile",
  "time": "2025-04-01T12:30:00Z",
  "winning_dsp": "US Mobile Ad Campaign",
  "bid_price": 2.5,
  "creative": {
    "image_url": "https://example.com/ad.jpg",
    "click_url": "https://example.com/landing"
  }
}
```

### **3. Analytics Data (GET /admin/summary)**
```json
{
  "total_requests": 100,
  "dsp_summary": [
    {
      "dsp_name": "US Mobile Ad Campaign",
      "win_rate": 66.67,
      "average_cpm": "3.50",
      "total_wins": 2,
      "cpm_trend": [
        { "date": "2025-04-01", "cpm": 3.5 },
        { "date": "2025-04-02", "cpm": 3.8 },
        { "date": "2025-04-03", "cpm": 3.2 }
      ]
    },
    {
      "dsp_name": "India Desktop Ad Campaign",
      "win_rate": 33.33,
      "average_cpm": "1.00",
      "total_wins": 1,
      "cpm_trend": [
        { "date": "2025-04-01", "cpm": 1.2 },
        { "date": "2025-04-02", "cpm": 1.0 },
        { "date": "2025-04-03", "cpm": 1.3 }
      ]
    }
  ]
}
```

---

## Screenshots of the Dashboard




---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

