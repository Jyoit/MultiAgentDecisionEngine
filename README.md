# 🚀 ExecutiveAI: Multi-Agent Business Decision War Room

> **Agents for Business Capstone Project**

ExecutiveAI is a multi-agent AI decision intelligence platform that helps founders, e-commerce businesses, product teams, and operations teams make strategic business decisions using specialized AI agents, real-time market intelligence, structured business data, and customer sentiment analysis.

## Track

**Agents for Business**

## Problem Statement

Businesses often need to answer questions such as:

- Should we launch a new product?
- Should we run a flash sale?
- Should we hire more employees?
- Which strategy maximizes revenue while minimizing risk?

ExecutiveAI orchestrates multiple AI agents to analyze market conditions, internal business data, customer sentiment, and strategic alternatives before recommending the best decision.

## Target Users

- Startup Founders
- E-commerce Owners
- Product Teams
- Growth Teams
- Operations Teams
- Business Analysts

## Features

- Multi-Agent AI Workflow
- Real-Time Market Research
- Customer Sentiment Analysis
- Business Risk Assessment
- Strategy Generation
- Executive Decision Reports
- Live Workflow Trace
- Decision History
- CSV Dataset Upload
- KPI Dashboard

## Architecture

```text
                    User Query
                         │
                         ▼
              Coordinator / LangGraph
                         │
      ┌──────────────────┼──────────────────┐
      ▼                  ▼                  ▼
 Market Agent      Risk Agent      Customer Agent
      │                  │                  │
 Tavily Search      CSV Analytics     Sentiment Analysis
      └──────────────┬──────────────────────┘
                     ▼
              Strategy Agent
                     ▼
              Decision Agent
                     ▼
        Executive Recommendation
```

## Agent Responsibilities

### Market Agent
- Market research
- Competitor analysis
- Trend detection
- Opportunity identification

### Risk Agent
- Revenue analysis
- Inventory risk
- Sales trend analysis
- Business risk scoring

### Customer Agent
- Customer review analysis
- Sentiment scoring
- Pain-point detection

### Strategy Agent
- Generate multiple strategies
- Compare trade-offs
- Confidence scoring

### Decision Agent
- Executive recommendation
- Business impact
- Recommended actions
- Key risks

## Technology Stack

### Backend
- FastAPI
- LangGraph
- LangChain
- Mistral AI
- SQLite
- SQLAlchemy
- Pandas
- NumPy
- TextBlob

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### External Tools
- Tavily Search
- CSV Business Data
- SQLite
- Sentiment Analysis

## Capstone Concepts

### ✅ Multi-Agent System
Market, Risk, Customer, Strategy, and Decision agents coordinated using LangGraph.

### ✅ Tool Use
- Tavily Search API
- CSV Analytics
- Sentiment Analysis
- SQLite Decision History
- Mistral AI

### ✅ Deployability
- FastAPI backend
- React + Vite frontend
- REST APIs
- Streaming workflow

### ✅ Security
- Input validation
- Business-domain guardrails
- API key validation
- Human approval for high-risk decisions

## Project Structure

```text
war_room/
├── backend/
├── frontend/
├── data/
├── requirements.txt
└── README.md
```

## Installation

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

## Environment Variables

```env
MISTRAL_API_KEY=your_mistral_api_key
TAVILY_API_KEY=your_tavily_api_key
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Health Check |
| POST | /run-decision | Execute Decision Workflow |
| GET | /run-decision-stream | Live Workflow |
| GET | /decisions | Decision History |
| GET | /decision/{id} | Get Decision |
| POST | /data/upload/{dataset} | Upload Dataset |

## Demo Script

1. Start backend and frontend.
2. Ask:
   - Should we run a flash sale this weekend?
3. Observe:
   - Market research
   - Risk analysis
   - Customer sentiment
   - Strategy generation
   - Executive recommendation

> **ExecutiveAI is not a chatbot. It is a multi-agent business decision system that combines tools, data, reasoning, and AI agents to generate executive-level recommendations.**


## Limitations

- Uses sample datasets by default
- Requires external APIs
- LLM outputs may vary
- SQLite intended for demo/development

## Future Work

- MCP Tool Server
- Human Approval Workflow
- Cloud Deployment
- Inventory Optimization Agent
- Financial Forecasting Agent
- Authentication & RBAC
- Vector Database Integration

## Author

**Jyoti**

AI/ML Engineer | GenAI Developer

## License

Developed for the **Agents for Business Capstone Project** for educational and research purposes.
