import{P as e,w as h,b4 as g,j as a,W as u,F as j}from"./index-C-1mI_3F.js";const o=l=>{const{control:t,name:s,placeholder:c,className:i,error:r="",children:n,defaultValue:m,...d}=l,{field:{value:p,onChange:x}}=g({control:t,name:s,defaultValue:m});return a.jsxs("div",{children:[r?a.jsx("span",{className:"text-danger h5",children:r}):null,a.jsx("textarea",{id:s,name:s,placeholder:c,value:p,onChange:x,...d,className:u(i,r.length>0?"border-danger":"",n)}),n&&a.jsx("span",{className:"select-none",children:n})]})};o.propTypes={name:e.string,type:e.string,placeholder:e.string,className:e.string,error:e.string,children:e.any,control:e.any.isRequired};const N=h(o,{FallbackComponent:j});export{N as T,o as a};