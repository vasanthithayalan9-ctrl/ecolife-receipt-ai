# Deployment Guide

## Backend (Render)
1. Create a new Render Web Service from this repository.
2. Select the `backend` directory as the root or use the provided `render.yaml`.
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables: `PORT`, `CLIENT_URL`, `GEMINI_API_KEY`, `OPENAI_API_KEY`, `OCR_API_KEY`.

## Frontend (Vercel)
1. Import the repository into Vercel.
2. Set the root directory to `client`.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com`

## Health checks
- Backend health: `/api/health`
- Frontend: `/`
