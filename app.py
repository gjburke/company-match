from flask import Flask, render_template, request, jsonify, make_response

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/name", methods=["GET"])
def name():
    return make_response(jsonify("Company Match"), 200)