# Django Setup
This guide will walk you through the steps to set up the back-end of this project on your local machine.

## Prerequisites
- Python 3.1X installed on your machine
- A basic understanding of Django
- A terminal or command prompt

## Step 1: Access `./Backend`
Considering that you are at `./UniBook` you can access `./UniBook/Backend` with the following command:
```
cd Backend
```

## Step 2: Create a virtual environment
It's recommended to use a virtual environment to isolate the dependencies of the project from your system. You can create a virtual environment with the following command:
```
virtualenv <environment-name>
```

If you don't have virtualenv installed, you can install it using the following command:
```
pip install virtualenv
```

## Step 3: Activate virtual environment

To activate the virtual environment on Windows you can use the following command:
```
<environment-name>\Scripts\Activate
```

And on macOS and Linux with the following command:
```
source <environment-name>/bin/activate
```

## Step 4: Install the dependencies
Install the required packages with the following command:

```
pip install -r requirements.txt
```

## Step 5: Migrate the database
Change to the project directory and set up the database, with the following command:

```
cd UniBook
python manage.py migrate
```

If you want, you can populate the database on Windows with the following commands:
```
python3 manage.py loaddata base/fixtures/genres.json
python3 manage.py loaddata base/fixtures/books.json
python3 manage.py loaddata base/fixtures/book_inventories.json
python3 manage.py loaddata base/fixtures/addresses.json
python3 manage.py loaddata base/fixtures/users.json
```

And on macOS and Linux with the following command:
```
python manage.py loaddata base/fixtures/*.json
```


## Step 6: Run the development server
You can now run the development server with the following command:
```
python manage.py runserver
```

The development server should now be running at `http://localhost:8000/`.

If you want to understand more about this project's API, you can learn how to run its documentation here: [Running Documentation](./UniBook/base/api/documentation/README.md)
