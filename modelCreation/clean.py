import pprint
import json
import re
from nltk import sent_tokenize
import nltk
from nltk.corpus import stopwords

nltk.download('punkt')
nltk.download('stopwords')

stop_words = set(stopwords.words('english'))

with open('output.json', 'r') as file:
    data = json.load(file)

for item in data:
    if "link" in item:
        del item["link"]
        
for item in data:
    if "summary" in item:
        del item["summary"]

for item in data:
    if "data" in item:
        item["data"] = re.sub(r'\W+', ' ', item["data"].lower())
        item["data"] = re.sub(r'\b(?:{})\b'.format('|'.join(stop_words)), '', item["data"]) # Remove stopwords
        item["data"] = re.sub(r'\s+', ' ', item["data"]) # Remove excessive whitespace

for item in data:
    if "data" in item:
        if not item["data"]:
            item["data"] = "default"

for item in data:
    if "data" in item:
        item["data"] = sent_tokenize(item["data"])

with open('cleaned_file2.json', 'w') as f:
    json.dump(data, f, indent=4, sort_keys=True)
