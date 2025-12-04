from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import json
import os

# import your normalization function
from src.normalize import load_raw_json, normalize

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# load and normalize at startup
base_path = os.path.dirname(__file__)
json_path = os.path.join(base_path, "data", "playlist.json")

raw_data = load_raw_json(json_path)
normalized_data = normalize(raw_data)   # this is a list of 100 rows


# # 1.2.1 GET all songs
# @app.route("/songs", methods=["GET"])
# def get_all_songs():
#     return jsonify(normalized_data)

@app.route("/songs", methods=["GET"])
def get_all_songs():
    all_flag = request.args.get("all")

    # if ?all=true → return 100 rows without pagination
    if all_flag == "true":
        return jsonify(normalized_data)

    # read page and size query parameters
    page = request.args.get("page", default=1, type=int)
    size = request.args.get("size", default=10, type=int)

    # calculate start and end index
    start = (page - 1) * size
    end = start + size
    
    # Calculate Total Pages
    total_items = len(normalized_data)
    total_pages = math.ceil(total_items / size)

    # slice the list
    page_data = normalized_data[start:end]

    # response includes metadata
    response = {
        "page": page,
        "size": size,
        "total": total_items, # Renamed to total_items for clarity
        "total_pages": total_pages, # <--- ADDED FIELD
        "songs": page_data
    }

    return jsonify(response)


# 1.2.2 GET song by title
@app.route("/songs/title", methods=["GET"])
def get_song_by_title():
    user_title = request.args.get("title")  # read title from query
    
    if not user_title:
        return jsonify({"error": "title query parameter is required"}), 400
    
    # find match (case-insensitive)
    for song in normalized_data:
        if song["title"].lower() == user_title.lower():
            return jsonify(song)
    
    return jsonify({"error": "Song not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
