from flask import Flask, render_template, request, jsonify, make_response
from sentence_transformers import SentenceTransformer, CrossEncoder
import pandas as pd
import numpy as np

app = Flask(__name__)
url = 'http://127.0.0.1:5000'

transformer = SentenceTransformer("all-MiniLM-L6-v2")

def getTopCompanies(user_query):
	k = 10

	df = pd.read_csv('./curr_data.csv')
	print(user_query)
	print(df)
	# similarities between the query and 'Company Description' columns - converted in the form of a list
	user_encoding = transformer.encode(user_query)
	company_encoding = transformer.encode(df['Company Description'].tolist())
	similarities=transformer.similarity(user_encoding, company_encoding)
	print(similarities)

	#adding similarities column to dataframe
	df['similarities']=similarities[0]
	print(df)

	#taking out 5 rows with largest similarity value
	df_largest=df.nlargest(k,'similarities')

	top_entries = (df_largest['Company Name']).tolist()
	print(top_entries)

	return top_entries

@app.route("/")
def index():
	return render_template("index.html")

@app.route("/company_names", methods=["POST"])
def company_names():
	if request.method == "POST":
		user_query = request.get_json().get('query')
		company_list = getTopCompanies(user_query)
		json = jsonify(company_list)
		response = make_response(json, 200)
		response.headers.add('Access-Control-Allow-Origin', url)
		return response