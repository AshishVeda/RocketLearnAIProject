# backend/app.py
from flask import Flask, request
from flask_socketio import SocketIO, emit
import openai
import base64
from transcribe import transcribe_audio
from flask_cors import CORS

app = Flask(__name__)
# 👈 explicitly allow frontend origin
CORS(app, origins=["http://localhost:3000"])

# 👈 allow CORS on WebSocket too
socketio = SocketIO(app, cors_allowed_origins="*")


openai.api_key = ""


@socketio.on('connect')
def on_connect():
    print("Client connected")


@socketio.on('disconnect')
def on_disconnect():
    print("Client disconnected")


@socketio.on('audio_chunk')
def handle_audio_chunk(data):
    print("🎧 Received audio chunk")
    audio_bytes = base64.b64decode(data["audio"])
    transcript = transcribe_audio(audio_bytes)

    if transcript:
        print("Transcribed:", transcript)
        if not transcript:
            emit("bot_response", "Sorry, I couldn't understand that.")
            return

        # 👇 Immediately emit user message
        print("📤 Emitting transcript:", transcript)
        emit("transcript", transcript)
        # Send to OpenAI for response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                            "content": (
                                "You are a travel assistant specializing only in Indian tourism. "
                                "If the user's message is not about traveling in India, cultural sites, food, places to visit, "
                                "transportation, or tourism activities in India, simply respond: "
                                "\"I can not reply to this question\"."
                            )
                },
                {"role": "user", "content": transcript}
            ]
            # messages=[{"role": "user", "content": transcript}]
        )
        text = response['choices'][0]['message']['content']
        print("[Bot Reply]:", text)
        emit("bot_response", text)


@socketio.on('text_message')
def handle_text_message(data):
    user_text = data.get("text", "")
    print("[Text Msg] Received:", user_text)

    try:
        if user_text:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": (
                                "You are a travel assistant specializing only in Indian tourism. "
                                "If the user's message is not about traveling in India, cultural sites, food, places to visit, "
                                "transportation, or tourism activities in India, simply respond: "
                                "\"I can not reply to this question\"."
                        )
                    },
                    {"role": "user", "content": user_text}
                ]
            )
            bot_reply = response['choices'][0]['message']['content']
            print("[Bot Reply]:", bot_reply)
            emit("bot_response", bot_reply)
    except Exception as e:
        print("[Error]:", e)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5001, debug=True)
