import{r as c,j as e}from"./index-CzsKRG-n.js";import{u as p,F as h}from"./index.esm-Nahw02Rg.js";import{c as u}from"./index-BNfnTDOO.js";const a=c.createContext();function w(o){const[t,r]=c.useState(!1),n=()=>{r(!t)},s=o.errors||{},d=p(),x={show:t,setShow:r,toggle:n,form:d,errors:s};return e.jsx(a.Provider,{value:x,children:e.jsx(h,{...d,children:o.children})})}function i(){const o=c.useContext(a);if(typeof o>"u")throw new Error("useDropdown must be used within DropdownProvider");return o}const l=({children:o,...t})=>e.jsx(w,{...t,children:e.jsx("div",{className:"relative inline-block w-full",children:o})}),g=o=>{const{onClick:t}=o,{setShow:r}=i(),n=()=>{t&&t(),r(!1)};return e.jsx("div",{className:"py-4 px-5 cursor-pointer flex items-center justify-between option transition-all text-sm",onClick:n,children:o.children})},m=({placeholder:o,...t})=>{const{onChange:r}=i();return e.jsx("div",{className:"sticky top-0 z-10 p-2 bg-white",children:e.jsx("input",{type:"text",placeholder:o,className:"w-full p-4 border border-gray-200 rounded outline-none",onChange:r,...t})})},f=({placeholder:o="",className:t=""})=>{const{toggle:r,show:n,errors:s}=i();return e.jsxs("div",{id:"item-create",onClick:r,style:{border:"1px solid rgba(138, 138, 160, 0.3)",outline:0,boxShadow:"none",fontSize:"18px",lineHeight:"28px",borderRadius:"4px",background:"transparent",color:"#8A8A8A",width:"100%",padding:"10px 0"},className:u(t,(s==null?void 0:s.length)>0?"border-danger":""),children:[e.jsx("span",{style:{marginLeft:"15px"},children:o}),e.jsx("span",{style:{float:"right",marginTop:"4px"},children:n?e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",style:{width:"20px"},fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 15l7-7 7 7"})}):e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",style:{width:"20px"},fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"})})})]})},j=({children:o})=>{const{show:t}=i();return e.jsx(e.Fragment,{children:t&&e.jsx("div",{style:{border:"1px solid rgba(138, 138, 160, 0.3)",outline:0,boxShadow:"none",fontSize:"18px",lineHeight:"28px",borderRadius:"4px",background:"transparent",color:"#8a8aa0"},children:o})})};l.Option=g;l.Search=m;l.Select=f;l.List=j;export{l as D};