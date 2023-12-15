import os

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

print("Connected to the database")

activities_collection = db.activities
agents_collection = db.agents
contacts_collection = db.contacts
tickets_collection = db.tickets
todos_collection = db.todos
notes_collection = db.notes

activities_collection.delete_many({})
print("Activities deleted")
tickets_collection.delete_many({})
print("Tickets deleted")
todos_collection.delete_many({})
print("Todos deleted")
notes_collection.delete_many({})
print("Notes deleted")

agents_collection.update_many({}, {"$set": {"ticketsAssigned": [], "todos": []}})
print("Agents' tickets assigned and todos deleted")

contacts_collection.update_many({}, {"$set": {"tickets": []}})
print("Contact tickets deleted")

# agents todos, ticketsAssigned
# contacts tickets


