from flask import Flask, render_template, request, jsonify, make_response
from sentence_transformers import SentenceTransformer, CrossEncoder
import pandas as pd
import numpy as np

app = Flask(__name__)
url = 'http://127.0.0.1:5000'

data = pd.read_csv('./curr_data.csv')
transformer = SentenceTransformer("all-MiniLM-L6-v2")
crossencoder = CrossEncoder("cross-encoder/stsb-distilroberta-base")

def getTopCompanies(user_query):
	k = 10
	df = data
	print(df)
	# print(user_query)
	# print(df)
	# similarities between the query and 'Company Description' columns - converted in the form of a list
	user_encoding = transformer.encode(user_query)
	company_encoding = transformer.encode(df['Company Description'].tolist())
	similarities=transformer.similarity(user_encoding, company_encoding)
	# print(similarities)

	# adding similarities column to dataframe
	df['similarities']=similarities[0]
	# print(df)

	#taking out 5 rows with largest similarity value
	df_largest=df.nlargest(k,'similarities')

	top_entries = (df_largest['Company Name']).tolist()
	# print(top_entries)

	return top_entries

def rerank(top_company_names, query):
	top_df = data[data['Company Name'].isin(top_company_names)]
	print(top_df)
	column_values = top_df['Company Description'].tolist()

	crossencodecol = "CERanks"
	top_df[crossencodecol] = crossencoder.predict([(query, value) for value in column_values])

	n = len(top_company_names)

	reranked_top_companies = top_df.nlargest(n, crossencodecol)
	top_comapny_names = reranked_top_companies['Company Name'].tolist()

	return top_comapny_names

@app.route("/")
def index():
	return render_template("index.html")

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