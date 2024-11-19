from flask import Flask, request, jsonify
import os
import chatbot

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'pdf-file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['pdf-file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        
        import google.generativeai as genai

        genai.configure(api_key="AIzaSyDdkX66aFVl2e2bxYn_YNW3KiZg7cjnr4U")
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content("Explain how AI works")
        extracted_text = "Placeholder: PDF processing with Gemini API would go here."
        # --- END GEMINI API INTEGRATION ---
        return jsonify({'message': 'File uploaded successfully', 'extracted_text': extracted_text}), 200
    return jsonify({'error': 'File upload failed'}), 500


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    import google.generativeai as genai

    genai.configure(api_key="AIzaSyDdkX66aFVl2e2bxYn_YNW3KiZg7cjnr4U")
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("Explain how AI works")


    return jsonify({'response': response.text}), 200


if __name__ == '__main__':
    app.run(debug=True)