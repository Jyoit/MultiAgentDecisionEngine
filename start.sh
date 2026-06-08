#!/bin/bash
# AI Business Decision War Room — One-command startup
set -e

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║   AI Business Decision War Room  v1.0.0          ║"
echo "║   LangGraph + Groq + React                       ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# Check .env
if [ ! -f ".env" ]; then
  echo "⚠️  .env not found — copying from .env.example"
  cp .env.example .env
  echo "→ Edit .env with your GROQ_API_KEY and TAVILY_API_KEY, then re-run."
  exit 1
fi

# Backend setup
echo "📦 Setting up Python backend..."
python3 -m pip install -r requirements.txt -q

# TextBlob corpora
echo "📚 Downloading TextBlob corpora..."
python3 -c "import textblob; textblob.download_corpora()" 2>/dev/null || true

# Frontend setup
echo "🎨 Installing frontend dependencies..."
cd frontend && npm install --silent && cd ..

# Launch
echo ""
echo "🚀 Starting servers..."
echo "   Backend  → http://localhost:8000"
echo "   Frontend → http://localhost:3000"
echo "   API Docs → http://localhost:8000/docs"
echo ""

# Start backend
python3 -m uvicorn backend.main:app --reload --port 8000 &
BACKEND_PID=$!

# Wait for backend
sleep 3

# Start frontend
cd frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ War Room is running! Open http://localhost:3000"
echo "   Press Ctrl+C to stop both servers."
echo ""

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait
