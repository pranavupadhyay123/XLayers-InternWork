import asyncio
import logging
import fitz  # PyMuPDF
import google.generativeai as genai
from mcp.server.fastmcp import FastMCP
from pathlib import Path

# Setup logging and server
logging.basicConfig(level=logging.INFO)
app = FastMCP("pdf-summary-server")

# Gemini setup
genai.configure(api_key="AIzaSyASsA9e1SMAjC7V-YE-slBRPvDWJvHj9bw")
model = genai.GenerativeModel("gemini-pro")

# PDF text extraction
def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

# Define the tool
@app.tool(file_types=["application/pdf"])
async def summarize_pdf(file: Path) -> dict:
    try:
        logging.info(f"Summarizing PDF: {file}")
        text = extract_text_from_pdf(file)
        prompt = f"Summarize the following PDF content:\n\n{text[:15000]}"  # Gemini token limit safe
        response = model.generate_content(prompt)
        summary = response.text
        return {"content": [{"type": "text", "text": summary}]}
    except Exception as e:
        logging.error(f"Error summarizing PDF: {e}")
        return {"content": [{"type": "text", "text": f"Failed to summarize: {str(e)}"}]}
