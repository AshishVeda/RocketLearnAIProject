# backend/test_client.py
import socketio
import base64

# Connect to the Flask backend
sio = socketio.Client()


@sio.event
def connect():
    print("Connected to server")
    send_audio()


@sio.event
def disconnect():
    print("Disconnected from server")


@sio.on("bot_response")
def handle_response(data):
    print("Bot:", data)


def send_audio():
    with open("audio_test.wav", "rb") as f:
        encoded = base64.b64encode(f.read()).decode("utf-8")
        sio.emit("audio_chunk", {"audio": encoded})


sio.connect("http://127.0.0.1:5000")
sio.wait()
