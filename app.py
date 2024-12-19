
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Your Spoonacular API Key
# API_KEY = 'c7fdf8daa93d4c17aa2d4f645a23d59a'
API_KEY = '484e6eebb1e64fff9aef85c360ca6482'
# API route to search for recipes based on ingredients and cuisine
@app.route('/search_recipes', methods=['POST'])
def search_recipes():
    data = request.json
    ingredients = data.get('ingredients', [])
    cuisine = data.get('cuisine', '')

    if not ingredients:
        return jsonify({'error': 'No ingredients provided'}), 400

    # Format the ingredients into a comma-separated string for the API
    ingredient_string = ','.join(ingredients)

    # Build the Spoonacular API URL
    api_url = f"https://api.spoonacular.com/recipes/findByIngredients?ingredients={ingredient_string}&apiKey={API_KEY}"
    
    # Call Spoonacular API
    response = requests.get(api_url)
    if response.status_code == 200:
        recipes = response.json()
        result = []

        for recipe in recipes:
            recipe_id = recipe['id']
            details_url = f"https://api.spoonacular.com/recipes/{recipe_id}/information?apiKey={API_KEY}"
            details_response = requests.get(details_url)
            #JUST ADDED
            youtube_search_link = f"https://www.youtube.com/results?search_query={recipe['title'].replace(' ', '+')}+recipe"
            if details_response.status_code == 200:
                details = details_response.json()
                video_link = details.get('sourceUrl', '')  # Spoonacular doesn't always provide a dedicated video URL

                result.append({
                    'name': recipe['title'],
                    'image': recipe.get('image', ''),
                    'usedIngredients': [ingredient['name'] for ingredient in recipe['usedIngredients']],
                    'missedIngredients': [ingredient['name'] for ingredient in recipe['missedIngredients']],
                    'videoSearchLink': youtube_search_link
                    # 'videoLink': video_link  # Adding the video link
                })
        return jsonify(result), 200
    else:
        return jsonify({'error': 'Error fetching recipes from Spoonacular'}), 500

if __name__ == '__main__':
    app.run(debug=True)