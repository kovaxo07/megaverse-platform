import { useEffect, useState } from 'react';

export default function WalletPanel(){
  const [address,setAddress]=useState<string>('');
  const [dab,setDab]=useState<string>('0.0');
  const api = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';
  useEffect(()=>{
    // Demo fetch for balance; replace with ethers read using NEXT_PUBLIC_DAB_TOKEN
    fetch(`${api}/wallet/balance`).then(r=>r.json()).then(d=>{setAddress(d.address);setDab(d.dab)}).catch(()=>{});
  },[api]);
  return (
    <div style={{position:'fixed',right:16,top:16,background:'#111',color:'#0f0',padding:'10px 14px',border:'1px solid #222',borderRadius:8}}>
      <div style={{fontWeight:700}}>Wallet</div>
      <div style={{fontSize:12,opacity:.8}}>{address?address:'(disconnected)'}</div>
      <div style={{marginTop:6}}>DAB: <b>{dab}</b></div>
      <button style={{marginTop:8}} onClick={()=>alert('Connect wallet (stub). Wire MetaMask/WalletConnect next.')}>Connect</button>
    </div>
  );
}
