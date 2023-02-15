# Running Documentation
This guide will walk you through the steps to run the documentation of this project API on your local machine.

## Prerequisites
- Node.js and npm installed on your machine
- A terminal or command prompt

## Step 1: Access `./documentation`
Considering that you are at `./UniBook/Backend` you can access `./UniBook/Backend/UniBook/base/api/documentation` with the following command:
```
cd UniBook/base/api/documentation
```

## Step 2: Install the dependencies
Install the required package with the following command:
```
npm install --global serve
```

## Step 3: Run the documentation server
You can now run the documentation server with the following command:
```
npx serve -l 5000
```

The documentation server should now be running at `http://localhost:5000/`.
