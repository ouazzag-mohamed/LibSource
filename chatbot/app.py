from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import PyPDF2
import requests
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app)  


UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
def bot_response(user):
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel("gemini-1.5-pro")
    response = model.generate_content(user)
    return response.text

def summarize_pdf(file_path):
    
    
    genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
    model = genai.GenerativeModel("gemini-1.5-pro")
    sample_pdf = genai.upload_file(file_path)
    response = model.generate_content(["Expliquez-moi en détail ce cours.", sample_pdf])
    sample_pdf.delete()
    return response.text
@app.route('/response',methods=['POST'])
def getresponse():
    
    user=request.json
    message=user.values()
    response_bot=bot_response(message)
    return jsonify({"response_bot": response_bot})
    
    

@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    
    summary = summarize_pdf(file_path)
    os.remove(file_path)
    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True)