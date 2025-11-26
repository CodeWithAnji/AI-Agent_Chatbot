# 🤖 AI Agent Chatbot

A modern full-stack **AI Agent Chatbot** built with **FastAPI (Python)** backend, **React + Tailwind CSS** frontend, and **LangGraph + LLMs** (OpenAI / Groq / Tavily) to enable intelligent conversation workflows.

- ### Demo Preview
<p align="center">
  <img src="https://github.com/CodeWithAnji/AI-Agent_Chatbot/blob/008ef5b7a6da8341cbf59f7f8b20b6cc6b062fb4/screenshot.png" width="600" height="1000" />
</p>

## Features
- 🌐 Full-stack AI chatbot with modern UI
- 🔄 LangGraph StateGraph workflow implementation
- 🤖 Multi-LLM support (OpenAI / Groq / Tavily Search)
- 📡 FastAPI backend with REST API endpoint
- 💬 Infinite scroll chat interface
- 🎨 Modern responsive UI using Tailwind CSS
- 📍 Input textbox fixed at bottom, chat scrolls above
- 🔑 Secure API key handling using `.env` (not pushed to GitHub)
- 🖥 Responsive layout for desktop & mobile

## 🏗 Tech Stack

### **Frontend**
- React.js
- Tailwind CSS
- Axios

### **Backend**
- FastAPI (Python)
- LangGraph + LangChain
- Uvicorn
- Groq Llama 3.1
- OpenAI GPT-4o mini
- Tavily Search

##  Environment Variables

Create a file `.env` inside `backend/`
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
TAVILY_API_KEY=your_tavily_key

> ⚠ Never commit `.env` to GitHub — already added to `.gitignore`

##  How It Works
1. User selects LLM (OpenAI / Groq)
2. Sends prompt → Backend FastAPI `/chat` endpoint
3. LangGraph agent executes model & generates response
4. Result streamed back and displayed in UI

## ▶ Run Locally

### **Backend**

cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload

### **Frontend**

cd frontend

npm install

npm run dev
