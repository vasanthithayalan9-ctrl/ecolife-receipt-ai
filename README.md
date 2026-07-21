# EcoLife Receipt AI

A production-ready green commerce experience built with a Vite + React frontend and a FastAPI backend for receipt analysis, carbon scoring, health insights, recommendations, and reporting.

## Structure
- client/: Vite + React + Tailwind frontend
- backend/: FastAPI backend with OCR, analysis, voice, and reporting routes
- render.yaml: Render deployment manifest
- vercel.json: Vercel deployment manifest

## Run locally
1. Install dependencies: npm install
2. Start the stack: npm run dev
3. Open the frontend at http://localhost:5173
4. Backend health check: http://localhost:5000/api/health

## Production deployment
- Frontend: Vercel with Vite build output `dist`
- Backend: Render with `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Configure environment variables from the `.env.example` files in the frontend/backend directories