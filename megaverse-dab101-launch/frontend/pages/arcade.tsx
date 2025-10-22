import { useEffect, useRef } from 'react';
import * as THREE from 'three';
export default function Arcade(){
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!ref.current) return;
    const scene=new THREE.Scene(); scene.background=new THREE.Color(0x000000);
    const camera=new THREE.PerspectiveCamera(70,ref.current.clientWidth/ref.current.clientHeight,0.1,1000); camera.position.z=5;
    const renderer=new THREE.WebGLRenderer({antialias:true}); renderer.setSize(ref.current.clientWidth,ref.current.clientHeight); ref.current.appendChild(renderer.domElement);
    const geo=new THREE.TorusKnotGeometry(1,0.3,128,16); const mat=new THREE.MeshStandardMaterial({color:0x00ffff,emissive:0x001133,metalness:0.9,roughness:0.2});
    const mesh=new THREE.Mesh(geo,mat); scene.add(mesh);
    const l1=new THREE.PointLight(0x66ccff,2,100); l1.position.set(5,5,5); scene.add(l1);
    const l2=new THREE.PointLight(0xff66cc,2,100); l2.position.set(-5,-5,5); scene.add(l2);
    const animate=()=>{mesh.rotation.x+=0.01;mesh.rotation.y+=0.01;renderer.render(scene,camera);}; renderer.setAnimationLoop(animate);
    const onResize=()=>{if(!ref.current)return;camera.aspect=ref.current.clientWidth/ref.current.clientHeight;camera.updateProjectionMatrix();renderer.setSize(ref.current.clientWidth,ref.current.clientHeight);};
    window.addEventListener('resize',onResize);
    return ()=>{window.removeEventListener('resize',onResize);renderer.setAnimationLoop(null);renderer.dispose();ref.current?.removeChild(renderer.domElement);};
  },[]);
  return <div style={{height:'100vh'}} ref={ref}/>;
}