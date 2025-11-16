from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch
import json





# -------------------------
# Flask Setup
# -------------------------
app = Flask(__name__)
CORS(app)

with open("healthinfo.json") as f:
    health_info = json.load(f)

health_knowledge = "\n".join(health_info)
# -------------------------
# Load GPT-Neo 125M (CPU-friendly)
# -------------------------
model_name = "EleutherAI/gpt-neo-125M"
device = -1  # CPU

print("Loading GPT-Neo 125M model... This may take a moment.")
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

generator = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    device=device,
)

print("Model loaded!")

# -------------------------
# Serve Chat Page
# -------------------------
@app.route("/")
def index():
    return """
    <html>
    <head><title>GPT-Neo 125M Chatbot</title></head>
    <body>
        <h2>GPT-Neo 125M Chatbot</h2>
        <input id="question" placeholder="Ask something..." style="width:400px;">
        <button onclick="sendQuestion()">Send</button>
        <div id="answer" style="margin-top:20px; white-space: pre-wrap;"></div>

        <script>
        async function sendQuestion() {
            const question = document.getElementById("question").value;
            if (!question) return;
            document.getElementById("answer").innerText = "Thinking...";
            const res = await fetch("/ask", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({question})
            });
            const data = await res.json();
            if (data.answer) {
                document.getElementById("answer").innerText = data.answer;
            } else if (data.error) {
                document.getElementById("answer").innerText = "Error: " + data.error;
            }
        }
        </script>
    </body>
    </html>
    """

# -------------------------
# Chatbot Endpoint
# -------------------------
@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question", "")
    if not question:
        return jsonify({"error": "No question provided"}), 400

    try:
        
        prompt = "You are a knowledgeable, safe, and helpful health advisor. Use only the information below to answer questions.You must use your own words. Be kind.You drink liquids and eat solids.Give only answers, do not give questions.Answer the given question without mentioning diabeters or your role.When they ask what should they eat today, give them a healthy meal."
        results = generator(
            prompt,
            max_length = 100,
            do_sample=True,
            temperature=0.6,
            top_p=0.90,
            repetition_penalty=3.0,
            num_return_sequences=1
        )
        answer = results[0]["generated_text"].split("AI:")[-1].strip()
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -------------------------
# Run Server
# -------------------------
if __name__ == "__main__":
    app.run(debug=True)