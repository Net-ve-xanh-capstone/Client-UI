import{w as v,q as g,r as i,o as p,j as e,L as a,b8 as d,b9 as N,F as w}from"./index-8mRTlcDg.js";const k=()=>{g();const m=i.useRef(null);i.useEffect(()=>(window.addEventListener("scroll",r),()=>{window.removeEventListener("scroll",r)}));const r=s=>{const l=document.querySelector(".js-header"),n=window.scrollY;n>=300?l.classList.add("is-fixed"):l.classList.remove("is-fixed"),n>=400?l.classList.add("is-small"):l.classList.remove("is-small")},c=i.useRef(null),t=i.useRef(null);i.useRef(null);const h=()=>{c.current.classList.toggle("active"),t.current.classList.toggle("active")},[u,x]=i.useState(null),j=s=>{x(s)},{jwtToken:L,userInfo:o}=p(s=>s.auth),f=s=>s.public?!0:!s.role||s.role.length===0?!1:o&&s.role.includes(o.role);return e.jsx("header",{id:"header_main",className:"header_1 js-header",ref:m,children:e.jsx("div",{className:"themesflat-container",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-md-12",children:e.jsx("div",{id:"site-header-inner",children:e.jsxs("div",{className:"wrap-box flex",children:[e.jsx("div",{id:"site-logo",className:"clearfix",children:e.jsx("div",{id:"site-logo-inner",children:e.jsx(a,{to:"/Client-UI",rel:"home",className:"main-logo",children:e.jsx("img",{className:"logo-light",id:"logo_header",src:d,srcSet:`${d}`,alt:"logo-netvexanh"})})})}),e.jsx("div",{className:"mobile-button",ref:t,onClick:h,children:e.jsx("span",{})}),e.jsx("nav",{id:"main-nav",className:"main-nav",ref:c,children:e.jsx("ul",{id:"menu-primary-menu",className:"menu",children:N.map((s,l)=>e.jsxs("li",{onClick:()=>j(l),className:`menu-item ${s.namesub?"menu-item-has-children":""} ${u===l?"active":""} `,children:[e.jsx(a,{to:s.links,children:s.name}),s.namesub&&e.jsx("ul",{className:"sub-menu",children:s.namesub.filter(f).map(n=>e.jsx("li",{className:window.location.pathname===n.links?"menu-item current-item":"menu-item",children:e.jsx(a,{to:n.links,children:n.sub})},n.id))})]},l))})})]})})})})})})},E=v(k,{FallbackComponent:w});export{E as H};