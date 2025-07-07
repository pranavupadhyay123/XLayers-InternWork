import asyncio
from mcp import use_tool

async def main():
    tool = await use_tool("pdf-summary-server")
    response = await tool("sample.pdf")  # Replace with your PDF path
    for item in response["content"]:
        print(item["text"])

if __name__ == "__main__":
    asyncio.run(main())
