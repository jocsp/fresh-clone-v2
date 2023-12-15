import os
import random

import bcrypt
import pymongo
from dotenv import load_dotenv

load_dotenv()

ENVIRONMENT = os.getenv('ENVIRONMENT')
DATABASE_URL = os.getenv("DATABASE_URL")

if ENVIRONMENT == 'production':
    client = pymongo.MongoClient(DATABASE_URL)
else:
    client = pymongo.MongoClient("localhost", 27017)


db = client["freshsupportdb"]


print("Connected to database")

priorities_collection = db.priorities
status_collection = db.status
types_collection = db.types
activities_collection = db.activities
agents_collection = db.agents
contacts_collection = db.contacts
groups_collection = db.groups

agents_data = [
    {
        "name": "Jose",
        "email": "jose@fresh.com",
        "username": "jose",

        "todos": [
        ],
        "color": "#E1D1F0",
        "ticketsAssigned": [
        ]
    },
    {
        "name": "Ramon Garcia",
        "email": "ramon@fresh.com",
        "username": "ramon",
        "todos": [
        ],
        "color": "#4AB3A4",
        "ticketsAssigned": [
        ]
    },

    {
        "name": "Sergio Sanchez",
        "email": "sergio@fresh.com",
        "username": "sergio",
        "todos": [
        ],
        "color": "#d1e4ff",
        "ticketsAssigned": [
        ]
    }
]

priorities_data = [
    {"name": "High"},
    {"name": "Medium"},
    {"name": "Urgent"},
    {"name": "Low"},
]

status_data = [
    {"name": "Open"},
    {"name": "Resolved"},
    {"name": "Closed"},
    {"name": "Pending"},
    {"name": "In process"},
]

types_data = [
    {"name": "Problem"},
    {"name": "Incident"},
    {"name": "Feature Request"},
    {"name": "Question"},
]

groups_data = [
    {"name": "Remote Support"},
    {"name": "Management"},
    {"name": "Low Voltage"},
    {"name": "Accounting"},
    {"name": "Field Support"},
]

contacts_data = [
    {
        "name": "Doral dentists",
        "color": "#B2A399",
        "email": "info@doraldentists.com",
        "number": "+17864238872",
        "tickets": []
    },
    {
        "name": "Hialeah Dentists",
        "color": "#CAD3BA",
        "email": "info@hialeahmdd.com",
        "number": "+13054257861",
        "tickets": [],

    },
    {
        "name": "Clavijo Dental",
        "color": "#EDE7D5",
        "email": "infodental@clavijo.com",
        "number": "+15618872345",
        "tickets": [],

    },
]

random_colors = [
    '#4AB3A4',
    '#548999',
    '#ED9611',
    '#E1D1F0',
    '#C9A587',
    '#E6CD4C',
    '#E3AF9B',
    '#dbd6f5',
    '#d1e4ff',
    '#ffd8c2',
    '#cfe3fe',
]


def populate_collection(collection, data):
    empty = collection.count_documents({}) == 0
    print("Is " + collection.name + " empty? Answer: " + str(empty))

    if collection.name == 'agents':
        for agent in agents_data:
            salt = bcrypt.gensalt()
            password_bytes = agent["username"].encode("utf-8")
            hashed_password = bcrypt.hashpw(
                password_bytes, salt).decode("utf-8")
            agent['password'] = hashed_password

    if empty:
        collection.insert_many(data)


def add_user():
    print("Enter the data of the user.")

    name = input("Enter the name: ")
    email = input("Enter the email: ")
    username = input("Enter the username: ")
    password = input("Enter the password: ")

    query = {"email": email}

    email_exists = agents_collection.find_one(query)

    query = {"username": username}

    username_exists = agents_collection.find_one(query)

    if email_exists:
        print("Error: email already exists")
    elif username_exists:
        print("Error: username already exists")
    else:
        salt = bcrypt.gensalt()
        password_bytes = password.encode("utf-8")
        hashed_password = bcrypt.hashpw(password_bytes, salt).decode("utf-8")

        user = agents_collection.insert_one(
            {
                "name": name,
                "email": email,
                "username": username,
                "password": hashed_password,
                "todos": [],
                "color": random.choice(random_colors),
                "ticketsAssigned": [],
            }
        )


if __name__ == "__main__":
    populate_collection(priorities_collection, priorities_data)
    populate_collection(status_collection, status_data)
    populate_collection(types_collection, types_data)
    populate_collection(groups_collection, groups_data)
    populate_collection(contacts_collection, contacts_data)
    populate_collection(agents_collection, agents_data)

    keep_adding = input("Do you want to add a new user? Y/N: ").lower()

    while keep_adding == "y":
        add_user()
        keep_adding = input(
            "Enter Y to keep adding users or any other key to stop: ").lower()


client.close()

print("Connection closed")
