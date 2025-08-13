from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx, os

# Public, read-only JSON slices on GitHub Pages, e.g.:
# https://jab1897.github.io/lsl-data/slices
BASE_DATA_URL = os.getenv("BASE_DATA_URL")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")

app = FastAPI(title="Lone Star Ledger API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in CORS_ORIGINS.split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def fetch_json(rel: str):
    if not BASE_DATA_URL:
        raise HTTPException(status_code=500, detail="BASE_DATA_URL not set")
    url = f"{BASE_DATA_URL.rstrip('/')}/{rel}"
    async with httpx.AsyncClient(timeout=30) as c:
        r = await c.get(url)
        r.raise_for_status()
        return r.json()

@app.get("/health")
async def health():
    return {"ok": True, "base": BASE_DATA_URL}

@app.get("/districts")
async def list_districts(query: str = "", page: int = 1, size: int = 20):
    data = await fetch_json("districts_index.json")
    q = query.lower().strip()
    if q:
        data = [d for d in data if q in d.get("district_name","").lower() or q in d.get("DISTRICT_N","").lower()]
    page  = max(page, 1)
    size  = max(min(size, 200), 1)
    start = (page - 1) * size
    return {"total": len(data), "items": data[start:start+size]}

@app.get("/districts/{did}")
async def get_district(did: str):
    index   = await fetch_json("districts_index.json")
    metrics = await fetch_json("districts_metrics.json")
    base = next((d for d in index if d.get("DISTRICT_N") == did), None)
    if not base:
        raise HTTPException(status_code=404, detail="District not found")
    met  = next((m for m in metrics if m.get("DISTRICT_N") == did), None)
    return {"profile": base, "metrics": met}

@app.get("/districts/{did}/metrics")
async def get_metrics(did: str):
    metrics = await fetch_json("districts_metrics.json")
    met  = next((m for m in metrics if m.get("DISTRICT_N") == did), None)
    if not met:
        raise HTTPException(status_code=404, detail="Metrics not found")
    return met

@app.get("/compare")
async def compare(ids: str):
    id_list = [i.strip() for i in ids.split(",") if i.strip()]
    data = await fetch_json("districts_metrics.json")
    by_id = {m.get("DISTRICT_N"): m for m in data}
    return {"items": [by_id[i] for i in id_list if i in by_id]}

@app.get("/map/districts_topo")
async def districts_topo():
    return await fetch_json("map_districts_topo.json")

@app.get("/map/campuses")
async def campuses_geo():
    return await fetch_json("map_campuses.json")
