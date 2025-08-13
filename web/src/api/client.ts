import axios from "axios";
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
export const api = axios.create({ baseURL: API_BASE, timeout: 20000 });

export async function fetchDistricts(query="",page=1,size=20){
  return (await api.get("/districts",{params:{query,page,size}})).data as {total:number,items:any[]};
}
export async function fetchDistrict(id:string){
  return (await api.get(`/districts/${id}`)).data as {profile:any,metrics:any};
}
export async function fetchCompare(ids:string[]){
  return (await api.get(`/compare`,{params:{ids:ids.join(",")}})).data as {items:any[]};
}
export async function fetchMapDistricts(){ return (await api.get("/map/districts_topo")).data; }
export async function fetchMapCampuses(){ return (await api.get("/map/campuses")).data; }
