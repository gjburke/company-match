from flask import Flask, render_template, request, jsonify, make_response, redirect
from sentence_transformers import SentenceTransformer, CrossEncoder

import pandas as pd
import numpy as np

from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import os
import heapq

from flask_cors import CORS


app = Flask(__name__)
url = 'http://localhost:3000'
CORS(app, origins=[url])

from app import app

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres.vfyncineneuwxxzlqvor:BananaMatchers2467!@aws-0-us-west-1.pooler.supabase.com:6543/postgres"  # Store URI in an environment variable
#URI key is postgresql://postgres:[PASSWORD!]@db.vfyncineneuwxxzlqvor.supabase.co:5432/postgres
#ASK GRIFFIN FOR DATABASE PASSWORD
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False #Basically makes it where we do not track object modifications; unnecessary
db = SQLAlchemy(app)
migrate = Migrate(app, db) #migrates models from flask to supabase



#flask db init
#flask db migrate -m "Create user table"
#flask db upgrade
#Run this command in the terminal to import the table created with sqlalchemy on flask to supabase

class Company(db.Model):
	__tablename__ = "Descriptions"

	Name = db.Column(db.Text, primary_key = True, name = "Name")
	values = db.Column(db.Text, name = "Values")
	culture = db.Column(db.Text, name = "Culture")
	Description = db.Column(db.Text, name = "Description")
	hiring = db.Column(db.Text, name = "Hiring")


class User(db.Model):
	__tablename__ = "Users"
#
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(100))
	username = db.Column(db.String(100))
	company_list = db.Column(db.String(100000))


#firstuser = User.query.filter_by(name = "Omar Shatat").first()

#new_company = Company(company_name = "", Values = "", Culture = "", company_description = "", Hiring =  "")
#db.session.add(new_company)
#db.session.delete(new_company)


#db.session.commit()

data = pd.read_csv('./curr_data.csv')
transformer = SentenceTransformer("all-MiniLM-L6-v2")
crossencoder = CrossEncoder("cross-encoder/stsb-distilroberta-base")

def getTopCompanies(user_query):
	results = db.session.query(Company.Name, Company.Description).all() #specifying 2 columns we need
	names, descriptions = zip(*results)  # uses basic python to unpack the results and splits each element into the 2 tuples names and descriptions
	description_list = list(descriptions)
	k = 10
	#turns tuples into lists using basic python

	# similarities between the query and 'Company Description' columns - converted in the form of a list

	user_encoding = transformer.encode(user_query)
	company_encoding = transformer.encode(description_list)
	similarities=transformer.similarity(user_encoding, company_encoding)

	# adding similarities column to dataframe
	#df['similarities']=similarities[0]
	similarities = similarities[0]
	top_indices = heapq.nlargest(
		k, 
		range(len(similarities)), 
		key=similarities.__getitem__)
	#going through each element in similarities and gathering indices of highest similarities
	top_matches = [names[i] for i in top_indices]
	# print(df)

	#taking out 5 rows with largest similarity value
	#df_largest=df.nlargest(k,'similarities')
	#top_entries = (df_largest['Company Name']).tolist()
	# print(top_entries)

	return top_matches #returns list of the k number of similar companies to the user's query


	#functions we need from flask sqlalchemy to replace pandas


def rerank(top_company_names, query):	
	top_companies = db.session.query(Company.Name, Company.Description)\
					.filter(Company.Name.in_(top_company_names))\
					.all()
	#Goes to our ORM table, gets 2 columns Name and Description based on names in top_company_names: List of Company objects

	#column_values = top_df['Company Description'].tolist()
	names = [name for name, _ in top_companies] #Extracting just list of names in top_companies
	descriptions = [desc for _, desc in top_companies] #Extracting just list of descriptions in top_companies

	crossencodings = crossencoder.predict([(query, value) for value in descriptions])
	#Uses crossencoder to find scores of similarity between query and descriptions

	top_indices = heapq.nlargest(
		5, 
		range(len(crossencodings)), 
		key=crossencodings.__getitem__)
	#Using heapq to find largest encoder results

	top_matches = [names[i] for i in top_indices]
	#turns results into names list.

	return top_matches

@app.route("/signin")
def index():
	#newcompany = Company(Name = "test", values = "test", culture = "test", Description = "test", hiring =  "test")
	#newcompan
	#db.session.add(newcompany)
	#db.session.commit()
	return render_template("signin.html")

@app.route("/")
def welcome():
	#newcompany = Company(Name = "test", values = "test", culture = "test", Description = "test", hiring =  "test")
	#newcompan
	#db.session.add(newcompany)
	#db.session.commit()
	return render_template("index.html")

	

@app.route("/company_names", methods=["POST"])
def company_names():
	if request.method == "POST":
		user_query = request.get_json().get('query')
		company_list = getTopCompanies(user_query)
		company_list = rerank(company_list, user_query)
		json = jsonify(company_list)
		response = make_response(json, 200)
		#response.headers.add('Access-Control-Allow-Origin', url)
		return response
	
	
@app.route("/login", methods = ["POST"])
def login():
	name = request.form['name']
	username = request.form['username']
	#data = { 'name': name, 'username': username, 'company_list': ""}
	#newcompany = Company(Name = "test", values = "test", culture = "test", Description = "test", hiring =  "test")
	newuser = User(name = name, username = username, company_list = "")
	db.session.add(newuser)
	db.session.commit()

    # Optionally check for errors here
	#print(response)
	return redirect('/')

#if __name__ == "__main__":
#	current_user = User(1, "Omar Shatat", "No companies so far")
#	db.session.add(current_user)
#	db.session.commit()
if __name__ == '__main__':
    print("Intitializing Tables...")
    with app.app_context():
        db.create_all()  # Initialize tables
        print("Tables initialized correctly.")
    app.run(debug=True)

