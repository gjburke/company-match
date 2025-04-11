from flask import Flask, render_template, request, jsonify, make_response
from sentence_transformers import SentenceTransformer, CrossEncoder
import pandas as pd
import numpy as np
import os 
from sqlalchemy import create_engine, text,  MetaData, Table, Column, Integer, String
from supabase import create_client, Client


#connecting to SQL Alchemy
supabase_Url = "postgresql://postgres:BananaMatchers2467!@db.vfyncineneuwxxzlqvor.supabase.co:5432/postgres"
engine = create_engine(supabase_Url, echo=True) #echo=True -> debugging tool: prints out all the raw SQL statements that SQLAlchemy executes under the hood

app = Flask(__name__)
url = 'http://127.0.0.1:5000'

#setup for fetching company data using Supabase and querying through SQL Alchemy 
def fetch_company_data(): 
	query = text('SELECT * FROM "Descriptions";')
	df = pd.read_sql(query, engine)
	return df

metaData = MetaData() #using Metadata let FlaskAPI know how our table is structured -> "blueprint" of our Supabase

Descriptions = Table(
	"Descriptions", metaData, 
	Column("Name", String, primary_key= True), #every row must have unique Name, and SQL Alchemy will use it as main identifier
	Column("Values", String),
	Column("Culture", String),
	Column("Description", String),
	Column("Hiring", String)
)

transformer = SentenceTransformer("all-MiniLM-L6-v2")
crossencoder = CrossEncoder("cross-encoder/stsb-distilroberta-base")

def getTopCompanies(user_query):
	k = 10
	df = fetch_company_data()
	print(df)
	# print(user_query)
	# print(df)
	# similarities between the query and 'Company Description' columns - converted in the form of a list
	user_encoding = transformer.encode(user_query)
	company_encoding = transformer.encode(df['Description'].tolist())
	similarities=transformer.similarity(user_encoding, company_encoding)
	# print(similarities)

	# adding similarities column to dataframe
	df['similarities']=similarities[0]
	# print(df)

	#taking out 5 rows with largest similarity value
	df_largest=df.nlargest(k,'similarities')

	top_entries = (df_largest['Name']).tolist()
	# print(top_entries)

	return top_entries

def rerank(top_company_names, query):
	df = fetch_company_data()
	top_df = df[df['Name'].isin(top_company_names)]
	print(top_df)
	column_values = top_df['Description'].tolist()

	crossencodecol = "CERanks"
	top_df[crossencodecol] = crossencoder.predict([(query, value) for value in column_values])

	n = len(top_company_names)

	reranked_top_companies = top_df.nlargest(n, crossencodecol)
	top_company_names = reranked_top_companies['Name'].tolist()

	return top_company_names

@app.route("/company_names", methods=["POST"])
def company_names():
	if request.method == "POST":
		user_query = request.get_json().get('query')
		company_list = getTopCompanies(user_query)
		company_list = rerank(company_list, user_query)
		json = jsonify(company_list)
		response = make_response(json, 200)
		response.headers.add('Access-Control-Allow-Origin', url)
		return response

