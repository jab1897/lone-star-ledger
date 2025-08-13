import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDistrict } from "@/api/client";
import Plotly from "plotly.js-dist-min";
import ShareButton from "@/components/ShareButton";
import { useEffect, useRef, useState } from "react";

const fmtNum = (n:any)=> isFinite(Number(n)) ? Number(n).toLocaleString(): "—";
const fmtMoney = (n:any)=> isFinite(Number(n)) ? "$"+Number(n).toLocaleString(): "—";

export default function DistrictProfile(){
  const { id = "" } = useParams();
  const { data } = useQuery({ queryKey:["district", id], queryFn: ()=>fetchDistrict(id) });
  const m = data?.metrics || {};
  const [perStudent, setPerStudent] = useState(true);

  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!chartRef.current) return;
    const values = perStudent
      ? [m.spend_per_student, m.revenue_per_student, m.debt_per_student]
      : [m.spend_total, m.revenue_total, m.debt_total];
    const labels = perStudent ? ["Spend/Student","Revenue/Student","Debt/Student"] : ["Total Spend","Total Revenue","Total Debt"];
    Plotly.newPlot(chartRef.current, [{type:"bar", x:labels, y:values}], {margin:{t:20}}, {displayModeBar:false});
  }, [m, perStudent]);

  return (
    <div className="container">
      <div className="field" style={{justifyContent:"space-between"}}>
        <div>
          <div className="badge">CDN {id}</div>
          <h2 style={{margin:"6px 0"}}>{data?.profile?.district_name || "District"}</h2>
          <div className="small">Enrollment: {fmtNum(data?.profile?.enrollment)}</div>
        </div>
        <div className="toggle">
          <label className="small">Per student</label>
          <input type="checkbox" checked={perStudent} onChange={e=>setPerStudent(e.target.checked)} />
          <ShareButton/>
        </div>
      </div>

      <div className="grid cols-2" style={{marginTop:12}}>
        <div className="card">
          <h3>Finance</h3>
          <div className="grid">
            <div>Spend: <b>{perStudent? fmtMoney(m.spend_per_student) : fmtMoney(m.spend_total)}</b></div>
            <div>Revenue: <b>{perStudent? fmtMoney(m.revenue_per_student) : fmtMoney(m.revenue_total)}</b></div>
            <div>Debt: <b>{perStudent? fmtMoney(m.debt_per_student) : fmtMoney(m.debt_total)}</b></div>
            <div>M&O Tax: <b>{m.tax_rate_m_O_M ?? "—"}</b></div>
            <div>I&S Tax: <b>{m.tax_rate_i_and_s ?? "—"}</b></div>
          </div>
        </div>
        <div className="card">
          <h3>Finance chart</h3>
          <div ref={chartRef} />
        </div>
      </div>
    </div>
  );
}
