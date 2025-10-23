import { useMemo, useState } from 'react';

type CatalogItem = { id: string; title: string; price: number };
type CartItem = { id: string; title: string; price: number; qty: number };

export default function StoreTemplateA({ catalog }: { catalog: CatalogItem[] }){
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const api = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';

  const add = (it: CatalogItem)=>{
    setCart(prev => {
      const next = { ...prev };
      const existing = next[it.id];
      if (existing) existing.qty += 1; else next[it.id] = { ...it, qty: 1 };
      return next;
    });
  };
  const sub = (id: string)=>{
    setCart(prev => {
      const next = { ...prev };
      const existing = next[id];
      if (!existing) return prev;
      existing.qty -= 1;
      if (existing.qty <= 0) delete next[id];
      return next;
    });
  };
  const clear = ()=> setCart({});

  const items = useMemo(()=>Object.values(cart),[cart]);
  const total = useMemo(()=> items.reduce((s,i)=>s + i.price * i.qty, 0),[items]);

  const checkout = async ()=>{
    const payload = { items: items.map(i=>({ id: i.id, qty: i.qty, price: i.price })) };
    const res = await fetch(`${api}/checkout/create`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
    const data = await res.json();
    alert(`Order ${data.orderId} created. Total: ${data.total}`);
  };

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:20}}>
      <div>
        <h3>Catalog</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))',gap:12}}>
          {catalog.map(it=> (
            <div key={it.id} style={{border:'1px solid #333',padding:12,borderRadius:8}}>
              <div style={{fontWeight:700}}>{it.title}</div>
              <div style={{opacity:.8}}>${it.price.toFixed(2)}</div>
              <button style={{marginTop:8}} onClick={()=>add(it)}>Add to cart</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{border:'1px solid #333',padding:12,borderRadius:8}}>
        <h3>Cart</h3>
        {items.length===0 && <div style={{opacity:.7}}>No items yet.</div>}
        {items.map(i=> (
          <div key={i.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px dashed #333'}}>
            <div>
              <div>{i.title}</div>
              <div style={{fontSize:12,opacity:.7}}>${i.price.toFixed(2)} x {i.qty}</div>
            </div>
            <div>
              <button onClick={()=>sub(i.id)}>-</button>
              <button style={{marginLeft:6}} onClick={()=>add({id:i.id,title:i.title,price:i.price})}>+</button>
            </div>
          </div>
        ))}
        <div style={{marginTop:8,fontWeight:700}}>Total: ${total.toFixed(2)}</div>
        <div style={{display:'flex',gap:8,marginTop:10}}>
          <button onClick={checkout} disabled={items.length===0}>Create Order</button>
          <button onClick={clear} disabled={items.length===0}>Clear</button>
        </div>
      </div>
    </div>
  );
}
