from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi import Request
import os
import tempfile
from PyPDF2 import PdfReader
from docx import Document
import requests
import uuid
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "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")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"

# In-memory session store: {session_id: {metadata, text, summary, note, chat_history}}
sessions = {}

# Helper: Extract text from PDF
def extract_text_pdf(file_path):
    text = ""
    with open(file_path, "rb") as f:
        reader = PdfReader(f)
        for page in reader.pages:
            text += page.extract_text() or ""
    return text

# Helper: Extract text from DOCX
def extract_text_docx(file_path):
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

# Helper: Extract text from TXT
def extract_text_txt(file_path):
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()

# Helper: Route to correct extractor
def extract_text(file_path, filename):
    ext = filename.lower().split(".")[-1]
    if ext == "pdf":
        return extract_text_pdf(file_path)
    elif ext == "docx":
        return extract_text_docx(file_path)
    elif ext == "txt":
        return extract_text_txt(file_path)
    else:
        raise ValueError("Unsupported file type")

# Helper: Get file metadata
def get_metadata(file: UploadFile, text: str):
    return {
        "filename": file.filename,
        "size": file.spool_max_size if hasattr(file, 'spool_max_size') else None,
        "upload_time": int(time.time()),
        "type": file.content_type,
        "char_count": len(text),
        "word_count": len(text.split()),
    }

# Groq API call
def groq_chat(messages, role="summarizer"):
    if not GROQ_API_KEY or GROQ_API_KEY.startswith("YOUR_"):
        return "[ERROR] Groq API key not set."
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GROQ_API_KEY}",
    }
    system_prompt = {
        "summarizer": "You are a helpful document summarizer. Provide a concise, clear summary in markdown.",
        "explainer": "You are a helpful explainer. Explain the document in detail, in markdown.",
        "qa": "You are a helpful assistant. Answer the user's question about the document in markdown."
    }.get(role, "You are a helpful assistant. Respond in markdown.")
    data = {
        "model": GROQ_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            *messages
        ]
    }
    response = requests.post(GROQ_API_URL, headers=headers, json=data)
    if response.status_code != 200:
        return f"[ERROR] Groq API error: {response.text}"
    result = response.json()
    try:
        return result["choices"][0]["message"]["content"]
    except Exception:
        return "[ERROR] Unexpected Groq API response."

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name
        text = extract_text(tmp_path, file.filename)
        os.unlink(tmp_path)
        if not text.strip():
            raise HTTPException(status_code=400, detail="No text found in document.")
        session_id = str(uuid.uuid4())
        metadata = get_metadata(file, text)
        sessions[session_id] = {
            "metadata": metadata,
            "text": text,
            "summary": None,
            "note": None,
            "chat_history": []
        }
        return {"session_id": session_id, "metadata": metadata}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@app.post("/summarize")
async def summarize(session_id: str = Form(...), note: str = Form(None), role: str = Form("summarizer")):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found.")
    session = sessions[session_id]
    text = session["text"]
    metadata = session["metadata"]
    prompt = f"Document metadata: {metadata}\n\nDocument text:\n{text}"
    if note and note.strip():
        prompt += f"\n\nAdditional note: {note.strip()}"
    messages = [
        {"role": "user", "content": prompt}
    ]
    summary = groq_chat(messages, role=role)
    session["summary"] = summary
    session["note"] = note
    session["chat_history"].append({"role": "user", "content": prompt})
    session["chat_history"].append({"role": "assistant", "content": summary})
    return {"summary": summary, "metadata": metadata, "session_id": session_id}

@app.post("/ask")
async def ask(session_id: str = Form(...), question: str = Form(...), role: str = Form("qa")):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found.")
    session = sessions[session_id]
    chat_history = session["chat_history"]
    # Use last summary as context
    context = session["summary"] or ""
    messages = chat_history[-6:] if len(chat_history) > 6 else chat_history[:]
    messages = messages + [{"role": "user", "content": f"Context: {context}\n\nQuestion: {question}"}]
    answer = groq_chat(messages, role=role)
    session["chat_history"].append({"role": "user", "content": question})
    session["chat_history"].append({"role": "assistant", "content": answer})
    return {"answer": answer, "session_id": session_id, "chat_history": session["chat_history"]}

@app.post("/search")
async def search(session_id: str = Form(...), query: str = Form(...)):
    # Stub: In a real system, use embeddings to find relevant context
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found.")
    session = sessions[session_id]
    text = session["text"]
    # For now, just return the first chunk containing the query
    idx = text.lower().find(query.lower())
    if idx == -1:
        return {"result": "No relevant context found."}
    start = max(0, idx - 100)
    end = min(len(text), idx + 300)
    chunk = text[start:end]
    return {"result": chunk}

@app.get("/session/{session_id}")
async def get_session(session_id: str):
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found.")
    session = sessions[session_id]
    return {
        "metadata": session["metadata"],
        "summary": session["summary"],
        "note": session["note"],
        "chat_history": session["chat_history"]
    } 