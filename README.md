# SQUIZZ Web Ordering Application Frontend

## Table of Contents
1. [Project Description](##Project-Description)
2. [Features](##Features)
3. [Documentation](##Documentation)
4. [System Requirements](##System-Requirements)
5. [Technologies Used](##Technologies-Used)
6. [Setup Guide](##Setup-Guide)
7. [Testing](##Testing)
8. [Attribution](##Attribution)


## Project Description
This repository contains the frontend client for the SQUIZZ Web Ordering Application. The client supports in-browser rendered 3D models for different swirl diffuser products, and also dynamic customer-level pricing for Holyoake and PJ SAS products.


## Demo
The website can be found at http://13.211.211.152/login

The application is currently deployed on AWS. It's availability entirely depends on whether or not the client has chosen to terminate the EC2 instance that the application was deployed on.


## Features
* User authentication (login/logout)
* Customer account creation and switching
* Personalised customer-level pricing based on the selected customer account
* Category trees for Holyoake and PJ SAS products
* Creating an order for desired products
* Viewing past order details
* In-browser rendering of 3D models for Holyoake swirl diffuser products on various pages (Product Details, Order History, Product Listings, Cart) 
* Zoom, rotation, and panning capabilities when interacting with the rendered 3D models
* Displaying parameterized data for the rendered 3D models
* Capability to readd an entire order back to the cart
* View multiple 3D models or images for a product, if available


## Documentation
All of the process and product related documentation regarding the entire project can be found in the [backend](https://github.com/ansabkhaliq/backend) GitHub repository.

## System Requirements
The frontend can be run on any operating system. 

Listed below are the requirements to run the application:
* [Node.js](https://nodejs.org/en/) v12.0 or above
* [Docker](https://docs.docker.com/get-docker/) (only if running the application using Docker)

We also recommend using [Visual Studio Code](https://code.visualstudio.com/download) for development.

## Technologies Used
* [React.js](https://reactjs.org/) as a frontend library
* [Webpack](https://webpack.js.org/) as a module bundler
* [Babel](https://babeljs.io/) to transpile ES6 down to older versions of JavaScript
* [Ant Design of React](https://ant.design/docs/react/introduce) as a primary UI component library
* [Jest](https://jestjs.io/) as a test runner
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for writing unit and integration tests
* [Easy Peasy v4](https://easy-peasy.now.sh/) as a global application state management library


## Setup Guide
There are three different methods to run the application, either locally or in production.

**Note**: The frontend relies on the backend and database to be running. Please refer to the [backend repository](https://github.com/ansabkhaliq/backend) for more details.

### Using Docker
You can use Docker to run a container for the frontend. The repository contains a multi-stage build Dockerfile to serve the frontend using `nginx` as a reverse proxy. This is the method we have used in production. It is not advisable to use for local deployment.

The steps below indicate how to run the frontend using Docker.

1. Create an image for the frontend
    ```bash
    $ docker build -t squizz/react-frontend:latest .
    ```

2. Run a container for the image
    ```bash
    $ docker run -p 3000:80 --name react-frontend squizz/react-frontend:latest
    ```

### Using Express.js
You can also use an [Express.js](https://expressjs.com/) server to serve the frontend. This method was created by the previous team, but has been left in case a future team wants to use Node.js to serve the frontend, instead of Nginx.

**Note**: You will need to modify both the `PORT` and `target` in `src/server/server.js`, since they are currently configured for a production environment, and not local development. For example, you could set the port to 3000 and target to `http://localhost:5000` (depending on where your backend is deployed).

The steps below outline how to serve the frontend with a Express.js server.
1. First, install dependencies
    ```bash
    $ npm install
    ```

2. Then, run the build to create the output `dist` directory
    ```
    $ npm run build
    ```

3. Then, run the Express server
    ```
    $ npm run express
    ```

### Using Webpack Dev Server
Using a [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/) is the primary method you should use to run the frontend, if you are developing the project.

The steps below indicate how to run the frontend with `webpack-dev-server`.

1. Install dependencies
    ```bash
    $ npm install
    ```

2. Start the dev server
    ```bash
    $ npm start
    ```

## Testing
We have written integration and unit tests for various frontend components and pages. The tests can be found [here](./__test__/), in the `__test__` directory.

To run the all of the tests:
```bash
$ npm run test
```

## Attribution
Created by SQ-Wombat and SQ-Koala