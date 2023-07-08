import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load your JSON data
with open("cleaned_file2.json", "r") as file:
    data = json.load(file)

# Combine all sentences into one list of responses
responses = [sentence for item in data for sentence in item.get("data", [])]

# Fit and transform responses using TF-IDF
vectorizer = TfidfVectorizer().fit_transform(responses)

def get_response(user_input):
    # Vectorize the user's input
    query_vec = vectorizer.transform([user_input])
    
    # Compute cosine similarity between user's input and all responses
    cosine_sim = cosine_similarity(query_vec, vectorizer).flatten()
    
    # Find the index of the most similar response
    index = cosine_sim.argsort()[-1]
    
    # Return the most similar response
    return responses[index]

# Test the function with some user input
user_input = "What is the mission?"
print(get_response(user_input))
