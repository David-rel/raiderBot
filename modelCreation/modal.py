import json

with open("test.json", "r") as file:
    data = json.load(file)

# Write the data to a .txt file
with open("output.txt", "w") as file:
    for entry in data:
        file.write(entry["data"][0] + "\n\n")


