from flask import Flask, request
from helpers import construct_query

app = Flask(__name__)

# Send query API Route
@app.route("/send-query", methods=["POST"])
def members():
    data = request.json
    print(data)
    query = construct_query(data)
    print(query)
    # If a DB existed the query would be sent to the DB here and the response would be returned
    return {}


if __name__ == "__main__":
    app.run(debug=True)
