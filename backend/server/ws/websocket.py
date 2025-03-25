from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from time import time
import json
import random


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

active_connections = set()


def generate_mock_attack():
    attacker = {
        "lat": random.random() * 180 - 90,
        "lng": random.random() * 180 - 90,
        "country": "Some country",
        "color": random.choice(["red", "blue", "green"]),
    }

    return {
        "type": "attack",
        "from": {
            "lat": attacker["lat"],
            "lng": attacker["lng"],
            "color": attacker["color"],
        },
        "to": {"lat": 52.2297, "lng": 21.0122},
        "timestamp": time.time(),
    }


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.add(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            attack = generate_mock_attack()
            await websocket.send_text(json.dumps(data))
    except WebSocketDisconnect:
        active_connections.remove(websocket)
        print("Connection closed")
