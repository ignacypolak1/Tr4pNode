from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
import requests
import httpx
import asyncio
import json
import random
import os


def get_my_location():
    try:
        response = requests.get("http://ip-api.com/json/")
        data = response.json()
        if data["status"] == "success":
            return data["lat"], data["lon"]
    except Exception as e:
        print(f"Error getting server location: {e}")
    return None, None


HONEYPOT_LAT, HONEYPOT_LON = get_my_location()

if HONEYPOT_LAT is None or HONEYPOT_LON is None:
    print("Error getting server location. Exiting.")
    exit(1)

app = FastAPI()
mongo = AsyncIOMotorClient(os.environ["MONGO_URI"])
db = mongo["cowrie"]


class Session(BaseModel):
    id: str
    lat_from: float
    lon_from: float
    lat_to: float
    lon_to: float
    color: str = Field(
        default_factory=lambda: random.choice(
            ["red", "blue", "green", "yellow", "black"]
        )
    )


async def geolocate_ip(ip):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"http://ip-api.com/json/{ip}")
            data = response.json()
            if data["status"] == "success" and data["lat"] and data["lon"]:
                return float(data["lat"]), float(data["lon"])
            else:
                raise Exception("Error during IP API request")
    except Exception as e:
        print(f"IP API error for ip: {ip}: {e}")
        return None, None


async def get_active_sessions():
    sessions_cursor = db.sessions.find({"endtime": {"$eq": None}})
    Sessions = []
    async for sess in sessions_cursor:
        lat, lon = await geolocate_ip(sess["src_ip"])
        if lat and lon:
            session = Session(
                id=str(sess["_id"]),
                lat_from=lat,
                lon_from=lon,
                lat_to=HONEYPOT_LAT,
                lon_to=HONEYPOT_LON,
            )
            Sessions.append(session)
    return Sessions


async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            sessions = await get_active_sessions()
            await websocket.send_text(json.dumps([s.dict() for s in sessions]))

            await asyncio.sleep(10)
    except WebSocketDisconnect:
        print("Connection closed")
