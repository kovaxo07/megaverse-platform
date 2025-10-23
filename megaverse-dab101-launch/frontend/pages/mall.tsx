import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const StoreTemplateA = dynamic(()=>import('../components/StoreTemplateA'),{ ssr:false });

export default function Mall(){
  const [catalog,setCatalog]=useState<Array<{id:string;title:string;price:number}>>([]);
  const api = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';
  useEffect(()=>{ fetch(`${api}/mall/catalog`).then(r=>r.json()).then(setCatalog).catch(()=>{}); },[api]);
  return <div style={{padding:20,background:'#000',color:'#0ff',minHeight:'100vh',fontFamily:'sans-serif'}}>
    <h2>VR Mall</h2>
    <p>Sample catalog served by backend /mall/catalog. Create order -> POST /checkout/create.</p>
    <div style={{marginTop:16}}>
      <StoreTemplateA catalog={catalog}/>
    </div>
  </div>;
}