from flask import Flask, render_template, request, jsonify, make_response

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/company_names", methods=["GET"])
def company_names():
	# doing most of the work with huggingface models
	company_list = ["Meta", "Nvidia", "Microsoft", "IBM", "Google", "Amazon", "Tencent", "SpaceX", "PrairieLearn", "Apple"]
	json = jsonify(company_list)
	return make_response(json, 200)

if(__name__ == "__main__"):
      app.run()