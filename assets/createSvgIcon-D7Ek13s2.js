import{q as v,r as g,_ as z,n as f,j as S}from"./index-0h_SDAPj.js";import{g as I,a as C,s as R,b as w,d as b,e as j}from"./Transition-CCsBKYIx.js";function N(o){return I("MuiSvgIcon",o)}C("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const A=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],B=o=>{const{color:e,fontSize:t,classes:n}=o,i={root:["root",e!=="inherit"&&`color${v(e)}`,`fontSize${v(t)}`]};return j(i,N,n)},M=R("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.root,t.color!=="inherit"&&e[`color${v(t.color)}`],e[`fontSize${v(t.fontSize)}`]]}})(({theme:o,ownerState:e})=>{var t,n,i,p,m,a,h,u,d,r,s,c,l;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:e.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(t=o.transitions)==null||(n=t.create)==null?void 0:n.call(t,"fill",{duration:(i=o.transitions)==null||(i=i.duration)==null?void 0:i.shorter}),fontSize:{inherit:"inherit",small:((p=o.typography)==null||(m=p.pxToRem)==null?void 0:m.call(p,20))||"1.25rem",medium:((a=o.typography)==null||(h=a.pxToRem)==null?void 0:h.call(a,24))||"1.5rem",large:((u=o.typography)==null||(d=u.pxToRem)==null?void 0:d.call(u,35))||"2.1875rem"}[e.fontSize],color:(r=(s=(o.vars||o).palette)==null||(s=s[e.color])==null?void 0:s.main)!=null?r:{action:(c=(o.vars||o).palette)==null||(c=c.action)==null?void 0:c.active,disabled:(l=(o.vars||o).palette)==null||(l=l.action)==null?void 0:l.disabled,inherit:void 0}[e.color]}}),y=g.forwardRef(function(e,t){const n=w({props:e,name:"MuiSvgIcon"}),{children:i,className:p,color:m="inherit",component:a="svg",fontSize:h="medium",htmlColor:u,inheritViewBox:d=!1,titleAccess:r,viewBox:s="0 0 24 24"}=n,c=z(n,A),l=g.isValidElement(i)&&i.type==="svg",x=f({},n,{color:m,component:a,fontSize:h,instanceFontSize:e.fontSize,inheritViewBox:d,viewBox:s,hasSvgAsChild:l}),$={};d||($.viewBox=s);const _=B(x);return S.jsxs(M,f({as:a,className:b(_.root,p),focusable:"false",color:u,"aria-hidden":r?void 0:!0,role:r?"img":void 0,ref:t},$,c,l&&i.props,{ownerState:x,children:[l?i.props.children:i,r?S.jsx("title",{children:r}):null]}))});y.muiName="SvgIcon";function U(o,e){function t(n,i){return S.jsx(y,f({"data-testid":`${e}Icon`,ref:i},n,{children:o}))}return t.muiName=y.muiName,g.memo(g.forwardRef(t))}export{U as c};