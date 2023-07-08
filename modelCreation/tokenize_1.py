import json
import nltk
from nltk.tokenize import word_tokenize

nltk.download('punkt')

def tokenize_text(text):
    return word_tokenize(text)

with open('cleaned_file2.json', 'r') as file:
    data = json.load(file)

for item in data:
    if "data" in item:
        for i, sent in enumerate(item["data"]):
            item["data"][i] = tokenize_text(sent)

with open('preprocessed_file.json', 'w') as f:
    json.dump(data, f, indent=4, sort_keys=True)
