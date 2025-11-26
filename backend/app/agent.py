import os
from langchain_openai import ChatOpenAI
from langchain_groq import ChatGroq
from dotenv import load_dotenv


load_dotenv()


def get_groq_model():
return ChatGroq(
model="llama-3.1-70b-versatile",
api_key=os.getenv("GROQ_API_KEY")
)


def get_openai_model():
return ChatOpenAI(
model="gpt-4o-mini",
api_key=os.getenv("OPENAI_API_KEY")
)