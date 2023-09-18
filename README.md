# Climate Details API

This API provides climate-related data for different areas, including temperature, humidity, and chances of rain. It allows users to submit climate data and retrieve records based on climate type, area code, and more.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Testing with Postman](#testing-with-postman)
- [NOTE](#note)
  
## Getting Started

These instructions will help you set up and use the Climate Details API.

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/climate-details-api.git

2. Change to the project directory:

   ```bash
   cd climate-details-api

3. Initialize node_modules:

   ```bash
   npm init -y 

4. Install the dependencies:

   ```bash
   npm install express dotenv mongoose nodemon

5. Setup the 'scripts' in your package.json:

   ```bash
   "scripts": {
      "start": "nodemon index.js"
   },

6. Set up your MongoDB connection in the .env file:

   ```bash
   MONGODB_URI = your-mongodb-connection-uri

7. Start the server:

   ```bash
   npm start

Your API should now be running on ``` http://localhost:3000 ```.

## Usage

This API allows you to :
* Submit the climate data
* Retrieve records based on climate type.
* Calculate climate deltas for temperature, humidity, and chances of rain.

## Endpoints

* **POST /api/climate-data** : _Submit climate data._
* **GET /api/climate-data/all** : _Retrieve all records._
* **GET /api/climate-data/:areaCode/:climate** : _Retrieve records by area code and climate type._
* **POST /api/calculate-climate-deltas** : _Calculate climate deltas based on provided climate data._

## Testing with Postman

You can test the API endpoints using Postman. Here are some sample requests and responses:

### 1. POST /api/climate-data :
        
   ![post_req_1_save_data](https://github.com/imrithwik1908/climate-details-api/assets/114339638/7fd616e2-e0d0-4647-bf7e-509f06fceeb0)

### 2. GET /api/climate-data/all :

  ![get_req_2_fetch_data](https://github.com/imrithwik1908/climate-details-api/assets/114339638/6ab7b837-ffe2-457b-b3b4-8283b7356706)

### 3. GET /api/climate-data/:areaCode/:climate :

  ![get_req_4_fetch_data_area_climate](https://github.com/imrithwik1908/climate-details-api/assets/114339638/2ed03f62-472c-4ec1-b597-9afeb13d5036)

### 4. POST /api/calculate-climate-deltas :

  ![post_req_5_climate_deltas](https://github.com/imrithwik1908/climate-details-api/assets/114339638/3c76bb84-e516-4ec6-a437-52fb5f894791)

## NOTE 

In this project, APIs are developed and tested with Postman. The requests (POST and GET) and their responses can be in the previous section, where the tests are shown as screenshots of the Postman application.





















