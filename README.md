# MERN Stack Coding Challenge
This project implements a backend and frontend solution for a MERN (MongoDB, Express.js, React.js, Node.js) stack coding challenge. It includes APIs to initialize the database, list transactions with search and pagination, and fetch statistics for a selected month.

## Backend

The backend is built with Node.js and Express.js. It connects to a MongoDB database and exposes several RESTful APIs:

### APIs

1. **Initialize Database**
   - Endpoint: `/api/init`
   - Method: GET
   - Description: Fetches data from a third-party API (`https://s3.amazonaws.com/roxiler.com/product_transaction.json`) and initializes the MongoDB database with the fetched data.

2. **List Transactions**
   - Endpoint: `/api/transactions`
   - Method: GET
   - Parameters:
     - `page`: Page number for pagination (default: 1)
     - `perPage`: Number of items per page (default: 10)
     - `search`: Search text to match against `title`, `description`, or `price` fields (default: empty)
   - Description: Fetches transactions from the database based on pagination and search criteria.

3. **Statistics**
   - Endpoint: `/api/statistics`
   - Method: GET
   - Parameters:
     - `month`: Month name (e.g., "January", "February", etc.) to fetch statistics for
   - Description: Calculates and returns statistics for the specified month, including total sale amount, number of sold items, and number of not sold items.
  


## Setup Instructions

### Backend Setup

#### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running locally or accessible via a remote connection

#### Steps

1. **Clone the Repository**

   ```bash
   git clone <https://github.com/sandeshkhairnar/MERN-Stack-Coding.git>

2. **Install Dependencies**
   
   npm install

3. **Configure MongoDB**

Ensure MongoDB is installed and running. You can install MongoDB from MongoDB Download Center.

Update the MongoDB connection URL in server.js located in the root directory of the project:
const DATABASE_URL = 'mongodb://localhost:27017/mern-stack-coding-challenge';

4. **Start the Backend Server**
 npm start
This command will start the backend server at http://localhost:5500



### Run:
http://localhost:5500/
