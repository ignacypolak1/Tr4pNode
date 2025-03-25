from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.ws.websocket import websocket_endpoint
from server.api.endpoints import api_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")
app.add_api_websocket_route("/ws", websocket_endpoint)
