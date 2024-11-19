import os
from PyPDF2 import PdfReader
import google.generativeai as genai

def extract_text_from_pdf(file_path):
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            if page.extract_text():  
                text += page.extract_text()
            else:
                text += "\n[Contenu non lisible sur cette page]\n"
        return text
    except Exception as e:
        print(f"Erreur lors de l'extraction du texte : {e}")
        return ""

def split_text(text, chunk_size=4000):
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

def configure_generative_ai(api_key):
    genai.configure(api_key=api_key)

def process_text_with_gemini(chunk, model="gemini-1.5-flash"):
    try:
        prompt_template = """
        Voici le contenu d'un document PDF. Analyse-le et donne un résumé clair et structuré. 
        Si possible, identifie les points clés et conclusifs.
        Texte :
        {}
        """
        prompt = prompt_template.format(chunk)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Erreur lors de la génération de contenu : {e}")
        return "Erreur dans l'analyse de ce segment."

def main():
    pdf_path = r'C:\Users\jook\Documents\1711990300140_ch2_algebreboole.pdf'
    if not os.path.exists(pdf_path):
        print("Fichier PDF non trouvé. Veuillez vérifier le chemin.")
        return
    pdf_text = extract_text_from_pdf(pdf_path)
    if not pdf_text:
        print("Aucun texte extrait du PDF.")
        return
    chunks = split_text(pdf_text)
    api_key = "AIzaSyDdkX66aFVl2e2bxYn_YNW3KiZg7cjnr4U"
    configure_generative_ai(api_key)

    for i, chunk in enumerate(chunks):
        print(f"--- Résumé du segment {i + 1} ---")
        summary = process_text_with_gemini(chunk)
        print(summary)
        print("\n")

if __name__ == "__main__":
    main()
