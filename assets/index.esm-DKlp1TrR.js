import{a4 as L,j as k,ao as O,ap as R,G as x,af as c,r as a,aA as S,ah as N,bC as I,aD as D,at as F}from"./index-CjfU-kfm.js";const B=L(k.jsx("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person");function H(e){return O("MuiAvatar",e)}R("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);const W=["alt","children","className","component","slots","slotProps","imgProps","sizes","src","srcSet","variant"],U=e=>{const{classes:t,variant:o,colorDefault:r}=e;return F({root:["root",o,r&&"colorDefault"],img:["img"],fallback:["fallback"]},H,t)},_=x("div",{name:"MuiAvatar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,t[o.variant],o.colorDefault&&t.colorDefault]}})(({theme:e})=>({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none",variants:[{props:{variant:"rounded"},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:{variant:"square"},style:{borderRadius:0}},{props:{colorDefault:!0},style:c({color:(e.vars||e).palette.background.default},e.vars?{backgroundColor:e.vars.palette.Avatar.defaultBg}:c({backgroundColor:e.palette.grey[400]},e.applyStyles("dark",{backgroundColor:e.palette.grey[600]})))}]})),q=x("img",{name:"MuiAvatar",slot:"Img",overridesResolver:(e,t)=>t.img})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),J=x(B,{name:"MuiAvatar",slot:"Fallback",overridesResolver:(e,t)=>t.fallback})({width:"75%",height:"75%"});function T({crossOrigin:e,referrerPolicy:t,src:o,srcSet:r}){const[l,n]=a.useState(!1);return a.useEffect(()=>{if(!o&&!r)return;n(!1);let i=!0;const s=new Image;return s.onload=()=>{i&&n("loaded")},s.onerror=()=>{i&&n("error")},s.crossOrigin=e,s.referrerPolicy=t,s.src=o,r&&(s.srcset=r),()=>{i=!1}},[e,t,o,r]),l}const Z=a.forwardRef(function(t,o){const r=S({props:t,name:"MuiAvatar"}),{alt:l,children:n,className:i,component:s="div",slots:u={},slotProps:v={},imgProps:p,sizes:m,src:w,srcSet:y,variant:j="circular"}=r,M=N(r,W);let h=null;const P=T(c({},p,{src:w,srcSet:y})),E=w||y,z=E&&P!=="error",g=c({},r,{colorDefault:!z,component:s,variant:j}),b=U(g),[A,C]=I("img",{className:b.img,elementType:q,externalForwardedProps:{slots:u,slotProps:{img:c({},p,v.img)}},additionalProps:{alt:l,src:w,srcSet:y,sizes:m},ownerState:g});return z?h=k.jsx(A,c({},C)):n||n===0?h=n:E&&l?h=l[0]:h=k.jsx(J,{ownerState:g,className:b.fallback}),k.jsx(_,c({as:s,ownerState:g,className:D(b.root,i),ref:o},M,{children:h}))});function d(){return d=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},d.apply(this,arguments)}function f(e,t){if(e==null)return{};var o,r,l=function(i,s){if(i==null)return{};var u,v,p={},m=Object.keys(i);for(v=0;v<m.length;v++)u=m[v],s.indexOf(u)>=0||(p[u]=i[u]);return p}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(l[o]=e[o])}return l}var G=["size","color","stroke"];function $(e){var t=e.size,o=t===void 0?24:t,r=e.color,l=r===void 0?"currentColor":r,n=e.stroke,i=n===void 0?2:n,s=f(e,G);return a.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-arrow-down-left",width:o,height:o,viewBox:"0 0 24 24",strokeWidth:i,stroke:l,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},s),a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),a.createElement("line",{x1:17,y1:7,x2:7,y2:17}),a.createElement("polyline",{points:"16 17 7 17 7 8"}))}var K=["size","color","stroke"];function ee(e){var t=e.size,o=t===void 0?24:t,r=e.color,l=r===void 0?"currentColor":r,n=e.stroke,i=n===void 0?2:n,s=f(e,K);return a.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-arrow-up-left",width:o,height:o,viewBox:"0 0 24 24",strokeWidth:i,stroke:l,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},s),a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),a.createElement("line",{x1:7,y1:7,x2:17,y2:17}),a.createElement("polyline",{points:"16 7 7 7 7 16"}))}var Q=["size","color","stroke"];function te(e){var t=e.size,o=t===void 0?24:t,r=e.color,l=r===void 0?"currentColor":r,n=e.stroke,i=n===void 0?2:n,s=f(e,Q);return a.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-layout-dashboard",width:o,height:o,viewBox:"0 0 24 24",strokeWidth:i,stroke:l,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},s),a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),a.createElement("path",{d:"M4 4h6v8h-6z"}),a.createElement("path",{d:"M4 16h6v4h-6z"}),a.createElement("path",{d:"M14 12h6v8h-6z"}),a.createElement("path",{d:"M14 4h6v4h-6z"}))}var V=["size","color","stroke"];function oe(e){var t=e.size,o=t===void 0?24:t,r=e.color,l=r===void 0?"currentColor":r,n=e.stroke,i=n===void 0?2:n,s=f(e,V);return a.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-menu",width:o,height:o,viewBox:"0 0 24 24",strokeWidth:i,stroke:l,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},s),a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),a.createElement("line",{x1:4,y1:8,x2:20,y2:8}),a.createElement("line",{x1:4,y1:16,x2:20,y2:16}))}var X=["size","color","stroke"];function re(e){var t=e.size,o=t===void 0?24:t,r=e.color,l=r===void 0?"currentColor":r,n=e.stroke,i=n===void 0?2:n,s=f(e,X);return a.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",className:"icon icon-tabler icon-tabler-users",width:o,height:o,viewBox:"0 0 24 24",strokeWidth:i,stroke:l,fill:"none",strokeLinecap:"round",strokeLinejoin:"round"},s),a.createElement("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),a.createElement("circle",{cx:9,cy:7,r:4}),a.createElement("path",{d:"M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"}),a.createElement("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"}),a.createElement("path",{d:"M21 21v-2a4 4 0 0 0 -3 -3.85"}))}export{Z as A,oe as E,te as P,$ as c,ee as p,re as x};
