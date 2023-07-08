import json

# Load your JSON data
with open("cleaned_file2.json", "r") as file:
    data = json.load(file)

# Print out the items that do not have a 'data' key
for item in data:
    if "data" not in item:
        print(item)
        
responses = [sentence for item in data for sentence in item.get("data", [])]

print(responses)
