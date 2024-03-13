# Fresh Clone

## Demo

To explore a demo of Fresh Clone, visit [https://freshsupport.joses.dev/](https://freshsupport.joses.dev/)

## Project Explanation

For further explanation about the project, visit [https://joses.dev/](https://joses.dev/)

## Local Installation

### Pre Requisites

Before installing Fresh Clone locally, ensure you have the following installed:

- MongoDB
- Node.js
- Python 3

### Installation steps

1. **Clone the repository**: Begin by cloning or downloading the repository to your local machine.

2. **Install Dependencies**: Navigate to the main folder of the cloned repository and install the dependencies for the frontend, backend and for the python scripts.

```
cd frontend
npm install
```

```
cd ../backend
npm install
```

```
cd ../database_script
pip install bcrypt pymongo python-dotenv
```

3. **Populate the Database**: Run the populate_database.py script to populate the database with necessary information for the website. Inside **database_script** folder run this command.

```
python populate_database.py
```

Follow the prompts to add an extra user if needed.

4. **Set Environmental Variables**: Create a **.env** file inside the **backend** folder and define the following variables:

```
PORT=5001
MONGO_URI=mongodb://127.0.0.1/freshsupportdb
JWT_SECRET=1234
ALLOWED_URLS=http://localhost:3000

```

Ensure that the ALLOWED_URLS matches the URL where your frontend is hosted. If it's not localhost:3000, modify this variable accordingly.

5. **Start the Server and Website**: Navigate to the respective folders and start the server and frontend.

Inside the **backend** folder:

```
node server.js
```

Inside frontend folder.

```
npm start
```

The Fresh Clone project should now be accessible and ready for use on your local machine. Feel free to explore and interact with it.
