import{bp as p,bq as h,r as m,al as g,ab as S,aa as b}from"./index-B1MbLdmT.js";function L(e,a,t,n,o){const[r,c]=m.useState(()=>o&&t?t(e).matches:n?n(e).matches:a);return g(()=>{let u=!0;if(!t)return;const s=t(e),l=()=>{u&&c(s.matches)};return l(),s.addListener(l),()=>{u=!1,s.removeListener(l)}},[e,t]),r}const d=m.useSyncExternalStore;function y(e,a,t,n,o){const r=m.useCallback(()=>a,[a]),c=m.useMemo(()=>{if(o&&t)return()=>t(e).matches;if(n!==null){const{matches:i}=n(e);return()=>i}return r},[r,e,n,o,t]),[u,s]=m.useMemo(()=>{if(t===null)return[r,()=>()=>{}];const i=t(e);return[()=>i.matches,f=>(i.addListener(f),()=>{i.removeListener(f)})]},[r,t,e]);return d(s,u,c)}function w(e,a={}){const t=p(),n=typeof window<"u"&&typeof window.matchMedia<"u",{defaultMatches:o=!1,matchMedia:r=n?window.matchMedia:null,ssrMatchMedia:c=null,noSsr:u=!1}=h({name:"MuiUseMediaQuery",props:a,theme:t});let s=typeof e=="function"?e(t):e;return s=s.replace(/^@media( ?)/m,""),(d!==void 0?y:L)(s,o,r,c,u)}function Q(e){return b("MuiListItemButton",e)}const x=S("MuiListItemButton",["root","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","selected"]);export{Q as g,x as l,w as u};
