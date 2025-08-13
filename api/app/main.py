from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx, os

BASE_DATA_URL = os.getenv("BASE_DATA_URL")  # e.g. https://<user>.github.io/lsl-data/slices
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")

app = FastAPI(title="Lone Star Ledger API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=[o.strip() for o in CORS_ORIGINS.split(",")],
                   allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

async def fetch(rel: str):
    assert BASE_DATA_URL, "Set BASE_DATA_URL env var"
    url = f"{BASE_DATA_URL.rstrip('/')}/{rel}"
    async with httpx.AsyncClient(timeout=30) as c:
        r = await c.get(url)
        r.raise_for_status()
        return r.json()

@app.get("/health")
async def health():
    return {"ok": True, "base": BASE_DATA_URL}

@app.get("/districts")
async def districts(query: str = "", page: int = 1, size: int = 20):
    data = await fetch("districts_index.json")
    q = query.lower().strip()
    if q:
        data = [d for d in data if q in (d.get("district_name","").lower()) or q in (d.get("DISTRICT_N","").lower())]
    start = (page-1)*size
    return {"total": len(data), "items": data[start:start+size]}

@app.get("/districts/{did}")
async def district(did: str):
    index = await fetch("districts_index.json")
    metrics = await fetch("districts_metrics.json")
    base = next((d for d in index if d.get("DISTRICT_N")==did), None)
    met  = next((m for m in metrics if m.get("DISTRICT_N")==did), None)
    return {"profile": base, "metrics": met}

@app.get("/districts/{did}/metrics")
async def district_metrics(did: str):
    metrics = await fetch("districts_metrics.json")
    met  = next((m for m in metrics if m.get("DISTRICT_N")==did), None)
    return met or {}

@app.get("/compare")
async def compare(ids: str):
    id_list = [i.strip() for i in ids.split(",") if i.strip()]
    metrics = await fetch("districts_metrics.json")
    by_id = {m.get("DISTRICT_N"): m for m in metrics}
    return {"items": [by_id[i] for i in id_list if i in by_id]}

@app.get("/map/districts_topo")
async def map_districts():
    return await fetch("map_districts_topo.json")

@app.get("/map/campuses")
async def map_campuses():
    return await fetch("map_campuses.json")
