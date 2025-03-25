from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from datetime import datetime
import os

api_router = APIRouter()
mongo = MongoClient(os.environ["MONGO_URI"])
db = mongo["cowrie"]


@api_router.get("/health")
async def health():
    return JSONResponse({"status": "ok"})


@api_router.post("/search")
async def search():
    collections = db.list_collection_names()
    return collections


@api_router.get("/annotations")
async def annotations():
    return JSONResponse([])


@api_router.post("/query_custom")
async def query_custom(request: Request):
    data = await request.json()
    collection_name = data.get("collection")
    pipeline = data.get("pipeline", [])

    collection = db.get_collection(collection_name)

    _from = data.get("range", {}).get("from")
    _to = data.get("range", {}).get("to")

    if _from and _to:
        match_stage = {"$match": {"timestamp": {"$gte": _from, "$lte": _to}}}

        if pipeline and "$match" in pipeline[0]:
            pipeline[0]["$match"].update(match_stage["$match"])
        else:
            pipeline.insert(0, match_stage)

    results = list(collection.aggregate(pipeline))

    for doc in results:
        for k, v in doc.items():
            if isinstance(v, datetime):
                doc[k] = v.isoformat()

    return JSONResponse(results)
