'use client';

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, Move3D } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

const HeroContainer = styled.section`
  min-height: 80vh; display: flex; align-items: center; justify-content: space-between;
  max-width: 1400px; margin: 0 auto; padding: 2rem; gap: 4rem;
  @media (max-width: 1024px) { flex-direction: column-reverse; justify-content: center; text-align: center; }
`;
const LeftColumn = styled.div`
  flex: 1.2; display: flex; flex-direction: column; justify-content: center; gap: .5rem;
`;
const RightColumn = styled(motion.div)`
  flex: .8; width: 100%; display: flex; justify-content: center; align-items: center;
`;
const TextLine1 = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin: 0;
  background: linear-gradient(to right, #3b82f6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
`;
const TextLine2 = styled(motion.h1)`
  font-size: clamp(3rem, 6vw, 5rem); font-weight: 800; margin: 0;
  background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
`;
const TextLine3 = styled(motion.h2)`
  font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; margin: 0;
  background: linear-gradient(to right, #eab308, #f97316, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
`;
const SocialIcons = styled(motion.div)`
  display: flex; gap: 1.5rem; margin-top: 2rem;
  @media (max-width: 1024px) { justify-content: center; }
  a { color: var(--foreground); background: var(--surface); padding: .8rem; border-radius: 12px;
    transition: all .2s ease; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; }
  a:hover { background: var(--primary); border-color: var(--primary); transform: translateY(-3px); }
`;

const levitate = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}`;
const glow = keyframes`0%,100%{opacity:.55;transform:scale(.94)}50%{opacity:.9;transform:scale(1.05)}`;

const CubeStage = styled.div`
  width: min(82vw, 440px); aspect-ratio: 1; position: relative; display: grid; place-items: center;
  perspective: 900px; touch-action: none; user-select: none; cursor: grab;
  &:active { cursor: grabbing; }
  &::before { content:''; position:absolute; inset:17%; border-radius:50%;
    background:radial-gradient(circle,rgba(139,92,246,.36),rgba(236,72,153,.12) 45%,transparent 72%);
    filter:blur(25px); animation:${glow} 4s ease-in-out infinite; }
  &::after { content:''; position:absolute; width:72%; height:28%; bottom:12%; border:1px solid rgba(139,92,246,.28);
    border-radius:50%; transform:rotateX(66deg); box-shadow:0 0 30px rgba(139,92,246,.18); }
  &:focus-visible { outline:3px solid #8b5cf6; outline-offset:6px; border-radius:24px; }
  @media (max-width:480px) { width:min(90vw,340px); }
  @media (prefers-reduced-motion:reduce) { &::before { animation:none; } }
`;
const FloatingCube = styled.div`
  position:relative; z-index:2; animation:${levitate} 5s ease-in-out infinite;
  @media (prefers-reduced-motion:reduce) { animation:none; }
`;
const Cube = styled.div<{ $x:number; $y:number; $dragging:boolean }>`
  --cube-size:clamp(160px,25vw,220px); width:var(--cube-size); height:var(--cube-size); position:relative;
  transform-style:preserve-3d; transform:${({$x,$y})=>`rotateX(${$x}deg) rotateY(${$y}deg)`};
  transition:${({$dragging})=>$dragging?'none':'transform .35s cubic-bezier(.2,.8,.2,1)'};
`;
const Face = styled.div`
  position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:.65rem; padding:1.2rem; text-align:center; border:1px solid rgba(255,255,255,.3);
  background:linear-gradient(145deg,rgba(139,92,246,.42),rgba(14,21,38,.82) 55%,rgba(236,72,153,.28));
  box-shadow:inset 0 0 35px rgba(255,255,255,.04),0 0 24px rgba(139,92,246,.14); backdrop-filter:blur(10px);
  strong { color:white; font-size:clamp(.95rem,2.4vw,1.25rem); font-weight:800; text-shadow:0 2px 12px rgba(0,0,0,.45); }
  span { max-width:160px; color:#cbd5e1; font-size:clamp(.65rem,1.6vw,.78rem); line-height:1.5; }
  &.front{transform:translateZ(calc(var(--cube-size)/2))}
  &.back{transform:rotateY(180deg) translateZ(calc(var(--cube-size)/2))}
  &.right{transform:rotateY(90deg) translateZ(calc(var(--cube-size)/2))}
  &.left{transform:rotateY(-90deg) translateZ(calc(var(--cube-size)/2))}
  &.top{transform:rotateX(90deg) translateZ(calc(var(--cube-size)/2))}
  &.bottom{transform:rotateX(-90deg) translateZ(calc(var(--cube-size)/2))}
`;
const DragHint = styled.div`
  position:absolute; left:50%; bottom:3%; z-index:4; transform:translateX(-50%); display:flex; align-items:center;
  gap:.45rem; white-space:nowrap; color:#94a3b8; font-size:.76rem; letter-spacing:.03em;
`;

const MAX_VERTICAL_TILT = 82;
const SIDE_TILT = -16;
type DragAxis = 'horizontal' | 'vertical' | null;

const closestSideAngle = (angle: number) => Math.round(angle / 90) * 90;
const closestUprightAngle = (angle: number) => Math.round(angle / 360) * 360;

export default function Hero(){
  const { t } = useLanguage();
  const [rotation,setRotation]=useState({x:-16,y:30});
  const [dragging,setDragging]=useState(false);
  const drag=useRef({startX:0,startY:0,originY:0,safeY:0,deltaX:0,deltaY:0,axis:null as DragAxis});

  const pointerDown=(event:PointerEvent<HTMLDivElement>)=>{
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current={
      startX:event.clientX,
      startY:event.clientY,
      originY:rotation.y,
      safeY:closestUprightAngle(rotation.y),
      deltaX:0,
      deltaY:0,
      axis:null,
    };
    setDragging(true);
  };
  const pointerMove=(event:PointerEvent<HTMLDivElement>)=>{
    if(!dragging)return;
    const deltaX=event.clientX-drag.current.startX;
    const deltaY=event.clientY-drag.current.startY;
    drag.current.deltaX=deltaX;
    drag.current.deltaY=deltaY;

    if(!drag.current.axis&&Math.max(Math.abs(deltaX),Math.abs(deltaY))>=8){
      drag.current.axis=Math.abs(deltaX)>=Math.abs(deltaY)?'horizontal':'vertical';
    }

    if(drag.current.axis==='horizontal'){
      setRotation({x:SIDE_TILT,y:drag.current.originY+deltaX*.45});
    }
  };
  const pointerUp=(event:PointerEvent<HTMLDivElement>)=>{
    if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
    if(drag.current.axis==='horizontal'){
      setRotation(current=>({x:SIDE_TILT,y:closestSideAngle(current.y)}));
    }
    if(drag.current.axis==='vertical'){
      setRotation({
        x:drag.current.deltaY>0?-MAX_VERTICAL_TILT:MAX_VERTICAL_TILT,
        y:drag.current.safeY,
      });
    }
    setDragging(false);
  };
  const keyDown=(event:KeyboardEvent<HTMLDivElement>)=>{
    if(!event.key.startsWith('Arrow'))return;
    event.preventDefault();
    if(event.key==='ArrowLeft')setRotation(v=>({x:SIDE_TILT,y:closestSideAngle(v.y)-90}));
    if(event.key==='ArrowRight')setRotation(v=>({x:SIDE_TILT,y:closestSideAngle(v.y)+90}));
    if(event.key==='ArrowUp')setRotation(v=>({x:-MAX_VERTICAL_TILT,y:closestUprightAngle(v.y)}));
    if(event.key==='ArrowDown')setRotation(v=>({x:MAX_VERTICAL_TILT,y:closestUprightAngle(v.y)}));
  };

  return <HeroContainer id="home">
    <LeftColumn>
      <TextLine1 initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.6}}>{t.hero.greeting}</TextLine1>
      <TextLine2 initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.6,delay:.2}}>{t.hero.intro}</TextLine2>
      <TextLine3 initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.6,delay:.4}}>{t.hero.role}</TextLine3>
      <SocialIcons initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.8}}>
        <a href="https://www.linkedin.com/in/miguel-bonilla-4b7438285/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={32}/></a>
        <a href="https://github.com/miguelbonilla1" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={32}/></a>
        <a href="#contact" aria-label={t.nav.contact}><Mail size={32}/></a>
      </SocialIcons>
    </LeftColumn>
    <RightColumn initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:'easeOut'}}>
      <CubeStage role="application" tabIndex={0} aria-label={t.hero.cubeLabel}
        onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onKeyDown={keyDown}>
        <FloatingCube><Cube $x={rotation.x} $y={rotation.y} $dragging={dragging}>
          <Face className="front"><span>{t.hero.faces[0].description}</span></Face>
          <Face className="back"><strong>{t.hero.faces[1].title}</strong><span>{t.hero.faces[1].description}</span></Face>
          <Face className="right"><strong>{t.hero.faces[2].title}</strong><span>{t.hero.faces[2].description}</span></Face>
          <Face className="left"><strong>{t.hero.faces[3].title}</strong><span>{t.hero.faces[3].description}</span></Face>
          <Face className="top"><strong>{t.hero.faces[4].title}</strong><span>{t.hero.faces[4].description}</span></Face>
          <Face className="bottom"><strong>{t.hero.faces[5].title}</strong><span>{t.hero.faces[5].description}</span></Face>
        </Cube></FloatingCube>
        <DragHint><Move3D size={15}/> {t.hero.drag}</DragHint>
      </CubeStage>
    </RightColumn>
  </HeroContainer>;
}
