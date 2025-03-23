import asyncio
import websockets
import json
import random
import time


async def mock_attack_sender(websocket, path):
    print("Client connected")
    try:
        while True:
            attack = generate_mock_attack()
            await websocket.send(json.dumps(attack))
            await asyncio.sleep(3)
    except websockets.exceptions.ConnectionClosedError:
        print("Client disconnected")


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


async def main():
    async with websockets.serve(mock_attack_sender, "0.0.0.0", 8000):
        print("Server started")
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
