from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.graph import graph_executor

app = FastAPI(
    title="AI Agent Backend",
    version="1.0.0"
)

# ----------------------------
# CORS
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # allow all frontends
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------
# Health Check
# ----------------------------
@app.get("/")
async def home():
    return {
        "status": "Server is running",
        "message": "Use POST /chat to interact with the agent."
    }


# ----------------------------
# Chat Endpoint
# ----------------------------
@app.post("/chat")
async def chat(payload: dict):
    user_message = payload.get("message", "")

    if not user_message:
        return {"reply": "Please send a valid message."}

    # Run LangGraph agent
    result = graph_executor.invoke({"input": user_message})

    return {"reply": result.get("response")}
