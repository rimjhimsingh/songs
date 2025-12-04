import json
import os

def load_raw_json(path):
    with open(path, "r", encoding="utf8") as f:
        return json.load(f)

def normalize(data):
     # get all attribute names like id, title, danceability, energy etc, will return the list of avai
     
    attributes = list(data.keys())
    
    # find how many rows exist (all attributes have same number of entries)
    first_attr = attributes[0]
    row_count = len(data[first_attr]) # how many rows are there per attribute
    
    normalized_rows = [] 
    #now loop through the rows
    
    for i in range(row_count): #loop from 0 to row_count (100)
        row = {}
        
        for attr in attributes: #loop through list of attributes
            
            index_key = str(i) #convert the int i to string for indexing in the json
            row[attr] = data[attr].get(index_key)
            
        normalized_rows.append(row) #once inner loop is done for each iteration, the one row will have all attributes of a song, add to the list normalized rows
        
    return normalized_rows


if __name__ == "__main__":
    json_path = "../data/playlist.json"        # simple relative path

    raw_data = load_raw_json(json_path)        # load the file
    normalized = normalize(raw_data)           # normalize it

    print("Total rows:", len(normalized))
    print("First row:", normalized[0])
   # print("All data:", normalized)