import json
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk import pos_tag

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

def generate_qa_pairs(text):
    qa_pairs = []
    if isinstance(text, str):  # check if the text is a string
        sentences = sent_tokenize(text)
        for sentence in sentences:
            tokens = word_tokenize(sentence)
            tagged = pos_tag(tokens)
            for i, (word, tag) in enumerate(tagged):
                if tag.startswith('NN'):  # Replace the first noun we find.
                    question = " ".join([tokens[j] if j != i else '_____' for j in range(len(tokens))])
                    answer = word
                    qa_pairs.append((question, answer))
                    break  # We only create one question per sentence in this example.
    return qa_pairs

with open('cleaned_file2.json', 'r') as file:
    data = json.load(file)

qa_data = []
for item in data:
    if "data" in item:
        for sent in item["data"]:
            qa_pairs = generate_qa_pairs(sent)
            for question, answer in qa_pairs:
                qa_data.append({"context": sent, "question": question, "answer": answer})

with open('qa_file.json', 'w') as f:
    json.dump(qa_data, f, indent=4, sort_keys=True)
