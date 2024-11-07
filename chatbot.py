import openai


openai.api_key = "API_KEY"

def chat_with_gpt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", 
        messages=[
            {"role": "system", "content": "You are a helpful chatbot."},
            {"role": "user", "content": prompt}
        ]
    )
    return response['choices'][0]['message']['content']

def main():
    print("Bot: Hello! How can I assist you today?")
    while True:
        user_input = input("You: ")
        if user_input.lower() in {"exit", "quit", "bye"}:
            print("Bot: Goodbye!")
            break
        response = chat_with_gpt(user_input)
        print(f"Bot: {response}")

if __name__ == "__main__":
    main()
