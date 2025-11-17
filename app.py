# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, jsonify
import json
import os
from google import generativeai as genai  # Gemini API

app = Flask(__name__)

RECIPES_FILE = "recipes.json"

# Ensure the recipes file exists
if not os.path.exists(RECIPES_FILE):
    with open(RECIPES_FILE, "w") as f:
        json.dump([], f)

# ------------------------
# Gemini Setup
# ------------------------
genai.configure(api_key="AIzaSyCdKTE02nzaeoOR65fGsZhT2BPElKpuimo")
model = genai.GenerativeModel("gemini-2.0-flash")

# ------------------------
# Routes
# ------------------------

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/cookbook_page")
def cookbook_page():
    return render_template("cookbook.html")

# Chatbot API - dynamically generate recipes
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    prompt = (
        "You are a cooking assistant. "
        "Respond in JSON format with exactly: "
        "{ title, ingredients[], steps[] }. "
        f"User message: {message}"
    )

    # Call Gemini AI
    ai_response = model.generate_content(prompt)

    try:
        # Attempt to parse the AI response as JSON
        recipe = json.loads(ai_response.text)
    except Exception as e:
        # If parsing fails, return a fallback dummy recipe
        print("JSON parsing failed:", e)
        recipe = {
            "title": "Chocolate Chip Cookies",
            "ingredients": ["1 cup sugar", "2 cups flour", "1 cup chocolate chips"],
            "steps": ["Preheat oven to 350 F", "Mix ingredients", "Bake 12 minutes"]
        }

    return jsonify({"response": recipe})

# Save recipe
@app.route("/add_recipe", methods=["POST"])
def add_recipe():
    data = request.get_json()
    recipe = data.get("recipe")

    with open(RECIPES_FILE, "r") as f:
        recipes = json.load(f)

    if recipe not in recipes:
        recipes.append(recipe)

    with open(RECIPES_FILE, "w") as f:
        json.dump(recipes, f, indent=2)

    return jsonify({"status": "saved"})

# Get cookbook list
@app.route("/cookbook", methods=["GET"])
def cookbook():
    with open(RECIPES_FILE, "r") as f:
        recipes = json.load(f)
    return jsonify({"recipes": recipes})

# ------------------------
# Run app
# ------------------------
if __name__ == "__main__":
    app.run(debug=True)
