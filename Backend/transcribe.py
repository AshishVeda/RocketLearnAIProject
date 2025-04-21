# backend/transcribe.py
import openai
import io


# def transcribe_audio(audio_bytes):
#     try:
#         # Wrap bytes in a BytesIO object and assign a name
#         audio_file = io.BytesIO(audio_bytes)
#         audio_file.name = "audio.wav"  # Required by OpenAI for format inference

#         response = openai.Audio.transcribe(
#             model="whisper-1",
#             file=audio_file
#         )
#         return response.get("text", "")
#     except Exception as e:
#         print(f"Transcription error: {e}")
#         return ""

def transcribe_audio(audio_bytes):
    try:
        audio_file = io.BytesIO(audio_bytes)
        audio_file.name = "audio.webm"  # 👈 match actual format

        # with open("debug_audio.webm", "wb") as f:
        #     f.write(audio_bytes)

        response = openai.Audio.transcribe(
            model="whisper-1",
            file=audio_file
        )
        return response.get("text", "")
    except Exception as e:
        print("❌ Transcription error:", e)
        return ""
