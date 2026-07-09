import json
import os
import urllib.request
import urllib.error
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()


class TTSRequest(BaseModel):
    text: str
    language: str


class TTSResponse(BaseModel):
    audioUrl: str


@router.post("/tts", response_model=TTSResponse)
async def generate_tts(request: TTSRequest) -> dict[str, str]:
    api_key = os.getenv('GEMINI_API_KEY')

    if not api_key:
        raise HTTPException(status_code=503, detail='Missing Gemini API key')

    if request.language not in ('en', 'ta'):
        raise HTTPException(status_code=400, detail='Unsupported language')

    language_code = 'ta-IN' if request.language == 'ta' else 'en-US'
    endpoint = f'https://texttospeech.googleapis.com/v1/text:synthesize?key={api_key}'
    payload = {
        'input': {'text': request.text},
        'voice': {'languageCode': language_code, 'ssmlGender': 'NEUTRAL'},
        'audioConfig': {'audioEncoding': 'MP3'}
    }
    body = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(endpoint, data=body, method='POST')
    req.add_header('Content-Type', 'application/json')

    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            result = json.loads(response.read().decode('utf-8'))
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode('utf-8', errors='ignore')
        raise HTTPException(status_code=502, detail=f'Cloud TTS request failed: {error_body}')
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f'Cloud TTS request error: {exc}')

    audio_content = result.get('audioContent')
    if not audio_content:
        raise HTTPException(status_code=502, detail='Cloud TTS did not return audio content')

    return {'audioUrl': f'data:audio/mpeg;base64,{audio_content}'}
