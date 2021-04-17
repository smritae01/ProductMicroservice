## Product And Cart Microservices

#### Functionalities of the Product Microservice:

- API Request:
  * HTTP Method: GET
  * Request URI: /rest/v1/products
  * Query Parameters: NA
- Response : Products JSON object

#### Functionalities of the Cart Microservice:

- API Request:
  * HTTP Method: PUT
  * Request URI: /rest/v1/users/<uuid>/cart
  * Body Parameter:
    {
    "productId": "12445dsd234",
    "quantity": 2,
    }

- API Request:
   * HTTP Method: GET
   * Request URI: /rest/v1/users/<uuid>/cart
- Response : CartItem JSON object

#### UserIDs to be used : smrt123, raghu901, rahul087

#### Installations necessary to run the microservices:

- Clone this git repository

`git clone https://github.com/smritae01/ProductMicroservice.git`

- Run this to install all dependencies 

`npm install`

- Start NodeJS server at http://localhost:3000

`npm run start`

#### Technologies used:

- nodejs
- express
- mongoDB (for storage) & mongoDB Atlas (for hosting)
- mongoose

