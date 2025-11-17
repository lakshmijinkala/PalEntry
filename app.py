# -*- coding: utf-8 -*-
from flask import Flask, render_template, request, jsonify
import json
import os
import logging


from google import generativeai as genai  # Gemini API

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

RECIPES_FILE = "recipes.json"

# Ensure the recipes file exists (write as UTF-8)
if not os.path.exists(RECIPES_FILE):
    with open(RECIPES_FILE, "w", encoding="utf-8") as f:
        json.dump([], f, ensure_ascii=False)

# ------------------------
# Gemini Setup
# ------------------------
# idc about security!!
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

# Chatbot API - generate recipes
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "")

    prompt = (
        "You are a cooking assistant. Do not recommend cookies. "
        "Respond ONLY with valid JSON in this format: "
        '{ "title": "Recipe Title", "ingredients": ["ingredient1", "ingredient2"], "steps": ["step1", "step2"] }. '
        f"User message: {message}"
    )

    try:
        ai_response = model.generate_content(prompt)
        raw_text = ai_response.text.strip()
        app.logger.info("Gemini raw response (len=%d)", len(raw_text))
    except Exception as e:
        app.logger.exception("Error calling Gemini API")
        # Return a useful error to the client; client can handle it
        return jsonify({"error": "model_call_failed", "detail": str(e)}), 500

    
    parsed = None
    try:
        parsed = json.loads(raw_text)
    except Exception:
        parsed = None

    return jsonify({"raw": raw_text, "recipe": parsed})

# Save recipe
@app.route("/add_recipe", methods=["POST"])
def add_recipe():
    data = request.get_json(silent=True) or {}
    recipe = data.get("recipe")
    if not recipe:
        return jsonify({"status": "error", "message": "no_recipe_provided"}), 400

    try:
        with open(RECIPES_FILE, "r", encoding="utf-8") as f:
            recipes = json.load(f)
    except Exception as e:
        app.logger.warning("Error loading recipes, starting fresh: %s", e)
        recipes = []

    # prevent duplicates 
    if recipe not in recipes:
        recipes.append(recipe)

    try:
        with open(RECIPES_FILE, "w", encoding="utf-8") as f:
            json.dump(recipes, f, indent=2, ensure_ascii=False)
    except Exception as e:
        app.logger.exception("Error saving recipes")
        return jsonify({"status": "error", "message": "save_failed"}), 500

    return jsonify({"status": "saved"})

# Get cookbook list
@app.route("/cookbook", methods=["GET"])
def cookbook():
    try:
        with open(RECIPES_FILE, "r", encoding="utf-8") as f:
            recipes = json.load(f)
    except Exception as e:
        app.logger.warning("Error reading cookbook: %s", e)
        recipes = []
    return jsonify({"recipes": recipes})

# Run app
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
