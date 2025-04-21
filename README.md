# AI-Powered Voice Chat Travel Assistant

This is a real-time voice-based chatbot application that lets users speak directly with an AI travel assistant focused on **Indian tourism**. The assistant listens to your voice, transcribes your question, responds with travel recommendations, and maintains conversational memory within a session.

---

## ✨ Features

- 🎤 Real-time voice input using the Web Audio API
- 📝 Transcription powered by OpenAI Whisper
- 💬 ChatGPT-based conversational responses
- 🧠 Memory-aware session with full itinerary recall
- 🌏 Focused on Indian travel destinations
- ⚡ Responsive UI built with React + TypeScript
- 🔄 Flask backend with WebSocket support via `flask-socketio`

---

## 📂 Project Structure

```
RocketLearn_AI_Project/
├── Backend/                   # Flask + SocketIO backend
│   ├── app.py
│   ├── transcribe.py
│   └── ...
├── Frontend/
│   └── frontend/              # React + TypeScript frontend
│       ├── src/
│       ├── public/
│       └── package.json
├── README.md
└── requirements.txt
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/RocketLearn_AI_Project.git
cd RocketLearn_AI_Project
```

---

### 2. Backend Setup (Flask + Whisper)

```bash
cd Backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Make sure you have an `.env` file with your OpenAI API key:

```env
OPENAI_API_KEY=your-openai-api-key
```

Run the Flask server:

```bash
python app.py
```

---

### 3. Frontend Setup (React + TypeScript)

```bash
cd ../Frontend/frontend
npm install
npm start
```

Frontend will run on [http://localhost:3000](http://localhost:3000)  
Backend should run on [http://127.0.0.1:5001](http://127.0.0.1:5001)

---

## 🧠 Tech Stack

| Tech           | Purpose                      |
| -------------- | ---------------------------- |
| React (TS)     | Frontend interface           |
| Flask          | Backend server               |
| Socket.IO      | Real-time communication      |
| OpenAI GPT     | Travel assistant responses   |
| OpenAI Whisper | Audio transcription          |
| Web Audio API  | Microphone access in browser |

---

## 🗺️ Example Use Cases

- "Plan a 5-day itinerary in Jaipur."
- "What are the top places to visit in Kerala?"
- "Remove Day 3 from my Varanasi plan."
- "Tell me what you suggested for Tirupati earlier."
